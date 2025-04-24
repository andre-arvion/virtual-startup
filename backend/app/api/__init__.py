"""
API routes package
"""

from .auth import router as auth_router
from .users import router as users_router
from .projects import router as projects_router
from .tasks import router as tasks_router
from .activities import router as activities_router
from .search import router as search_router
from .templates import router as templates_router
from .markdown import router as markdown_router
from .persona import router as persona_router

__all__ = [
    'auth_router',
    'users_router',
    'projects_router',
    'tasks_router',
    'activities_router',
    'search_router',
    'templates_router',
    'markdown_router',
    'persona_router'
] 