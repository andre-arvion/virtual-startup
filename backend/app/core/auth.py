from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database import get_db
from app.models.user import User
import logging

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    logger.debug(f"Created access token: {encoded_jwt[:10]}...")
    return encoded_jwt

async def get_token_from_cookie_or_header(request: Request, token: str = Depends(oauth2_scheme)) -> Optional[str]:
    """
    Get the token from either the cookie or the Authorization header
    """
    logger.debug(f"Extracting token from request")
    logger.debug(f"Cookies present: {list(request.cookies.keys())}")
    logger.debug(f"Authorization header present: {'authorization' in request.headers}")
    
    # First try to get from cookie
    if "access_token" in request.cookies:
        auth_token = request.cookies["access_token"]
        logger.debug(f"Found token in cookie: {auth_token[:10]}...")
        return auth_token
    
    # If no cookie, check for Authorization header
    if token:
        logger.debug(f"Found token in header: {token[:10]}...")
        if token.startswith("Bearer "):
            return token[7:]
        return token
    
    logger.warning("No token found in cookie or header")
    return None

async def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    token: Optional[str] = Depends(get_token_from_cookie_or_header)
) -> User:
    logger.debug("Authenticating user")
    
    if not token:
        logger.error("No token provided")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        logger.debug(f"Decoding token: {token[:10]}...")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            logger.error("Token payload missing user ID")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError as e:
        logger.error(f"Token validation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        logger.error(f"No user found for ID: {user_id}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    logger.info(f"Successfully authenticated user: {user.email}")
    return user 