# Virtual Startup Platform Backend

This is the backend service for the Virtual Startup Platform, built with FastAPI and SQLAlchemy.

## Setup

1. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` as needed

4. Initialize the database:
```bash
alembic upgrade head
```

5. Run the development server:
```bash
# Run on port 8001 to avoid conflict with frontend
uvicorn app.main:app --reload --port 8001
```

The API will be available at `http://localhost:8001`

## API Documentation

Once the server is running, you can access:
- Interactive API documentation: `http://localhost:8001/docs`
- Alternative API documentation: `http://localhost:8001/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/           # API endpoints
│   ├── models/        # SQLAlchemy models
│   ├── schemas/       # Pydantic schemas
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── tests/             # Test files
├── alembic/           # Database migrations
├── .env              # Environment variables
└── requirements.txt   # Project dependencies
```

## Development

- Run tests: `pytest`
- Create new migration: `alembic revision --autogenerate -m "description"`
- Apply migrations: `alembic upgrade head` 
