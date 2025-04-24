from typing import Generator, Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database import SessionLocal
from app.models.user import User
from app.core.auth import get_current_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db() -> Generator[Session, None, None]:
    """
    Dependency function that yields database sessions.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_token_from_cookie_or_header(request: Request, token: str = Depends(oauth2_scheme)) -> str:
    """
    Get the token from either the cookie or the Authorization header
    """
    if not token and "access_token" in request.cookies:
        auth_token = request.cookies["access_token"]
        if auth_token.startswith("Bearer "):
            return auth_token.split(" ")[1]
    return token

async def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_cookie_or_header)
) -> User:
    """
    Dependency function that returns the current authenticated user.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        user_id: Optional[int] = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
        
    return user 