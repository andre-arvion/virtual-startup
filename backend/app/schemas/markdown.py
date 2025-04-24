from pydantic import BaseModel
from datetime import datetime

class MarkdownCreate(BaseModel):
    filename: str
    content: str

class MarkdownResponse(BaseModel):
    filename: str
    size: int
    last_modified: datetime

class MarkdownContent(BaseModel):
    content: str 