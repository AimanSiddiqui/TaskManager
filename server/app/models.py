from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: str
    password: str

class Task(BaseModel):
    title: str
    status_id: str
    created_at: Optional[datetime] = None

class Status(BaseModel):
    status: str
