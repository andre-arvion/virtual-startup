from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.prompt import Prompt
from app.schemas.prompt import PromptCreate, PromptUpdate

class PromptService:
    @staticmethod
    def create_prompt(db: Session, prompt: PromptCreate) -> Prompt:
        # If this is set as default, unset any existing default for this persona
        if prompt.is_default:
            existing_default = (
                db.query(Prompt)
                .filter(
                    Prompt.persona_id == prompt.persona_id,
                    Prompt.is_default == True
                )
                .first()
            )
            if existing_default:
                existing_default.is_default = False
                db.commit()

        db_prompt = Prompt(**prompt.model_dump())
        db.add(db_prompt)
        db.commit()
        db.refresh(db_prompt)
        return db_prompt

    @staticmethod
    def get_prompt(db: Session, prompt_id: int) -> Optional[Prompt]:
        return db.query(Prompt).filter(Prompt.id == prompt_id).first()

    @staticmethod
    def get_persona_prompts(db: Session, persona_id: str) -> List[Prompt]:
        return db.query(Prompt).filter(Prompt.persona_id == persona_id).all()

    @staticmethod
    def get_default_prompt(db: Session, persona_id: str) -> Optional[Prompt]:
        return (
            db.query(Prompt)
            .filter(
                Prompt.persona_id == persona_id,
                Prompt.is_default == True
            )
            .first()
        )

    @staticmethod
    def update_prompt(db: Session, prompt_id: int, prompt_update: PromptUpdate) -> Optional[Prompt]:
        db_prompt = PromptService.get_prompt(db, prompt_id)
        if not db_prompt:
            return None

        # If setting as default, unset any existing default
        if prompt_update.is_default:
            existing_default = (
                db.query(Prompt)
                .filter(
                    Prompt.persona_id == db_prompt.persona_id,
                    Prompt.is_default == True,
                    Prompt.id != prompt_id
                )
                .first()
            )
            if existing_default:
                existing_default.is_default = False

        for key, value in prompt_update.model_dump(exclude_unset=True).items():
            setattr(db_prompt, key, value)
        
        db.commit()
        db.refresh(db_prompt)
        return db_prompt

    @staticmethod
    def delete_prompt(db: Session, prompt_id: int) -> bool:
        db_prompt = PromptService.get_prompt(db, prompt_id)
        if db_prompt:
            db.delete(db_prompt)
            db.commit()
            return True
        return False 