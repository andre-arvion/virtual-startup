import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.project import Project
from app.models.user import User

def add_default_personas():
    # Define the default personas
    default_personas = [
        {
            "id": "vpm",
            "name": "vPM",
            "fullName": "Virtual Product Manager",
            "progress": 0,
            "status": "not_started",
            "icon": "layout-dashboard"
        },
        {
            "id": "vux",
            "name": "vUX",
            "fullName": "Virtual UX Designer",
            "progress": 0,
            "status": "not_started",
            "icon": "image"
        },
        {
            "id": "vcto",
            "name": "vCTO",
            "fullName": "Virtual CTO",
            "progress": 0,
            "status": "not_started",
            "icon": "code"
        },
        {
            "id": "vciso",
            "name": "vCISO",
            "fullName": "Virtual CISO",
            "progress": 0,
            "status": "not_started",
            "icon": "shield"
        },
        {
            "id": "vtechwriter",
            "name": "vTech Writer",
            "fullName": "Virtual Tech Writer",
            "progress": 0,
            "status": "not_started",
            "icon": "file-text"
        }
    ]

    # Create a new session
    db = SessionLocal()
    try:
        # Get all projects
        projects = db.query(Project).all()
        print(f"Found {len(projects)} projects")

        # Update each project
        for project in projects:
            project.personas = default_personas
            print(f"Updated personas for project {project.id}: {project.title}")

        # Commit the changes
        db.commit()
        print("Successfully updated all projects with default personas")

    except Exception as e:
        print(f"Error updating projects: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    add_default_personas() 