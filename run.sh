#!/usr/bin/env bash
echo "==================================================="
echo "  Starting ASM Website Local Server (Polimi)"
echo "==================================================="

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Installing dependencies..."
./venv/bin/pip install -r requirements.txt openpyxl

echo "Starting server..."
echo "Access the site at: http://localhost:8080"
./venv/bin/python server.py
