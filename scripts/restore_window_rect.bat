for /f "tokens=1,2,3" %%G in ('%0\..\cmdow.exe /B /t') do (
    if "%%H"=="1" if "%%I"=="%1" (
        for /f "tokens=1-4" %%H in (%0\..\last_window_rect.txt) do (
            %0\..\cmdow.exe "%%G" /mov %%H %%I /siz %%J %%K
        )
    )
)
