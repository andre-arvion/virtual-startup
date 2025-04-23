# Tech Stack – Virtual Startup Platform

## Frontend

- Vite + React + TypeScript
- TailwindCSS + ShadCN UI
- Zustand or Context API for state
- `react-markdown` for preview rendering
- Axios for API calls

---

## Backend

- FastAPI (Python 3.11+)
- PostgreSQL
- SQLAlchemy + Alembic (migrations)
- Async IO workers for prompt management
- Markdown renderer and sync manager

---

## Infrastructure

- Docker Compose
- GitHub Actions (CI)
- `black` + `ruff` (Python)
- `eslint` + `prettier` (JS/TS)
- Optional deployment on Railway, Fly.io, or Vercel + Render

---

## Prompt Management

- File-based storage (markdown in `/prompts`)
- Editable via UI (`/promptManager/editor`)
- Auto-reloaded in backend without restart

---

## AI Models

| Source  | Model        | Purpose              |
|---------|--------------|----------------------|
| OpenAI  | GPT-4 / 3.5  | Default cloud model  |
| Local   | LLaMA 3, Mistral | Offline fallback   |
