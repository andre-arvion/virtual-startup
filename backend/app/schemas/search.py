from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal

class SearchResult(BaseModel):
    id: int
    type: Literal["project", "task"]
    title: str
    description: Optional[str] = None
    status: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    project_id: Optional[int] = None  # Only for tasks
    owner_id: int

    class Config:
        from_attributes = True 