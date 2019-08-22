Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Window {
    [DllImport("User32.dll")]
    public extern static bool MoveWindow(IntPtr handle, int x, int y, int width, int height, bool redraw);
}
"@

$Handle = (Get-Process -Id $Args[0]).MainWindowHandle
$X = $Args[1]
$Y = $Args[2]
$Width = $Args[3]
$Height = $Args[4]

$Success = [Window]::MoveWindow($Handle, $X, $Y, $Width, $Height, $True)
