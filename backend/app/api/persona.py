from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db, get_current_user
from app.services.persona_service import PersonaService
from app.schemas.persona import PersonaPrompt, PersonaResponse, PersonaSession, PersonaStepStatus
from app.models.user import User

router = APIRouter(prefix="/personas", tags=["Personas"])

@router.post("/{project_id}", response_model=PersonaResponse)
async def create_persona_response(
    project_id: int,
    prompt: PersonaPrompt,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new persona response for a project.
    """
    try:
        # Here you would typically call an AI service to generate the response
        # For now, we'll just echo back the prompt as a placeholder
        response = f"AI Response to: {prompt.prompt}"
        
        return PersonaService.create_response(
            db=db,
            project_id=project_id,
            prompt=prompt.prompt,
            response=response,
            context=prompt.context
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{project_id}/responses", response_model=List[PersonaResponse])
async def get_project_responses(
    project_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all persona responses for a project.
    """
    return PersonaService.get_project_responses(
        db=db,
        project_id=project_id,
        skip=skip,
        limit=limit
    )

@router.get("/{project_id}/session", response_model=PersonaSession)
async def get_session(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get or create a persona session for a project.
    """
    return PersonaService.create_or_get_session(db=db, project_id=project_id)

@router.get("/{project_id}/status/{step}", response_model=PersonaStepStatus)
async def get_step_status(
    project_id: int,
    step: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get the status of a specific step in the persona process.
    """
    return PersonaService.get_step_status(db=db, project_id=project_id, step=step)

@router.put("/{project_id}/session/{session_id}", response_model=PersonaSession)
async def update_session(
    project_id: int,
    session_id: int,
    current_step: str = None,
    memory: dict = None,
    completed_step: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a persona session with new step, memory, or completed step information.
    """
    session = PersonaService.update_session(
        db=db,
        session_id=session_id,
        current_step=current_step,
        memory=memory,
        completed_step=completed_step
    )
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found"
        )
    return session 