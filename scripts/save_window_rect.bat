for /f "tokens=2,3,8-11" %%G in ('%0\..\cmdow.exe /B /t /p') do (
    if "%%G"=="1" if "%%H"=="%1" (
        echo %%I %%J %%K %%L > %0\..\last_window_rect.txt
    )
)
