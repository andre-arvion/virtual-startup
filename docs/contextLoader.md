# Context Loader – Virtual Startup Platform

## Purpose

Ensures persistent and unified project memory across all personas.  
Each AI persona reads and writes to a shared context structure, allowing continuity across interactions and sessions.

---

## Key Responsibilities

- Load full context on session resume
- Persist project metadata, linked files, and AI memory
- Update context when new markdown documents are created
- Make context available across all backend services and AI invocations

---

## Directory

/context/ 
├── loader.py # Load context from DB or cache 
├── state.py # Holds context per session in memory 
└── resolver.py # Injects context into prompt templates


---

## Example Fields

```json
{
  "project_id": "p001",
  "project_type": "startup",
  "product_brief": "...",
  "user_flows": "...",
  "ui_link": "https://lovable.dev/project-x",
  "repo_link": "https://github.com/acme/startup",
  "active_persona": "vCTO",
  "last_updated": "2025-04-22"
}
Access Example
python
Copy
Edit
from context.state import get_current_context

ctx = get_current_context(user_id="abc", project_id="p001")
print(ctx["product_brief"])
Markdown Sync
Each time a document is written:

The context is updated

The file is tracked in project_meta.md

The markdown content is saved to a versioned storage