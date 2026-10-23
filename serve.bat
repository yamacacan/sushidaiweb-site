@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=8000
where python >nul 2>&1 && (set PY=python& goto run)
where py >nul 2>&1 && (set PY=py& goto run)
echo.
echo Python bulunamadi. Yerel sunucu icin Python kurun: https://www.python.org/downloads/
echo Kurulumda "Add python.exe to PATH" secenegini isaretleyin.
echo Alternatif: index.html dosyasini dogrudan tarayicida acabilirsiniz.
echo.
pause
exit /b 1
:run
echo SushiDai yerel sunucu: http://localhost:%PORT%  (durdurmak icin Ctrl+C)
start "" http://localhost:%PORT%
%PY% -m http.server %PORT%
pause
