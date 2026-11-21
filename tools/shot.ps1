# Render a local HTML page to a 1920x1080 PNG with headless Chrome.
# Usage: .\tools\shot.ps1 -Html styleframe\frame_p.html -Query "claude=../assets/design/cut/claude-p.png&ds=..." -Out styleframe\sf-p.png
param(
  [Parameter(Mandatory)] [string] $Html,
  [string] $Query = '',
  [Parameter(Mandatory)] [string] $Out,
  [int] $Width = 1920, [int] $Height = 1080
)
$root = Split-Path $PSScriptRoot -Parent
$page = (Resolve-Path (Join-Path $root $Html)).Path -replace '\\', '/'
$url = "file:///$page" + $(if ($Query) { "?$Query" } else { '' })
$dst = Join-Path $root $Out
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --allow-file-access-from-files `
  --hide-scrollbars --window-size=$Width,$Height --virtual-time-budget=5000 "--screenshot=$dst" $url 2>$null | Out-Null
if (Test-Path $dst) { "OK $Out" } else { "FAILED $Out" }
