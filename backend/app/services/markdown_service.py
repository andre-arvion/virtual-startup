from sqlalchemy.orm import Session
from typing import List, Optional
import os
import zipfile
import io
from datetime import datetime
from app.core.config import settings

class MarkdownService:
    @staticmethod
    def save_markdown(
        db: Session,
        project_id: int,
        filename: str,
        content: str,
        directory: str = None
    ) -> str:
        # Use configured directory or default
        directory = directory or settings.MARKDOWN_DIRECTORY
        
        # Ensure the project directory exists
        project_dir = os.path.join(directory, str(project_id))
        os.makedirs(project_dir, exist_ok=True)
        
        # Save the markdown file
        file_path = os.path.join(project_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        return file_path

    @staticmethod
    def get_markdown(project_id: int, filename: str, directory: str = None) -> Optional[str]:
        directory = directory or settings.MARKDOWN_DIRECTORY
        file_path = os.path.join(directory, str(project_id), filename)
        if not os.path.exists(file_path):
            return None
        
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    @staticmethod
    def get_all_markdowns(project_id: int, directory: str = None) -> List[dict]:
        directory = directory or settings.MARKDOWN_DIRECTORY
        project_dir = os.path.join(directory, str(project_id))
        if not os.path.exists(project_dir):
            return []
        
        markdown_files = []
        for filename in os.listdir(project_dir):
            if filename.endswith(".md"):
                file_path = os.path.join(project_dir, filename)
                stat = os.stat(file_path)
                markdown_files.append({
                    "filename": filename,
                    "size": stat.st_size,
                    "last_modified": datetime.fromtimestamp(stat.st_mtime).isoformat()
                })
        
        return markdown_files

    @staticmethod
    def create_zip_bundle(project_id: int, directory: str = None) -> Optional[bytes]:
        directory = directory or settings.MARKDOWN_DIRECTORY
        project_dir = os.path.join(directory, str(project_id))
        if not os.path.exists(project_dir):
            return None

        # Create a BytesIO object to store the ZIP file
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for filename in os.listdir(project_dir):
                if filename.endswith(".md"):
                    file_path = os.path.join(project_dir, filename)
                    # Add file to ZIP with just the filename (no path)
                    zip_file.write(file_path, filename)
        
        zip_buffer.seek(0)
        return zip_buffer.getvalue()

    @staticmethod
    def delete_markdown(project_id: int, filename: str, directory: str = None) -> bool:
        directory = directory or settings.MARKDOWN_DIRECTORY
        file_path = os.path.join(directory, str(project_id), filename)
        if not os.path.exists(file_path):
            return False
        
        os.remove(file_path)
        return True 