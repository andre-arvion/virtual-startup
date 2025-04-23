from sqlalchemy.orm import Session
from app.models.task import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskUpdate
from fastapi import HTTPException
from typing import List, Optional, Dict
from datetime import datetime

class TaskService:
    @staticmethod
    def create_task(db: Session, task: TaskCreate) -> Task:
        db_task = Task(**task.model_dump())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def get_task(db: Session, task_id: int) -> Optional[Task]:
        return db.query(Task).filter(Task.id == task_id).first()

    @staticmethod
    def get_project_tasks(db: Session, project_id: int) -> List[Task]:
        return db.query(Task).filter(Task.project_id == project_id).all()

    @staticmethod
    def get_user_tasks(
        db: Session, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Task]:
        return (
            db.query(Task)
            .filter(Task.assignee_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def update_task(db: Session, task_id: int, task_update: TaskUpdate) -> Optional[Task]:
        db_task = TaskService.get_task(db, task_id)
        if db_task:
            # If status is changed to DONE, set completed to True
            update_data = task_update.model_dump(exclude_unset=True)
            if 'status' in update_data and update_data['status'] == TaskStatus.DONE:
                update_data['completed'] = True
            elif 'status' in update_data and update_data['status'] != TaskStatus.DONE:
                update_data['completed'] = False

            for key, value in update_data.items():
                setattr(db_task, key, value)
            
            db.commit()
            db.refresh(db_task)
        return db_task

    @staticmethod
    def delete_task(db: Session, task_id: int) -> bool:
        db_task = TaskService.get_task(db, task_id)
        if db_task:
            db.delete(db_task)
            db.commit()
            return True
        return False

    @staticmethod
    def get_project_task_stats(db: Session, project_id: int) -> Dict[str, Dict[str, int]]:
        """Get task completion statistics by phase for a project."""
        tasks = TaskService.get_project_tasks(db, project_id)
        stats = {
            "frontend": {"total": 0, "completed": 0},
            "backend": {"total": 0, "completed": 0},
            "integration": {"total": 0, "completed": 0}
        }
        
        for task in tasks:
            phase = task.phase
            stats[phase]["total"] += 1
            if task.completed or task.status == TaskStatus.DONE:
                stats[phase]["completed"] += 1
        
        return stats 