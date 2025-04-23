#!/bin/bash

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Run the server on port 8001
uvicorn app.main:app --reload --port 8001 