from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Dict, Literal

class ProjectAsset(BaseModel):
    id: str
    name: str
    url: str
    type: str
    description: Optional[str] = None
    lastUpdated: Optional[str] = None
    icon: str

class ProjectPersona(BaseModel):
    id: str
    name: str
    fullName: str
    progress: int = Field(ge=0, le=100)
    status: Literal["not_started", "in_progress", "completed"]
    icon: str

class ProjectPhases(BaseModel):
    frontend: int = Field(ge=0, le=100)
    backend: int = Field(ge=0, le=100)
    integration: int = Field(ge=0, le=100)

class ProjectBase(BaseModel):
    title: str
    description: str
    type: str
    status: Literal["Planning", "In Progress", "Completed"]

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int
    phases: ProjectPhases = Field(default_factory=lambda: ProjectPhases(frontend=0, backend=0, integration=0))
    personas: List[ProjectPersona] = Field(default_factory=list)
    assets: List[ProjectAsset] = Field(default_factory=list)

    class Config:
        from_attributes = True

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    status: Optional[Literal["Planning", "In Progress", "Completed"]] = None
    phases: Optional[ProjectPhases] = None
    personas: Optional[List[ProjectPersona]] = None
    assets: Optional[List[ProjectAsset]] = None 