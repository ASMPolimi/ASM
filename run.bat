@echo off
echo ===================================================
echo   Starting ASM Website Local Server (Polimi)
echo ===================================================

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Installing dependencies...
call .\venv\Scripts\python.exe -m pip install -r requirements.txt openpyxl

echo Starting server...
echo Access the site at: http://localhost:8080
call .\venv\Scripts\python.exe server.py
pause
