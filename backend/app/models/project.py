from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.persona import PersonaResponse, PersonaSession

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(String)  # Adding type field
    status = Column(String)  # Adding status field
    phases = Column(JSON, default=dict)  # {"frontend": 0, "backend": 0, "integration": 0}
    personas = Column(JSON, default=list)  # List of completed personas
    assets = Column(JSON, default=list)  # List of project assets/links
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Relationships
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="project", cascade="all, delete-orphan")
    persona_responses = relationship("PersonaResponse", back_populates="project", cascade="all, delete-orphan")
    persona_sessions = relationship("PersonaSession", back_populates="project", cascade="all, delete-orphan") 