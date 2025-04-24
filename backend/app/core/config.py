from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Virtual Startup Platform"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = "sqlite:///./app.db"
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: list = ["http://localhost:8080", "http://localhost:8001"]
    
    # File Storage
    MARKDOWN_DIRECTORY: str = "markdowns"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 