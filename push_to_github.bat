@echo off
title Push Smart Travel Sentinel to GitHub
color 0b
echo ======================================================================
echo    SMART TRAVEL SENTINEL - PUSH TO GITHUB REPOSITORY
echo ======================================================================
echo  Remote  : https://github.com/Dhanusri375/Smart-Travel-Sentinel-.git
echo  Branch  : main
echo ======================================================================
echo.
echo Opening browser for Git Credential Manager authorization...
echo.

git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ======================================================================
    echo  [SUCCESS] All files successfully uploaded to GitHub!
    echo  URL: https://github.com/Dhanusri375/Smart-Travel-Sentinel-
    echo ======================================================================
) else (
    echo ======================================================================
    echo  [NOTICE] Push did not complete. Check browser login prompt.
    echo ======================================================================
)
echo.
pause
