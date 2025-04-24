from sqlalchemy.orm import Session
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate
from typing import List, Optional
import json

class ActivityService:
    @staticmethod
    def create_activity(db: Session, activity: ActivityCreate, user_id: int) -> Activity:
        # Convert meta_data dict to JSON string if present
        meta_data_str = json.dumps(activity.meta_data) if activity.meta_data else None
        
        db_activity = Activity(
            type=activity.type,
            description=activity.description,
            meta_data=meta_data_str,
            project_id=activity.project_id,
            user_id=user_id
        )
        db.add(db_activity)
        db.commit()
        db.refresh(db_activity)
        return db_activity

    @staticmethod
    def get_project_activities(
        db: Session, project_id: int, skip: int = 0, limit: int = 100
    ) -> List[Activity]:
        return (
            db.query(Activity)
            .filter(Activity.project_id == project_id)
            .order_by(Activity.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_user_activities(
        db: Session, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Activity]:
        return (
            db.query(Activity)
            .filter(Activity.user_id == user_id)
            .order_by(Activity.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        ) 