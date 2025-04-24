from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
import traceback
import logging

logger = logging.getLogger(__name__)

async def internal_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for internal server errors
    """
    error_details = {
        "detail": str(exc),
        "type": exc.__class__.__name__,
        "traceback": traceback.format_exc()
    }
    logger.error(f"Internal error: {error_details}")
    return JSONResponse(
        status_code=500,
        content=error_details
    )

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    """
    Exception handler for SQLAlchemy errors
    """
    error_details = {
        "detail": str(exc),
        "type": exc.__class__.__name__,
        "traceback": traceback.format_exc()
    }
    logger.error(f"Database error: {error_details}")
    return JSONResponse(
        status_code=500,
        content=error_details
    ) 