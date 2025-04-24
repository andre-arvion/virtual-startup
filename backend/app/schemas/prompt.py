from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PromptBase(BaseModel):
    persona_id: str
    name: str
    content: str
    is_default: bool = False

class PromptCreate(PromptBase):
    pass

class PromptUpdate(BaseModel):
    name: Optional[str] = None
    content: Optional[str] = None
    is_default: Optional[bool] = None

class Prompt(PromptBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 