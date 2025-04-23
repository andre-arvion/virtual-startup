from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate
from fastapi import HTTPException
from typing import List, Optional
from datetime import datetime

class TaskService:
    @staticmethod
    def create_task(db: Session, task: TaskCreate, creator_id: int) -> Task:
        db_task = Task(
            **task.model_dump(),
            creator_id=creator_id
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def get_task(db: Session, task_id: int) -> Task:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return task

    @staticmethod
    def get_project_tasks(db: Session, project_id: int, skip: int = 0, limit: int = 100) -> List[Task]:
        return db.query(Task).filter(Task.project_id == project_id).offset(skip).limit(limit).all()

    @staticmethod
    def get_user_tasks(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Task]:
        return db.query(Task).filter(Task.assignee_id == user_id).offset(skip).limit(limit).all()

    @staticmethod
    def update_task(db: Session, task_id: int, task_update: TaskUpdate) -> Task:
        db_task = TaskService.get_task(db, task_id)
        update_data = task_update.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_task, field, value)
        
        db_task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(db: Session, task_id: int) -> None:
        db_task = TaskService.get_task(db, task_id)
        db.delete(db_task)
        db.commit() 