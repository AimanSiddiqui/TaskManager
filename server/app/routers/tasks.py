from fastapi import APIRouter, HTTPException
from app.database import tasks_collection, statuses_collection
from app.models import Task
from datetime import datetime
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from datetime import datetime, timezone


from app.auth import get_current_user_id
from app.utils import fix_object_ids

router = APIRouter(
        dependencies=[Depends(get_current_user_id)]
)


@router.post("/")
async def create_task(task: Task, user_id: str = Depends(get_current_user_id)):
    try:
        status_obj_id = ObjectId(task.status_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid status_id format")

    # validate status using ObjectId
    if not await statuses_collection.find_one({"_id": status_obj_id}):
        raise HTTPException(status_code=400, detail="Invalid status")

    task.created_at = datetime.now(timezone.utc)
    task_dict = task.model_dump()
    task_dict["status_id"] = status_obj_id
    task_dict["user_id"] = ObjectId(user_id)

    result = await tasks_collection.insert_one(task_dict)
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_tasks_with_status(user_id: str = Depends(get_current_user_id)):
    user_obj_id = ObjectId(user_id)

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
                "preserveNullAndEmptyArrays": True,  # In case status is missing
            }
        },
        {
            "$project": {
                "title": 1,
                "created_at": 1,
                "status_id": {"$toString": "$status_id"},  # Convert status_id to string
                "status_name": "$status_docs.status",
            }
        },
    ]

    cursor = tasks_collection.aggregate(pipeline)
    tasks = await cursor.to_list(length=100)

    # Convert ObjectIds to strings before returning
    tasks = [fix_object_ids(task) for task in tasks]


    return tasks