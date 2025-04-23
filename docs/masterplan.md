# Technical Masterplan – Virtual Startup Platform

## Purpose

This document defines the high-level technical architecture, execution strategy, and component ownership of the Virtual Startup Platform.

---

## System Objectives

- Build a modular AI workspace using virtual personas
- Allow project context to persist across personas
- Generate markdown outputs for execution in Cursor, GitHub, Notion
- Support both OpenAI and local model integration (e.g., Ollama, LM Studio)
- Make persona prompts fully editable without redeployment

---

## Core Modules

/frontend/ 
├── pages/ 
├── chat/ 
├── wizard/ 
├── components/ 
├── dashboard/ 
├── markdown-preview/ 
├── persona-toggle/

...

/backend/ 
├── app/ 
│ ├── api/ 
│ ├── services/ 
│ ├── models/ 
│ ├── context/ 
│ ├── session/ 
│ ├── prompts/ 
│ └── main.py

/promptManager/ 
├── loader.py 
├── editor.py 
└── prompts/ 
├── vpm.md 
├── vux.md 
└── ...



---

## Execution Phases

1. Frontend fully built and reviewed first
2. Backend follows only when UI is validated
3. Each phase must be tracked in `implementation_plan.md`
4. Cursor must review and mark steps `# done` in markdown

---

## Export Formats

- `.md` for documents
- `.zip` for Notion-compatible bundles
- Cursor CLI for inline generation

---

## AI Model Design

- AI engine configurable via ENV
- Toggle between:
  - `openai://gpt-4`
  - `local://ollama/llama3`