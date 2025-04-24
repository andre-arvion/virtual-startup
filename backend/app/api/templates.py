from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.services.project_template_service import ProjectTemplateService
from app.schemas.project_template import ProjectTemplate, ProjectTemplateCreate, ProjectTemplateUpdate
from app.schemas.project import Project
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=ProjectTemplate, status_code=status.HTTP_201_CREATED)
def create_template(
    template: ProjectTemplateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new project template"""
    return ProjectTemplateService.create_template(db, template, current_user.id)

@router.get("/", response_model=List[ProjectTemplate])
def get_templates(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all project templates for the current user"""
    return ProjectTemplateService.get_user_templates(db, current_user.id, skip, limit)

@router.get("/{template_id}", response_model=ProjectTemplate)
def get_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific project template"""
    template = ProjectTemplateService.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return template

@router.put("/{template_id}", response_model=ProjectTemplate)
def update_template(
    template_id: int,
    template_update: ProjectTemplateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a project template"""
    template = ProjectTemplateService.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_template = ProjectTemplateService.update_template(db, template_id, template_update)
    if not updated_template:
        raise HTTPException(status_code=404, detail="Template not found")
    return updated_template

@router.delete("/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a project template"""
    template = ProjectTemplateService.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if not ProjectTemplateService.delete_template(db, template_id):
        raise HTTPException(status_code=404, detail="Template not found")

@router.post("/{template_id}/create_project", response_model=Project)
def create_project_from_template(
    template_id: int,
    project_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new project from a template"""
    template = ProjectTemplateService.get_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    if template.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    project = ProjectTemplateService.create_project_from_template(
        db, template_id, current_user.id, project_name
    )
    if not project:
        raise HTTPException(status_code=404, detail="Failed to create project from template")
    return project
 