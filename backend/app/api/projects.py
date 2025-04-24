from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict
from app.database import get_db
from app.services.project_service import ProjectService
from app.schemas.project import Project, ProjectCreate, ProjectUpdate, ProjectPhases, ProjectPersona, ProjectAsset
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter(
    tags=["Projects"]
)

@router.post("/", response_model=Project, status_code=status.HTTP_201_CREATED)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ProjectService.create_project(db, project, current_user.id)

@router.get("/", response_model=List[Project])
def get_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ProjectService.get_user_projects(db, current_user.id, skip, limit)

@router.get("/{project_id}", response_model=Project)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return project

@router.put("/{project_id}", response_model=Project)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_project = ProjectService.update_project(db, project_id, project_update)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if not ProjectService.delete_project(db, project_id):
        raise HTTPException(status_code=404, detail="Project not found")

@router.put("/{project_id}/phases", response_model=Project)
def update_project_phases(
    project_id: int,
    phases: ProjectPhases,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_project = ProjectService.update_project_phases(db, project_id, phases.model_dump())
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.put("/{project_id}/personas", response_model=Project)
def update_project_personas(
    project_id: int,
    personas: List[ProjectPersona],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_project = ProjectService.update_project_personas(db, project_id, [p.model_dump() for p in personas])
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.put("/{project_id}/assets", response_model=Project)
def update_project_assets(
    project_id: int,
    assets: List[ProjectAsset],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_project = ProjectService.update_project_assets(db, project_id, [a.model_dump() for a in assets])
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project 