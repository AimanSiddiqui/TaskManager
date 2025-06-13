"""
Task Router Module
Handles all task-related API endpoints including creation and retrieval
"""
from fastapi import APIRouter, HTTPException
from app.database import tasks_collection, statuses_collection
from app.models import Task
from datetime import datetime
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from datetime import datetime, timezone

from app.auth import get_current_user_id
from app.utils import fix_object_ids

# Initialize router with authentication dependency
router = APIRouter(
    dependencies=[Depends(get_current_user_id)]  # All routes require authentication
)

@router.post("/")
async def create_task(task: Task, user_id: str = Depends(get_current_user_id)):
    """
    Create a new task
    
    Args:
        task (Task): Task data from request body
        user_id (str): Current user's ID from authentication
        
    Returns:
        dict: Created task ID
        
    Raises:
        HTTPException: If status_id is invalid or status doesn't exist
    """
    # Validate status_id format
    try:
        status_obj_id = ObjectId(task.status_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid status_id format")

    # Verify status exists in database
    if not await statuses_collection.find_one({"_id": status_obj_id}):
        raise HTTPException(status_code=400, detail="Invalid status")

    # Prepare task document
    task.created_at = datetime.now(timezone.utc)
    task_dict = task.model_dump()
    task_dict["status_id"] = status_obj_id
    task_dict["user_id"] = ObjectId(user_id)

    # Insert task into database
    result = await tasks_collection.insert_one(task_dict)
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_tasks_with_status(user_id: str = Depends(get_current_user_id)):
    """
    Get all tasks for the current user with their status information
    
    Args:
        user_id (str): Current user's ID from authentication
        
    Returns:
        list: List of tasks with status information
    """
    user_obj_id = ObjectId(user_id)

    # MongoDB aggregation pipeline to join tasks with statuses
    pipeline = [
        {"$match": {"user_id": user_obj_id}},  # Filter by user_id
        {
            "$lookup": {
                "from": "statuses",
                "localField": "status_id",
                "foreignField": "_id",
                "as": "status_docs",
            }
        },
        {
            "$unwind": {
                "path": "$status_docs",
                "preserveNullAndEmptyArrays": True,  # Keep tasks even if status is missing
            }
        },
        {
            "$project": {
                "title": 1,
                "created_at": 1,
                "status_id": {"$toString": "$status_id"},  # Convert ObjectId to string
                "status_name": "$status_docs.status",
            }
        },
    ]

    # Execute aggregation pipeline
    cursor = tasks_collection.aggregate(pipeline)
    tasks = await cursor.to_list(length=100)

    # Convert ObjectIds to strings for JSON serialization
    tasks = [fix_object_ids(task) for task in tasks]

    return tasks