from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class PersonaResponse(Base):
    __tablename__ = "persona_responses"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    prompt = Column(String, nullable=False)
    response = Column(String, nullable=False)
    context = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="persona_responses")

class PersonaSession(Base):
    __tablename__ = "persona_sessions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    steps_completed = Column(JSON, default=list)
    current_step = Column(String)
    memory = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="persona_sessions") 