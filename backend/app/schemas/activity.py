from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from app.models.activity import ActivityType

class ActivityBase(BaseModel):
    type: ActivityType
    description: str
    meta_data: Optional[Dict[str, Any]] = None

class ActivityCreate(ActivityBase):
    project_id: int

class Activity(ActivityBase):
    id: int
    project_id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True 