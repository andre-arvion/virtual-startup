from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.task import TaskStatus, TaskPriority

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    phase: str
    completed: bool = False

class TaskCreate(TaskBase):
    project_id: int

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    phase: Optional[str] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: int
    project_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 