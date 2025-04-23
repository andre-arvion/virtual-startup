# Virtual Startup Platform – AI Implementation Plan

This document defines the official development instructions for AI tools (e.g., Cursor).  
It outlines phase-by-phase development flow, completion tracking, and code quality rules.

---

## AI Execution Rules (Cursor, Copilot, etc.)

### 1. Obey Phase Sequence
- DO NOT start backend until all frontend tasks are marked ✅ `# done`
- Mark tasks as:
  - `# in-progress`
  - `# done`

### 2. Prioritize Quality
- All code must be:
  - Modular, commented, self-explanatory
  - Easy to read, maintain, and refactor
  - Backed by sanity test cases

### 3. Review Everything
- Sanity tests required after each component
- Virtual peer review: "Is this understandable to another dev?"
- Refactor for clarity before marking complete

### 4. Track Progress in Markdown
- Tasks must be updated inline:
  - `# pending`
  - `# in-progress`
  - `# done`

---

## Phase 1: Setup and Docs

- Initialize monorepo:
  - `frontend/`, `backend/`, `context/`, `session/`, `promptManager/`, `docs/`, `README.md`, `docker-compose.yml`  
  `# in-progress`

- Add all markdown planning docs (`masterplan.md`, `product_brief.md`, etc.)  
  `# pending`

- Add `.prettierrc`, `.eslintrc`, and Python linters  
  `# pending`

---

## Phase 2: Frontend First

- Vite + React + Tailwind + ShadCN setup  
  `# pending`

- Build Chat UI, Wizard mode, markdown preview  
  `# pending`

- Sidebar, persona toggle, theme toggle, markdown export  
  `# pending`

- Prompt Editor (admin only)  
  `# pending`

- Finalize with full UI test and review  
  `# pending`

---

## Phase 3: Backend Setup

- FastAPI scaffold  
  `# pending`

- Modules:
  - `context/`: project memory
  - `session/`: autosave, history
  - `promptManager/`: config-based prompt loading
  - `services/`: AI model wrapper
  - `api/`: endpoints  
  `# pending`

- DB models: project, session, persona memory, prompt history  
  `# pending`

---

## Phase 4: Integration

- Connect frontend to backend
- Test prompt and AI toggle
- Connect markdown preview to real data  
  `# pending`

---

## Phase 5: Persona Logic

- Load persona prompts
- Validate prompt schema
- Connect to promptManager
- Export final markdown per persona  
  `# pending`

---

## Phase 6: Final Review

- Test project from start to end
- Export all docs
- Push to GitHub and/or deploy  
  `# pending`
