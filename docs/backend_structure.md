# Backend Structure – Virtual Startup Platform

## Tech Stack

- FastAPI + SQLAlchemy + PostgreSQL
- Modular architecture
- File-based prompt system
- Markdown first-class output format

---

## Main Directories

/app/ 
├── api/ # HTTP routes 
├── services/ # AI, file, persona logic 
├── context/ # Memory + metadata 
├── session/ # Resume and autosave 
├── prompts/ # Prompt interpolators 
├── models/ # DB schemas 
├── markdown/ # Output writer + sync
└── main.py # Entrypoint


---

## Models

- User
- Project
- Session
- Document
- PromptVersion
- ActivityLog

---

## API

- `POST /persona/:id`
- `GET /project/:id/context`
- `GET /dashboard/:id`
- `GET /documents/:project_id`