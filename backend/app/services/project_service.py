from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from typing import List, Optional

class ProjectService:
    @staticmethod
    def create_project(db: Session, project: ProjectCreate, owner_id: int) -> Project:
        db_project = Project(
            **project.model_dump(),
            owner_id=owner_id,
            phases={"frontend": 0, "backend": 0, "integration": 0},
            personas=[],
            assets=[]
        )
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
    ) -> Optional[Project]:
        db_project = ProjectService.get_project(db, project_id)
        if db_project:
            update_data = project_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_project, field, value)
            db.commit()
            db.refresh(db_project)
        return db_project

    @staticmethod
    def delete_project(db: Session, project_id: int) -> bool:
        db_project = ProjectService.get_project(db, project_id)
        if db_project:
            db.delete(db_project)
            db.commit()
            return True
        return False

    @staticmethod
    def update_project_phases(
        db: Session, project_id: int, phases: dict
    ) -> Optional[Project]:
        db_project = ProjectService.get_project(db, project_id)
        if db_project:
            db_project.phases = phases
            db.commit()
            db.refresh(db_project)
        return db_project

    @staticmethod
    def update_project_personas(
        db: Session, project_id: int, personas: list
    ) -> Optional[Project]:
        db_project = ProjectService.get_project(db, project_id)
        if db_project:
            db_project.personas = personas
            db.commit()
            db.refresh(db_project)
        return db_project

    @staticmethod
    def update_project_assets(
        db: Session, project_id: int, assets: list
    ) -> Optional[Project]:
        db_project = ProjectService.get_project(db, project_id)
        if db_project:
            db_project.assets = assets
            db.commit()
            db.refresh(db_project)
        return db_project 