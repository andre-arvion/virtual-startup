from sqlalchemy.orm import Session
from typing import Optional, List, Dict
from datetime import datetime
from app.models.persona import PersonaResponse, PersonaSession
from app.schemas.persona import PersonaPrompt, PersonaStepStatus

class PersonaService:
    @staticmethod
    def create_response(
        db: Session,
        project_id: int,
        prompt: str,
        response: str,
        context: Dict = None
    ) -> PersonaResponse:
        db_response = PersonaResponse(
            project_id=project_id,
            prompt=prompt,
            response=response,
            context=context or {}
        )
        db.add(db_response)
        db.commit()
        db.refresh(db_response)
        return db_response

    @staticmethod
    def get_project_responses(
        db: Session,
        project_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[PersonaResponse]:
        return (
            db.query(PersonaResponse)
            .filter(PersonaResponse.project_id == project_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def create_or_get_session(
        db: Session,
        project_id: int
    ) -> PersonaSession:
        session = (
            db.query(PersonaSession)
            .filter(PersonaSession.project_id == project_id)
            .first()
        )
        
        if not session:
            session = PersonaSession(
                project_id=project_id,
                steps_completed=[],
                current_step="initial",
                memory={}
            )
            db.add(session)
            db.commit()
            db.refresh(session)
        
        return session

    @staticmethod
    def update_session(
        db: Session,
        session_id: int,
        current_step: str = None,
        memory: Dict = None,
        completed_step: str = None
    ) -> PersonaSession:
        session = db.query(PersonaSession).filter(PersonaSession.id == session_id).first()
        if not session:
            return None

        if current_step:
            session.current_step = current_step
        
        if memory:
            session.memory.update(memory)
        
        if completed_step and completed_step not in session.steps_completed:
            session.steps_completed.append(completed_step)
        
        session.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def get_step_status(
        db: Session,
        project_id: int,
        step: str
    ) -> PersonaStepStatus:
        session = PersonaService.create_or_get_session(db, project_id)
        
        if step in session.steps_completed:
            status = "completed"
        elif step == session.current_step:
            status = "in_progress"
        else:
            status = "pending"
        
        return PersonaStepStatus(
            step=step,
            status=status,
            completed_at=session.updated_at if status == "completed" else None
        ) 