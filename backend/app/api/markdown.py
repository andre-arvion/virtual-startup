from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from app.services.markdown_service import MarkdownService
from app.schemas.markdown import MarkdownCreate, MarkdownResponse, MarkdownContent
from app.dependencies import get_db, get_current_user
from app.models.user import User
import os
from datetime import datetime

router = APIRouter(prefix="/markdown", tags=["Markdown"])

@router.post("/{project_id}", response_model=MarkdownResponse)
def save_markdown(
    project_id: int,
    markdown: MarkdownCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Save a markdown file for a specific project."""
    try:
        file_path = MarkdownService.save_markdown(
            db=db,
            project_id=project_id,
            filename=markdown.filename,
            content=markdown.content
        )
        stat = os.stat(file_path)
        return MarkdownResponse(
            filename=markdown.filename,
            size=stat.st_size,
            last_modified=datetime.fromtimestamp(stat.st_mtime)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}", response_model=List[MarkdownResponse])
def get_all_markdowns(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all markdown files for a specific project."""
    try:
        return MarkdownService.get_all_markdowns(project_id=project_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}/{filename}", response_model=MarkdownContent)
def get_markdown(
    project_id: int,
    filename: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific markdown file's content."""
    content = MarkdownService.get_markdown(project_id=project_id, filename=filename)
    if content is None:
        raise HTTPException(status_code=404, detail="Markdown file not found")
    return MarkdownContent(content=content)

@router.get("/{project_id}/download/zip")
def download_zip_bundle(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download all markdown files as a ZIP bundle."""
    zip_data = MarkdownService.create_zip_bundle(project_id=project_id)
    if zip_data is None:
        raise HTTPException(status_code=404, detail="No markdown files found")
    
    return Response(
        content=zip_data,
        media_type="application/zip",
        headers={
            "Content-Disposition": f"attachment; filename=project_{project_id}_markdowns.zip"
        }
    )

@router.delete("/{project_id}/{filename}")
def delete_markdown(
    project_id: int,
    filename: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a specific markdown file."""
    if not MarkdownService.delete_markdown(project_id=project_id, filename=filename):
        raise HTTPException(status_code=404, detail="Markdown file not found")
    return {"message": "File deleted successfully"} 