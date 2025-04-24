from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List
from app.models.project import Project
from app.models.task import Task
from app.schemas.search import SearchResult

class SearchService:
    @staticmethod
    def search(
        db: Session,
        query: str,
        user_id: int,
        type: str = None,
        skip: int = 0,
        limit: int = 20
    ) -> List[SearchResult]:
        # Convert query to lowercase for case-insensitive search
        search_query = f"%{query.lower()}%"
        results = []

        if type != "task":  # Search projects if type is None or "project"
            projects = (
                db.query(Project)
                .filter(
                    Project.owner_id == user_id,
                    or_(
                        Project.title.ilike(search_query),
                        Project.description.ilike(search_query)
                    )
                )
                .offset(skip)
                .limit(limit)
                .all()
            )
            
            for project in projects:
                results.append(
                    SearchResult(
                        id=project.id,
                        type="project",
                        title=project.title,
                        description=project.description,
                        status=project.status,
                        created_at=project.created_at,
                        updated_at=project.updated_at,
                        owner_id=project.owner_id
                    )
                )

        if type != "project":  # Search tasks if type is None or "task"
            tasks = (
                db.query(Task)
                .join(Project)
                .filter(
                    Project.owner_id == user_id,
                    or_(
                        Task.title.ilike(search_query),
                        Task.description.ilike(search_query)
                    )
                )
                .offset(skip)
                .limit(limit)
                .all()
            )
            
            for task in tasks:
                results.append(
                    SearchResult(
                        id=task.id,
                        type="task",
                        title=task.title,
                        description=task.description,
                        status=task.status,
                        created_at=task.created_at,
                        updated_at=task.updated_at,
                        project_id=task.project_id,
                        owner_id=task.creator_id
                    )
                )

        # Sort results by created_at in descending order
        results.sort(key=lambda x: x.created_at, reverse=True)
        return results[:limit] 