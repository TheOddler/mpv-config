Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Window {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool GetClientRect(IntPtr hWnd, out RECT lpRect);
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool ClientToScreen(IntPtr hWnd, ref POINT lpPoint);
}
public struct RECT
{
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
}
public struct POINT
{
    public int x;
    public int y;
}
"@

$Handle = (Get-Process -Id $Args[0]).MainWindowHandle
$WindowRect = New-Object RECT
$ClientRect = New-Object RECT
$TopLeft = New-Object POINT
$BottomRight = New-Object POINT

[Window]::GetClientRect($Handle, [ref]$ClientRect) | out-null
$TopLeft.x = $ClientRect.Left
$TopLeft.y = $ClientRect.Top
$BottomRight.x = $ClientRect.Right
$BottomRight.y = $ClientRect.Bottom

[Window]::ClientToScreen($Handle, [ref]$TopLeft) | out-null
[Window]::ClientToScreen($Handle, [ref]$BottomRight) | out-null

$WindowRect.Left = $TopLeft.x
$WindowRect.Top = $TopLeft.y
$WindowRect.Right = $BottomRight.x
$WindowRect.Bottom = $BottomRight.y

ConvertTo-Json($WindowRect)
