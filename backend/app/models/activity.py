from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum

class ActivityType(str, enum.Enum):
    PROJECT_CREATED = "project_created"
    PROJECT_UPDATED = "project_updated"
    PROJECT_DELETED = "project_deleted"
    TASK_CREATED = "task_created"
    TASK_UPDATED = "task_updated"
    TASK_DELETED = "task_deleted"
    TASK_ASSIGNED = "task_assigned"
    TASK_COMPLETED = "task_completed"

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(SQLEnum(ActivityType), nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="activities")
    project = relationship("Project", back_populates="activities")
    task = relationship("Task", back_populates="activities") 