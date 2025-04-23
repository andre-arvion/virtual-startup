```markdown
# Project Dashboard – Virtual Startup Platform

## Purpose

A real-time dashboard displaying project progress across personas, documents, and integration phases.  
It provides visibility into system state, outputs, and pending actions.

---

## Features

- Project summary card (name, type, status, AI engine)
- Persona checklist (status: Pending, In Progress, Done)
- Markdown file status (preview/export/download)
- Linked assets (Figma, GitHub, etc.)
- Implementation progress bars (per phase)
- Activity log (timeline view)

---

## UI Sections

### 1. Project Header

- Name
- Type
- Created By
- Status
- AI Model in Use
- Repo + Figma/Lovable links

---

### 2. Persona Tracker

```text
[✓] vPM – Product Brief
[✓] vUX – User Flows
[⏳] vCTO – Tech Plan
[ ] vCISO – Security
[ ] vTech Writer – Docs

3. Implementation Progress (Bar Chart View)

Phase	Tasks Completed / Total	Status
Setup	3 / 3	✅ Done
Frontend	6 / 7	⏳ In Progress
Backend	0 / 6	⬜ Not Started
Integration	0 / 3	⬜ Not Started
4. Output Viewer
Live preview of markdowns

Export options:

.md

Cursor project

Notion import

5. Activity Log
Displays all major user and AI actions chronologically:

Persona completion

Markdown creation

Prompt edit

Asset linked

Backend Endpoint
GET /dashboard/:project_id

Returns merged data from:

project_meta.md

Context snapshot

File system (markdown list)