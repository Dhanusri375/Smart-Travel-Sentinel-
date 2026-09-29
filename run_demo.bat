@echo off
title Smart Travel Sentinel - Demo Launcher
echo ========================================================
echo   🛡️  SMART TRAVEL SENTINEL PROTOTYPE LAUNCHER
echo ========================================================
echo Starting local web server on Python...

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py server.py
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python server.py
    goto end
)

echo [!] Python executable not found in PATH. Opening index.html directly...
start "" "%~dp0index.html"

:end
pause
