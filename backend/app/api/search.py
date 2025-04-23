from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Union
from app.database import get_db
from app.services.search_service import SearchService
from app.schemas.search import SearchResult
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[SearchResult])
def search(
    q: str = Query(..., min_length=3, description="Search query"),
    type: str = Query(None, description="Filter by type (project/task)"),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Search across projects and tasks.
    The search looks for matches in titles and descriptions.
    """
    return SearchService.search(db, q, current_user.id, type, skip, limit) 