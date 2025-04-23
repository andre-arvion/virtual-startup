from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.services.task_service import TaskService
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Task)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.create_task(db, task, current_user.id)

@router.get("/{task_id}", response_model=Task)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.get_task(db, task_id)

@router.get("/project/{project_id}", response_model=List[Task])
def get_project_tasks(
    project_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.get_project_tasks(db, project_id, skip, limit)

@router.get("/user/assigned", response_model=List[Task])
def get_assigned_tasks(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.get_user_tasks(db, current_user.id, skip, limit)

@router.put("/{task_id}", response_model=Task)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.update_task(db, task_id, task_update)

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    TaskService.delete_task(db, task_id)
    return {"message": "Task deleted successfully"}