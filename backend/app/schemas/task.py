from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: Optional[datetime] = None
    assignee_id: Optional[int] = None

class TaskCreate(TaskBase):
    project_id: int

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    project_id: Optional[int] = None

class Task(TaskBase):
    id: int
    project_id: int
    creator_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 