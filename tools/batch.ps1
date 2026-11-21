# Generate every entry in a prompt JSON that has no image yet, N at a time.
# JSON values are either a prompt string (uses the -Size/-Style/-Refs defaults) or an object
#   { "prompt": "...", "size": "portrait|landscape|wide", "style": "prompts\\_style_x.txt", "refs": ["a.png"] }
# whose fields override the defaults for that entry.
# Usage: .\tools\batch.ps1 -Json prompts\cast_candidates.json -OutDir assets\cast\candidates
#        [-Parallel 4] [-Only id1,id2] [-Size portrait|landscape] [-Style prompts\_style.txt] [-Refs a.png]
param(
  [Parameter(Mandatory)] [string] $Json,
  [Parameter(Mandatory)] [string] $OutDir,
  [int] $Parallel = 4,
  [string[]] $Only = @(),
  [string] $Size = 'portrait',
  [string] $Style = 'prompts\_style.txt',
  [string[]] $Refs = @()
)
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
$entries = Get-Content $Json -Raw -Encoding utf8 | ConvertFrom-Json
$promptDir = Join-Path 'prompts' ([IO.Path]::GetFileNameWithoutExtension($Json))
New-Item -ItemType Directory -Force $promptDir | Out-Null
$todo = @()
foreach ($p in $entries.PSObject.Properties) {
  if ($Only.Count -and ($Only -notcontains $p.Name)) { continue }
  if (Test-Path "$OutDir\$($p.Name).png") { continue }
  $v = $p.Value
  $isObj = $v -isnot [string]
  $text = if ($isObj) { $v.prompt } else { $v }
  $item = [pscustomobject]@{
    id    = $p.Name
    size  = if ($isObj -and $v.size) { $v.size } else { $Size }
    style = if ($isObj -and $v.style) { $v.style } else { $Style }
    # -ArgumentList flattens arrays, so refs travel as one ';'-joined string.
    refs  = if ($isObj -and $null -ne $v.refs) { @($v.refs) -join ';' } else { $Refs -join ';' }
  }
  [IO.File]::WriteAllText((Join-Path $root "$promptDir\$($p.Name).txt"), $text, (New-Object Text.UTF8Encoding $false))
  $todo += $item
}
"todo: $($todo.Count) -> $(($todo | ForEach-Object id) -join ', ')"
$jobs = @()
foreach ($t in $todo) {
  while (@($jobs | Where-Object { $_.State -eq 'Running' }).Count -ge $Parallel) { Start-Sleep -Seconds 3 }
  # Another batch on the same folder may have made it meanwhile.
  if (Test-Path "$OutDir\$($t.id).png") { continue }
  $jobs += Start-Job -Name $t.id -ArgumentList $root, $t.id, $promptDir, $OutDir, $t.size, $t.style, $t.refs -ScriptBlock {
    param($root, $id, $promptDir, $OutDir, $Size, $Style, $RefList)
    $refs = @($RefList -split ';' | Where-Object { $_ })
    & "$root\tools\gen.ps1" -PromptFile "$promptDir\$id.txt" -Out "$OutDir\$id.png" -Size $Size -Style $Style -Refs $refs
  }
  Start-Sleep -Seconds 2
}
$jobs | Wait-Job | Out-Null
foreach ($j in $jobs) { Receive-Job $j }
$jobs | Remove-Job

