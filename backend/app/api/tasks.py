from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db, get_current_user
from app.services.task_service import TaskService
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("", response_model=Task)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return TaskService.create_task(db, task)