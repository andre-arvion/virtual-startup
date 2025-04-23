from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from typing import List, Optional

class ProjectService:
    @staticmethod
    def create_project(db: Session, project: ProjectCreate, owner_id: int) -> Project:
        db_project = Project(**project.model_dump(), owner_id=owner_id)
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def get_project(db: Session, project_id: int) -> Optional[Project]:
        return db.query(Project).filter(Project.id == project_id).first()

    @staticmethod
    def get_user_projects(
        db: Session, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Project]:
        return (
            db.query(Project)
            .filter(Project.owner_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def update_project(
        db: Session, project_id: int, project_update: ProjectUpdate
    ) -> Project:
        db_project = ProjectService.get_project(db, project_id)
        update_data = project_update.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_project, field, value)
        
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def delete_project(db: Session, project_id: int) -> None:
        db_project = ProjectService.get_project(db, project_id)
        db.delete(db_project)
        db.commit() 