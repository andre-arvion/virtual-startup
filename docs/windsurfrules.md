# Windsurfrules – Engineering & Development Rules

## Code Style

- Python: `black` + `ruff`
- JavaScript: `prettier` + `eslint`
- Commit messages: Conventional Commits

---

## Persona Design

- Each persona must output only `.md`
- Each interaction saved in session log
- Prompts must be swappable at runtime

---

## Git Flow

- `main` for production-ready
- `dev` for integration branches
- `persona/vcto-md-export` for feature work

---

## AI Guardrails

- Output markdown only
- Summarize inputs before sending to model
- Always reference current context state
