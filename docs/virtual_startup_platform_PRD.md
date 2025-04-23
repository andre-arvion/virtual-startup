# Product Requirements Document (PRD) – Virtual Startup Platform

## Overview

The Virtual Startup Platform is an AI-powered workspace where founders and builders can create, plan, and document entire startup projects by interacting with a system of intelligent virtual roles (personas). The platform provides markdown-based outputs compatible with developer tools like Cursor, Lovable.dev, and Notion.

---

## Primary Personas

| Persona        | Role                                                                 |
|----------------|----------------------------------------------------------------------|
| **vPM**        | Virtual Product Manager – guides vision, goals, and problem framing  |
| **vUX**        | UX Designer – maps journeys and generates UI flows for Lovable.dev   |
| **vCTO**       | Technical architect – designs stack, structure, and project flow     |
| **vCISO**      | Security analyst – maps threat models and compliance plans           |
| **vTechWriter**| Documentation generator – writes user guides, help docs, API specs   |

**Future Personas**:
- vCRO (Sales and GTM)
- vSupport (Support systems)
- vCSM (Customer success)

---

## Goals

- Provide structured, AI-driven startup planning from zero to architecture
- Ensure persona memory is persisted across sessions and personas
- Allow prompt updates for each persona without redeploying code
- Enable complete AI execution of a startup blueprint via markdown
- Integrate seamlessly with Lovable.dev, Cursor, and developer workflows

---

## Target Users

- Pre-seed startup founders
- Indie builders
- Product teams launching MVPs
- Accelerators and incubators

---

## Key Features

- Project creation (Startup, Product, Feature)
- Step-by-step persona workflow
- Chat + wizard interfaces
- Auto-generated markdown outputs
- Session memory + autosave
- Configurable prompts per persona
- Export to GitHub, Cursor, Notion

---

## User Flow

### 1. Create a Project

- Choose project type:
  - New Startup
  - New Product
  - New Feature
- Name project and define initial intent

---

### 2. vPM Persona

- Collects:
  - Problem statement
  - Audience
  - Vision
- Generates:
  - `product_brief.md`
  - `painpoints.md`

---

### 3. vUX Persona

- Collects:
  - Persona flows
  - Interaction goals
- Generates:
  - `user_flows.md`
  - `lovable_spec.md`
- Suggests Lovable.dev layout

---

### 4. External UI Prototype

- User creates UI in Lovable.dev or Figma
- Links repo or prototype to project

---

### 5. vCTO Persona

- Reads context and UI
- Designs:
  - Stack
  - File structure
  - Development plan
- Generates:
  - `masterplan.md`
  - `tech_stack.md`
  - `backend_structure.md`
  - `frontend_guidelines.md`
  - `windsurfrules.md`

---

### 6. vCISO Persona

- Reviews tech plan
- Maps risks and controls
- Generates:
  - `threat_model.md`
  - `cloud_compliance_plan.md`

---

### 7. vTechWriter Persona

- Reads all outputs
- Generates documentation:
  - `user_guide.md`
  - `api_docs.md`
  - `support_articles/` folder

---

## System Modules

### `context/`

- Loads and persists project context across personas
- Auto-updates with markdown outputs

### `session/`

- Handles autosave, resume, and step tracking

### `promptManager/`

- Loads persona prompts from markdown files or DB
- Allows editing via admin UI

### `services/`

- AI engine toggle (OpenAI/local)
- Prompt interpolation
- Markdown generator

### `api/`

- RESTful API for frontend communication

---

## Prompt Configuration

All persona prompts live in:

/promptManager/prompts/ ├── vpm.md ├── vux.md ├── vcto.md ├── vciso.md └── vtechwriter.md



Prompts are editable at runtime. No code changes required.

---

## Markdown Output Tree

docs/ 
├── product_brief.md 
├── user_flows.md 
├── lovable_spec.md 
├── masterplan.md 
├── tech_stack.md 
├── backend_structure.md 
├── frontend_guidelines.md 
├── windsurfrules.md 
├── threat_model.md 
├── cloud_compliance_plan.md 
├── user_guide.md 
├── api_docs.md 
└── support_articles/ 
    ├── faq.md 
    ├── onboarding.md 
    └── troubleshooting.md



---

## Cursor Execution Rule

A file named `implementation_plan.md` defines all task phases.  
Cursor must:
- Follow the order strictly (frontend before backend)
- Mark tasks `# done` upon completion
- Review code for clarity, test coverage, and modularity before finalizing

---

## Compliance and Security

- SOC 2 and GDPR-aligned session isolation
- Prompt auditing and validation pipeline
- AI responses are scoped to current project only

---

## Success Metrics

- Time-to-first-strategy output
- Session completion % across all personas
- Export and reuse rate of markdown docs
- Feedback score per persona

---

## Out of Scope (V1)

- Multi-user project collaboration
- Real-time markdown co-editing
- Embedded LLM validation of external codebases