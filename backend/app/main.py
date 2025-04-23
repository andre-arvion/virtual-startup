from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    auth_router, users_router, projects_router, tasks_router, 
    activities_router, search_router, templates_router, 
    markdown_router, persona_router
)
from app.core.error_handlers import internal_exception_handler, sqlalchemy_exception_handler
from sqlalchemy.exc import SQLAlchemyError
from app.core.config import Settings
import logging

settings = Settings()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for the Virtual Startup Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# Add exception handlers
app.add_exception_handler(Exception, internal_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)

# Include routers
app.include_router(auth_router, prefix="/api")  # This will be mounted at /api/auth
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(projects_router, prefix="/api/projects", tags=["Projects"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(activities_router, prefix="/api/activities", tags=["Activities"])
app.include_router(search_router, prefix="/api/search", tags=["Search"])
app.include_router(templates_router, prefix="/api/templates", tags=["Templates"])
app.include_router(markdown_router, prefix="/api/markdown", tags=["Markdown"])
app.include_router(persona_router, prefix="/api/personas", tags=["Personas"])

@app.middleware("http")
async def log_requests(request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logger.exception("Error processing request")
        raise

@app.get("/")
async def root():
    return {"message": "Welcome to Virtual Startup Platform API"} 