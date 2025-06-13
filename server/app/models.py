"""
Data Models Module
Defines Pydantic models for data validation and serialization
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    """
    User model for authentication and registration
    
    Attributes:
        email (str): User's email address
        password (str): User's password (will be hashed before storage)
    """
    email: str
    password: str

class Task(BaseModel):
    """
    Task model for task management
    
    Attributes:
        title (str): Task title/description
        status_id (str): Reference to task status
        created_at (datetime, optional): Task creation timestamp
    """
    title: str
    status_id: str
    created_at: Optional[datetime] = None

class Status(BaseModel):
    """
    Status model for task status options
    
    Attributes:
        status (str): Status name/description
    """
    status: str
