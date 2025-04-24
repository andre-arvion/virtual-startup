# Virtual Startup Platform – AI Implementation Plan

This file defines the mandatory step-by-step implementation path.  
Cursor and other AI tools MUST follow the order and constraints exactly.

---

## 🔧 General Rules for AI Assistants

- Do **not begin any backend task** until frontend tasks are ✅  `# done`
- Use clear component files and consistent naming
- Use mock data when instructed, and REMOVE it when backend is connected
- Track progress in this document by updating each step as:
  - `# pending`
  - `# in-progress`
  -   `# done`
- Write code that is:
  - Simple, readable, and modular
  - Includes inline comments for non-obvious logic
  - Includes basic sanity tests and input validation
- For each UI section, implement full **Add/View/Edit/Delete** (CRUD) functionality where applicable

---

## PHASE 1: Project Setup & Mock Design

### 1. Initialize Project Repository
- Create `frontend/`, `backend/`, `docs/`, `promptManager/`, `context/`, `session/`
- Add:
  - `README.md`, `.gitignore`, `docker-compose.yml`, `.env.example`
- Setup Prettier, ESLint, Black, Ruff  
 `# done`

### 2. Install Frontend Stack
- Vite + React + TypeScript
- TailwindCSS + ShadCN + `clsx` or `classnames`
- Zustand or React Context for state  
 `# done`

---

## PHASE 2: Frontend UI – Full Mock Mode

> All components will use mock JSON data from `/mock/` folder  
> Mock API should simulate latency (e.g. 200ms delay)

---

### 3. Auth Flow (UI-Only)
- `LoginPage.tsx` (mock login button)
- Store mock user in context
- Redirect to dashboard  
 `# done`

---

### 4. Project Dashboard UI

#### Implement:
- Sidebar layout (`DashboardSidebar.tsx`)
- Project summary panel (`ProjectHeader.tsx`)
- Persona progress list (`PersonaChecklist.tsx`)
- Progress bar view by phase (`ProgressStatus.tsx`)
- Linked UI/repo previews (`AssetPanel.tsx`)
- Activity feed (`ActivityLog.tsx`)
- Export buttons: Markdown ZIP, Notion, Cursor

✅ Uses mock `project_meta.json`
 `# done`

---

### 5. Chat + Wizard UI

#### Implement:
- `PersonaChat.tsx`
- `ChatBubble.tsx`, `ChatInput.tsx`
- `PersonaWizard.tsx` (multi-step form)
- Local draft autosave

✅ Populate from mock `persona_responses.json`  
`# done`

---

### 6. Markdown Viewer

#### Implement:
- `MarkdownPreview.tsx` (tabs for multiple files)
- `CopyToClipboard`, `DownloadButton`
- Collapsible table of contents

✅ Load from mock markdown content  
`# done`

---

### 7. CRUD: Project Management

#### Implement:
- Add Project (`NewProjectModal.tsx`)
- View Project List (`ProjectList.tsx`)
- Edit Project Settings (`EditProject.tsx`)
- Delete Project (with confirmation modal)

✅ Store in mock state  
 `# done`

---

### 8. CRUD: Persona Prompts (Admin Panel)

#### Implement:
- View Prompt (`PromptViewer.tsx`)
- Edit Prompt (`PromptEditor.tsx`)
- Save Changes (mock update promptManager)
- Reset to default

✅ Use `promptManager/prompts/*.md` as mock  
`# done`

---

### 9. UI Settings

- AI engine toggle (OpenAI/Local)
- Theme toggle (Light/Dark)
- Session autosave toggle
 `# done`

---

### 10. Full UI QA + Cleanup

- Validate all pages
- Test routing + edge states
- Confirm autosave works
- Remove mock latency and replace with real loading states

✅ Frontend is now fully mock-functional and ready for backend connection  
`# done`

---

## PHASE 3: Backend API & Integration

> Begin only when all UI sections above are ✅  `# done`

---

### 11. Backend Setup (FastAPI)

- Project structure
- Create base API `/api/*`
- Add CORS, logging, `.env`, Dockerfile  
 `# done`

---

### 12. Project API

CRUD for:
- Create Project
- Get All Projects
- Get Single Project
- Update Project
- Delete Project
 `# done`

---

### 13. Markdown & Document API

- Save markdown file
- Get all markdowns for project
- Download individual file
- Export full ZIP bundle

✅ Connect to markdown viewer + export UI  
 `# done`

---

### 14. Persona API

- POST `/persona/:id`
  - Accepts prompt + context
  - Returns markdown response
- GET session memory
- GET status of previous steps


---

### 15. Dashboard Data API

- Get current `project_meta` object ✅ `# done`
  - Project model includes phases, personas, and assets
  - ProjectService has methods to update these
- Get activity log entries ✅ `# done`
  - ActivityService implemented with create and get methods
- Track persona progress ✅ `# done`
  - PersonaService tracks session and step status
  - Project model tracks completed personas
- Calculate task % complete ✅ `# done`
  - Task model and service implemented
  - Project task stats endpoint added
  - Full CRUD operations for tasks

✅ Replaces all dashboard mock data  
`# done`

---

### 16. Prompt Management API

- GET current prompt ✅ `# done`
  - Get default prompt by persona
  - Get all prompts for persona
- POST new prompt (admin only) ✅ `# done`
  - Create new prompts
  - Update existing prompts
  - Set default prompts
- GET all persona prompts ✅ `# done`
  - List all prompts
  - Filter by persona

✅ Replace mock in chat + wizard  
 `# pending`


✅ Integrate with admin prompt editor  
 `# pending`

---

### 17. Auth API (Optional)
- POST /login (mock)
- Validate bearer token
- Return session token

✅ Wire to login UI  
 `# done`


✅ Integrate with UI (step 7)  
 `# pending`


---

### 18. Remove All Mock Data
- Remove `/mock/` folder
- Replace all `useMockX()` hooks with live API
- QA all forms and views

✅ UI now runs fully on real backend  
`# pending`

---

## PHASE 4: Final Review & Deploy

### 19. Full Test Run

- From project creation to export
- Test each persona: Chat + Markdown Output
- Test UI flows, CRUD, markdown preview  
`# pending`

### 20. Deploy
- Frontend → Vercel / Netlify
- Backend → Render / Railway / Fly.io
- Connect GitHub Actions for CI  
`# pending`

