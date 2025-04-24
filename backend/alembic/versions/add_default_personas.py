"""Add default personas to all projects

Revision ID: add_default_personas
Create Date: 2024-03-21 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy.dialects.postgresql import JSONB

# revision identifiers, used by Alembic.
revision = 'add_default_personas'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create a table object for the projects table
    projects_table = table('projects',
        column('id', sa.Integer),
        column('personas', sa.JSON)
    )

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

    # Update all existing projects to include the default personas
    op.execute(
        projects_table.update().values(
            personas=default_personas
        )
    )

def downgrade():
    # Create a table object for the projects table
    projects_table = table('projects',
        column('id', sa.Integer),
        column('personas', sa.JSON)
    )

    # Reset personas to empty array for all projects
    op.execute(
        projects_table.update().values(
            personas=[]
        )
    ) 