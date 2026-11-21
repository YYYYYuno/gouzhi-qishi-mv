# Generate one image through Codex (GPT image tool) and copy it to -Out.
# Usage: .\tools\gen.ps1 -PromptFile prompts\cast\wenchi-a.txt -Out assets\cast\candidates\wenchi-a.png
#        [-Size portrait|landscape|wide] [-Style prompts\_style.txt] [-Refs a.png,b.png]
# -Size wide = a landscape image composed for a later 2.39:1 / 21:9 crop (see tools\crop_wide.py).
param(
  [Parameter(Mandatory)] [string] $PromptFile,
  [Parameter(Mandatory)] [string] $Out,
  [ValidateSet('portrait', 'landscape', 'wide')] [string] $Size = 'portrait',
  [string] $Style = 'prompts\_style.txt',
  [string[]] $Refs = @()
)
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
$Refs = @($Refs | Where-Object { $_ })
$genDir = Join-Path $env:USERPROFILE '.codex\generated_images'
$before = Get-Date

$dims = if ($Size -eq 'portrait') { 'portrait image (1024x1536)' } else { 'landscape image (1536x1024)' }
if ($Size -eq 'wide') {
  $dims += '. It will be cropped to a 2.39:1 cinemascope frame afterwards: keep every important element (faces, hands, key props, eyelines) inside the central horizontal band covering the middle 60% of the height, and fill the top and bottom with expendable sky, ceiling, floor or background'
}
$body = Get-Content $PromptFile -Raw -Encoding utf8
$styleText = if ($Style) { Get-Content (Join-Path $root $Style) -Raw -Encoding utf8 } else { '' }
# A prompt that explains its own pictures (a "REFERENCES:" line) gets no generic note.
$refNote = if ($Refs.Count -and $body -notmatch 'REFERENCES:') { "The attached picture(s) are references for the same person. Keep the face, hairstyle and body exactly identical to the reference.`n" } else { '' }
$prompt = @"
Use your built-in image generation tool to create exactly ONE $dims, then stop. Do not write code, do not edit files, do not run shell commands.
$refNote
$body
$styleText
"@
$full = Join-Path $root $Out
New-Item -ItemType Directory -Force (Split-Path $full -Parent) | Out-Null
$promptTmp = "$full.prompt.txt"
[IO.File]::WriteAllText($promptTmp, $prompt, (New-Object Text.UTF8Encoding $false))

# Pin the model: the user's default can change to one a ChatGPT-account Codex rejects (e.g. gpt-6.1-sol).
$model = if ($env:GEN_MODEL) { $env:GEN_MODEL } else { 'gpt-6-astra' }
$imgArgs = ($Refs | ForEach-Object { '-i "' + (Resolve-Path $_).Path + '"' }) -join ' '
# Where codex lives: $env:CODEX_CMD, else the author's install, else whatever `codex` is on PATH.
$codex = if ($env:CODEX_CMD) { $env:CODEX_CMD } elseif (Test-Path 'F:\codex\codex.cmd') { 'F:\codex\codex.cmd' } else { 'codex' }
$cmd = "$codex exec --skip-git-repo-check -C `"$root`" -s read-only -m $model -c model_reasoning_effort=`"low`" $imgArgs < `"$promptTmp`" > `"$full.log`" 2>&1"
cmd /c $cmd | Out-Null
$code = $LASTEXITCODE

# Pick the image from this run's own Codex session folder (safe when several runs overlap).
$sid = (Select-String -Path "$full.log" -Pattern 'session id:\s*(\S+)' | Select-Object -First 1).Matches.Groups[1].Value
$new = $null
if ($sid -and (Test-Path (Join-Path $genDir $sid))) {
  $new = Get-ChildItem (Join-Path $genDir $sid) -File -Include *.png,*.jpg,*.webp -Recurse |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
}
if (-not $new) { Write-Output "NO IMAGE for $Out (exit $code, see $Out.log)"; exit 2 }
Copy-Item $new.FullName $full -Force
Write-Output "OK $Out <- $($new.FullName) ($([math]::Round(((Get-Date) - $before).TotalSeconds))s)"

