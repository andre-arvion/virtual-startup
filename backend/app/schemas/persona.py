from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class PersonaPrompt(BaseModel):
    prompt: str
    context: Dict[str, Any]
    project_id: int

class PersonaResponse(BaseModel):
    id: int
    project_id: int
    prompt: str
    response: str
    context: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class PersonaSession(BaseModel):
    id: int
    project_id: int
    steps_completed: List[str]
    current_step: str
    memory: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PersonaStepStatus(BaseModel):
    step: str
    status: str  # "completed", "in_progress", "pending"
    completed_at: Optional[datetime] = None

