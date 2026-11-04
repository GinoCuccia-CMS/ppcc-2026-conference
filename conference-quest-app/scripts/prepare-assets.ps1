# Resizes each session's key slides (data/sessions/*.json -> keySlides) to 1280 px wide JPEGs
# in src/assets/slides/<session-id>/ so the app bundle stays small. Uses built-in .NET (System.Drawing),
# no extra software. Skips files that are already up to date. Run: npm run assets
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$appRoot  = Split-Path -Parent $PSScriptRoot
$repoRoot = Split-Path -Parent $appRoot
$outRoot  = Join-Path $appRoot 'src/assets/slides'
$maxWidth = 1280
$quality  = 80L

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $quality)

$made = 0; $skipped = 0
foreach ($file in Get-ChildItem (Join-Path $repoRoot 'data/sessions') -Filter *.json) {
  $s = Get-Content $file.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
  if (-not $s.slidesDir -or -not $s.keySlides) { continue }
  $outDir = Join-Path $outRoot $s.id
  New-Item -ItemType Directory -Force $outDir | Out-Null
  foreach ($name in $s.keySlides) {
    $src = Join-Path $repoRoot (Join-Path $s.slidesDir $name)
    $dst = Join-Path $outDir ([IO.Path]::ChangeExtension($name, '.jpg'))
    if (-not (Test-Path $src)) { Write-Warning "Missing slide: $src"; continue }
    if ((Test-Path $dst) -and (Get-Item $dst).LastWriteTime -ge (Get-Item $src).LastWriteTime) { $skipped++; continue }
    $img = [System.Drawing.Image]::FromFile($src)
    try {
      $w = [Math]::Min($maxWidth, $img.Width)
      $h = [int][Math]::Round($img.Height * $w / $img.Width)
      $bmp = New-Object System.Drawing.Bitmap $w, $h
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.DrawImage($img, 0, 0, $w, $h)
      $g.Dispose()
      $bmp.Save($dst, $jpeg, $encParams)
      $bmp.Dispose()
      $made++
    } finally { $img.Dispose() }
  }
}
$kb = [int]((Get-ChildItem $outRoot -Recurse -File | Measure-Object Length -Sum).Sum / 1KB)
Write-Output "Slides: $made resized, $skipped up to date, $kb KB total in src/assets/slides"
