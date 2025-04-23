from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict

class ProjectAsset(BaseModel):
    name: str
    url: str
    type: str
    icon: str

class ProjectPersona(BaseModel):
    id: str
    name: str
    fullName: str
    completed: bool
    icon: str

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectPhases(BaseModel):
    frontend: int = 0
    backend: int = 0
    integration: int = 0

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int
    phases: Optional[ProjectPhases] = None
    personas: Optional[List[ProjectPersona]] = None
    assets: Optional[List[ProjectAsset]] = None

    class Config:
        from_attributes = True

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    phases: Optional[ProjectPhases] = None
    personas: Optional[List[ProjectPersona]] = None
    assets: Optional[List[ProjectAsset]] = None 