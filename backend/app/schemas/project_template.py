from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict, Any
from .project import ProjectPhases, ProjectPersona

class TaskTemplate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "todo"
    priority: str = "medium"

class ProjectTemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: Optional[str] = None
    phases: Optional[Dict[str, int]] = Field(default_factory=lambda: {"frontend": 0, "backend": 0, "integration": 0})
    personas: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    task_templates: Optional[List[Dict[str, Any]]] = Field(default_factory=list)

class ProjectTemplateCreate(ProjectTemplateBase):
    pass

class ProjectTemplateUpdate(ProjectTemplateBase):
    name: Optional[str] = None

class ProjectTemplate(ProjectTemplateBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int

    class Config:
        from_attributes = True 