# Frontend Guidelines – Virtual Startup Platform

## Structure

/chat/ 
├── ChatBubble.tsx 
├── ChatInput.tsx ...

/wizard/ 
├── WizardStep.tsx 
├── WizardManager.tsx

/components/ 
├── MarkdownPreview.tsx 
├── PersonaSelector.tsx


---

## Rules

- One prompt → one persona → one markdown output
- Markdown preview must always be visible
- All forms autosave to local context
- Dark mode by default, toggle via top nav
- Do not load markdown directly from disk; use backend API

---

## Testing

- Manual test each screen before backend connection
- Finalize layout before API integration