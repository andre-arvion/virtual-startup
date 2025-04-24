from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db, get_current_user
from app.services.prompt_service import PromptService
from app.schemas.prompt import Prompt, PromptCreate, PromptUpdate
from app.models.user import User

router = APIRouter(prefix="/prompts", tags=["prompts"])

@router.post("", response_model=Prompt)
def create_prompt(
    prompt: PromptCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new prompt. Only admin users can create prompts."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return PromptService.create_prompt(db, prompt)

@router.get("/{prompt_id}", response_model=Prompt)
def get_prompt(
    prompt_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific prompt by ID."""
    prompt = PromptService.get_prompt(db, prompt_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return prompt

@router.get("/persona/{persona_id}", response_model=List[Prompt])
def get_persona_prompts(
    persona_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all prompts for a specific persona."""
    return PromptService.get_persona_prompts(db, persona_id)

@router.get("/persona/{persona_id}/default", response_model=Prompt)
def get_default_prompt(
    persona_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get the default prompt for a specific persona."""
    prompt = PromptService.get_default_prompt(db, persona_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="No default prompt found for this persona")
    return prompt

@router.put("/{prompt_id}", response_model=Prompt)
def update_prompt(
    prompt_id: int,
    prompt_update: PromptUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a prompt. Only admin users can update prompts."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_prompt = PromptService.update_prompt(db, prompt_id, prompt_update)
    if not updated_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return updated_prompt

@router.delete("/{prompt_id}")
def delete_prompt(
    prompt_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a prompt. Only admin users can delete prompts."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if not PromptService.delete_prompt(db, prompt_id):
        raise HTTPException(status_code=404, detail="Prompt not found")
    return {"message": "Prompt deleted successfully"} 