from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.project_template import ProjectTemplate
from app.schemas.project_template import ProjectTemplateCreate, ProjectTemplateUpdate
from app.services.project_service import ProjectService
from app.schemas.project import ProjectCreate
import json

class ProjectTemplateService:
    @staticmethod
    def create_template(
        db: Session, template: ProjectTemplateCreate, owner_id: int
    ) -> ProjectTemplate:
        template_data = template.model_dump()
        # Convert JSON fields to strings
        for field in ['phases', 'personas', 'task_templates']:
            if field in template_data and template_data[field] is not None:
                template_data[field] = json.dumps(template_data[field])
        
        db_template = ProjectTemplate(**template_data, owner_id=owner_id)
        db.add(db_template)
        db.commit()
        db.refresh(db_template)
        return db_template

    @staticmethod
    def get_template(db: Session, template_id: int) -> Optional[ProjectTemplate]:
        template = db.query(ProjectTemplate).filter(ProjectTemplate.id == template_id).first()
        if template:
            # Parse JSON fields
            for field in ['phases', 'personas', 'task_templates']:
                value = getattr(template, field)
                if value is not None:
                    setattr(template, field, json.loads(value))
        return template

    @staticmethod
    def get_user_templates(
        db: Session, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[ProjectTemplate]:
        templates = (
            db.query(ProjectTemplate)
            .filter(ProjectTemplate.owner_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
        # Parse JSON fields for each template
        for template in templates:
            for field in ['phases', 'personas', 'task_templates']:
                value = getattr(template, field)
                if value is not None:
                    setattr(template, field, json.loads(value))
        return templates

    @staticmethod
    def update_template(
        db: Session, template_id: int, template_update: ProjectTemplateUpdate
    ) -> Optional[ProjectTemplate]:
        db_template = ProjectTemplateService.get_template(db, template_id)
        if db_template:
            update_data = template_update.model_dump(exclude_unset=True)
            # Convert JSON fields to strings
            for field in ['phases', 'personas', 'task_templates']:
                if field in update_data and update_data[field] is not None:
                    update_data[field] = json.dumps(update_data[field])
            
            for field, value in update_data.items():
                setattr(db_template, field, value)
            db.commit()
            db.refresh(db_template)
            
            # Parse JSON fields after refresh
            for field in ['phases', 'personas', 'task_templates']:
                value = getattr(db_template, field)
                if value is not None:
                    setattr(db_template, field, json.loads(value))
        return db_template

    @staticmethod
    def delete_template(db: Session, template_id: int) -> bool:
        db_template = ProjectTemplateService.get_template(db, template_id)
        if db_template:
            db.delete(db_template)
            db.commit()
            return True
        return False

    @staticmethod
    def create_project_from_template(
        db: Session, template_id: int, owner_id: int, project_name: str
    ) -> Optional[ProjectTemplate]:
        template = ProjectTemplateService.get_template(db, template_id)
        if not template:
            return None

        # Create project from template
        project_data = ProjectCreate(
            title=project_name,
            description=template.description,
            type=template.type,
            status="planning"
        )
        project = ProjectService.create_project(db, project_data, owner_id)

        # Copy template data to project
        if template.phases:
            project.phases = template.phases
        if template.personas:
            project.personas = template.personas

        db.commit()
        db.refresh(project)
        return project 