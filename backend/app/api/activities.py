from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.services.activity_service import ActivityService
from app.services.project_service import ProjectService
from app.schemas.activity import Activity, ActivityCreate
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Activity, status_code=status.HTTP_201_CREATED)
def create_activity(
    activity: ActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify project exists and user has access
    project = ProjectService.get_project(db, activity.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return ActivityService.create_activity(db, activity, current_user.id)

@router.get("/project/{project_id}", response_model=List[Activity])
def get_project_activities(
    project_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify project exists and user has access
    project = ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return ActivityService.get_project_activities(db, project_id, skip, limit)

@router.get("/user/me", response_model=List[Activity])
def get_my_activities(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ActivityService.get_user_activities(db, current_user.id, skip, limit) 