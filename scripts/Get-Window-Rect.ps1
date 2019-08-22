Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Window {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
}
public struct RECT
{
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
}
"@

$Handle = (Get-Process -Id $Args[0]).MainWindowHandle
$WindowRect = New-Object RECT
$GotWindowRect = [Window]::GetWindowRect($Handle, [ref]$WindowRect)
ConvertTo-Json($WindowRect)
