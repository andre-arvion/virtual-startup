# Session Manager – Virtual Startup Platform

## Purpose

Coordinates all persona activity into a persistent, project-scoped session state.

---

## Core Capabilities

- Autosave every 15 seconds
- Resume last step for each persona
- Switch personas without context loss
- Track progress through all markdown outputs
- Link to project dashboard

---

## Files

/session/ 
├── manager.py # Core session logic 
├── tracker.py # Tracks persona output status 
├── autosave.py # Periodic data writing to DB



---

## Session Schema (JSON)

```json
{
  "project_id": "p001",
  "active_persona": "vUX",
  "steps_completed": ["product_brief.md", "user_flows.md"],
  "last_saved": "2025-04-22T14:00:00Z",
  "persona_memory": {
    "vPM": "...",
    "vUX": "...",
    "vCTO": null
  }
}
Persona Switch Flow
Save session snapshot

Load new prompt + previous context

Inject memory into AI persona

Update project_meta.md

Resume Flow
On login or dashboard open:

Session state is loaded

Cursor resumes from the last active persona or pending task

Notes
All state changes must also be reflected in the dashboard and meta file

Persona memory is sandboxed to prevent accidental leaks