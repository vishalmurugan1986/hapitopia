Add-Type -AssemblyName System.Drawing

function Draw-FlowerPetals($g, $centerX, $centerY, $scale, $drawText) {
    $colors = @(
        @{ Main = [System.Drawing.Color]::FromArgb(255, 16, 185, 129); Dark = [System.Drawing.Color]::FromArgb(255, 5, 150, 105) },   # Emerald
        @{ Main = [System.Drawing.Color]::FromArgb(255, 216, 27, 96);  Dark = [System.Drawing.Color]::FromArgb(255, 194, 24, 91) },   # Magenta
        @{ Main = [System.Drawing.Color]::FromArgb(255, 245, 158, 11); Dark = [System.Drawing.Color]::FromArgb(255, 217, 119, 6) },   # Gold
        @{ Main = [System.Drawing.Color]::FromArgb(255, 244, 63, 94);  Dark = [System.Drawing.Color]::FromArgb(255, 225, 29, 72) },   # Rose
        @{ Main = [System.Drawing.Color]::FromArgb(255, 6, 182, 212);  Dark = [System.Drawing.Color]::FromArgb(255, 8, 145, 178) }    # Cyan
    )

    $rx = [int](78 * $scale)
    $ry = [int](142 * $scale)
    $dist = [int](120 * $scale)

    for ($i = 0; $i -lt 5; $i++) {
        $angle = $i * 72.0 - 90.0
        $rad = $angle * [Math]::PI / 180.0
        
        $state = $g.Save()
        $g.TranslateTransform($centerX, $centerY)
        $g.RotateTransform($angle + 90.0)

        $rect = [System.Drawing.Rectangle]::new(-$rx, -$dist - $ry, [int]($rx * 2), [int]($ry * 2))
        $grad = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
            $rect,
            $colors[$i].Main,
            $colors[$i].Dark,
            [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
        )
        $g.FillEllipse($grad, $rect)

        # Highlight streak on petal
        $hRx = [int]($rx * 0.45)
        $hRy = [int]($ry * 0.70)
        $hRect = [System.Drawing.Rectangle]::new(-$hRx, -$dist - $ry + [int]($ry * 0.15), [int]($hRx * 2), [int]($hRy * 2))
        $hBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(60, 255, 255, 255))
        $g.FillEllipse($hBrush, $hRect)
        $hBrush.Dispose()

        $grad.Dispose()
        $g.Restore($state)
    }

    # Center golden core with radiant halo
    $coreRadius = [int](105 * $scale)
    $coreRect = [System.Drawing.Rectangle]::new(
        $centerX - $coreRadius,
        $centerY - $coreRadius,
        $coreRadius * 2,
        $coreRadius * 2
    )
    
    # Outer ring
    $ringPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(200, 254, 240, 138), [int](6 * $scale))
    $g.DrawEllipse($ringPen, $coreRect)
    $ringPen.Dispose()

    # Core gradient
    $coreGrad = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        $coreRect,
        [System.Drawing.Color]::FromArgb(255, 253, 224, 71),  # Amber gold
        [System.Drawing.Color]::FromArgb(255, 245, 158, 11),  # Deep sunburst
        [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
    )
    $g.FillEllipse($coreGrad, $coreRect)
    $coreGrad.Dispose()

    # Center text "5x7"
    if ($drawText) {
        $fontSize = [int](64 * $scale)
        $font = [System.Drawing.Font]::new("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold)
        $textFormat = [System.Drawing.StringFormat]::new()
        $textFormat.Alignment = [System.Drawing.StringAlignment]::Center
        $textFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
        
        $shadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(80, 0, 0, 0))
        $textBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 69, 26, 3))
        
        $textRect = [System.Drawing.RectangleF]::new(
            $centerX - $coreRadius,
            $centerY - $coreRadius,
            $coreRadius * 2,
            $coreRadius * 2
        )
        $shadowRect = [System.Drawing.RectangleF]::new(
            $centerX - $coreRadius + 2,
            $centerY - $coreRadius + 3,
            $coreRadius * 2,
            $coreRadius * 2
        )
        
        $g.DrawString("5`u{00D7}7", $font, $shadowBrush, $shadowRect, $textFormat)
        $g.DrawString("5`u{00D7}7", $font, $textBrush, $textRect, $textFormat)
        
        $font.Dispose()
        $shadowBrush.Dispose()
        $textBrush.Dispose()
        $textFormat.Dispose()
    }
}

# ========================================================
# 1. GENERATE APP ICON (1024x1024)
# ========================================================
$iconBmp = [System.Drawing.Bitmap]::new(1024, 1024, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$iconG = [System.Drawing.Graphics]::FromImage($iconBmp)
$iconG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$iconG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$iconG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$iconG.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Deep Obsidian Night Gradient Background with warm golden specular rim
$bgRect = [System.Drawing.Rectangle]::new(0, 0, 1024, 1024)
$bgGrad = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    $bgRect,
    [System.Drawing.Color]::FromArgb(255, 14, 20, 36),
    [System.Drawing.Color]::FromArgb(255, 8, 12, 22),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
)
$iconG.FillRectangle($bgGrad, $bgRect)
$bgGrad.Dispose()

# Subtle specular glow in center
$glowRect = [System.Drawing.Rectangle]::new(212, 212, 600, 600)
$glowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(35, 245, 158, 11))
$iconG.FillEllipse($glowBrush, $glowRect)
$glowBrush.Dispose()

# Draw Flower in center
Draw-FlowerPetals $iconG 512 512 1.45 $true

$iconBmp.Save("assets\habitopia_app_icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconG.Dispose()
$iconBmp.Dispose()
Write-Output "Generated: assets\habitopia_app_icon.png (1024x1024)"

# ========================================================
# 2. GENERATE FULL LOGO (1520x1160)
# ========================================================
$logoBmp = [System.Drawing.Bitmap]::new(1520, 1160, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$logoG = [System.Drawing.Graphics]::FromImage($logoBmp)
$logoG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$logoG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$logoG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$logoG.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Transparent background
$logoG.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))

# Flower at top
Draw-FlowerPetals $logoG 760 410 1.25 $true

# Wordmark "Habitopia"
$wordFont = [System.Drawing.Font]::new("Segoe UI", 112, [System.Drawing.FontStyle]::Bold)
$formatCenter = [System.Drawing.StringFormat]::new()
$formatCenter.Alignment = [System.Drawing.StringAlignment]::Center
$formatCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

$wordRect = [System.Drawing.RectangleF]::new(0, 800, 1520, 140)
# Outer subtle shadow
$wordShadow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(90, 8, 12, 22))
$wordShadowRect = [System.Drawing.RectangleF]::new(0, 804, 1520, 140)
$logoG.DrawString("Habitopia", $wordFont, $wordShadow, $wordShadowRect, $formatCenter)

# Text brush (Deep Midnight Navy with vibrant contrast)
$wordBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 15, 23, 42))
$logoG.DrawString("Habitopia", $wordFont, $wordBrush, $wordRect, $formatCenter)

# Tagline "Build a future-proof child"
$tagFont = [System.Drawing.Font]::new("Segoe UI", 42, [System.Drawing.FontStyle]::Bold)
$tagRect = [System.Drawing.RectangleF]::new(0, 960, 1520, 70)
$tagBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 100, 116, 139))
$logoG.DrawString("Build a future-proof child", $tagFont, $tagBrush, $tagRect, $formatCenter)

$logoBmp.Save("assets\habitopia_logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$logoG.Dispose()
$logoBmp.Dispose()
Write-Output "Generated: assets\habitopia_logo.png (1520x1160)"

