import os
import sys

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import Base, engine, SessionLocal
from app.models.user import User
from app.models.project import Project
from app.models.task import Task
from app.models.activity import Activity
from app.models.project_template import ProjectTemplate
from app.core.security import get_password_hash

def setup_database():
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Create a session
    db = SessionLocal()
    
    try:
        # Check if test user exists
        test_user = db.query(User).filter(User.email == "test@example.com").first()
        
        if not test_user:
            # Create test user
            test_user = User(
                email="test@example.com",
                hashed_password=get_password_hash("password123"),
                full_name="Test User"
            )
            db.add(test_user)
            db.commit()
            print("Test user created successfully")
        else:
            print("Test user already exists")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    setup_database() 