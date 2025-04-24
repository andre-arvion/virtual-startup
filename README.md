# Virtual Startup Platform

A comprehensive platform for managing virtual startup projects, featuring project management, task tracking, and collaboration tools.

## Overview

The Virtual Startup Platform is a full-stack application that helps users manage virtual startup projects efficiently. It provides tools for project management, task tracking, activity monitoring, and team collaboration.

## Features

- **User Management**
  - User registration and authentication
  - JWT-based authentication
  - User profiles and permissions

- **Project Management**
  - Create and manage projects
  - Project templates for quick setup
  - Project phases tracking
  - Custom project personas
  - Asset management

- **Task Management**
  - Create and assign tasks
  - Task status tracking
  - Priority levels
  - Due date management

- **Activity Tracking**
  - Real-time activity feeds
  - Project-specific activity logs
  - User activity history

- **Search Functionality**
  - Global search across projects and tasks
  - Filter by type (project/task)
  - Advanced search options

## Tech Stack

### Backend
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- Alembic (Database migrations)
- SQLite (Database)
- JWT Authentication
- Pydantic (Data validation)

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Zustand (State management)

## Project Structure

```
virtual-startup-platform/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── alembic/            # Database migrations
│   └── tests/              # Backend tests
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/         # Page components
    │   ├── store/         # State management
    │   └── lib/           # Utilities
    └── public/            # Static assets
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- SQLite

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the backend server:
```bash
uvicorn app.main:app --reload --port 8001
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs

## API Documentation

The API documentation is available at `/docs` when running the backend server. It provides detailed information about all available endpoints, request/response schemas, and authentication requirements.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
