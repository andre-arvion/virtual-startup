from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.services import UserService
from app.schemas.user import User, UserCreate
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: UserCreate,
) -> Any:
    user = UserService.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = UserService.create_user(db, user_in)
    return user

@router.get("/me", response_model=User)
def read_user_me(
    current_user: User = Depends(get_current_user),
) -> Any:
    return current_user

@router.get("/", response_model=List[User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    users = UserService.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}", response_model=User)
def read_user_by_id(
    user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    user = UserService.get_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user