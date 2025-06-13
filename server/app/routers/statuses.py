from fastapi import APIRouter
from app.database import statuses_collection
from app.models import Status

router = APIRouter()

@router.post("/")
async def add_status(status: Status):
    result = await statuses_collection.insert_one(status.dict())
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_statuses():
    statuses_cursor = statuses_collection.find()
    statuses = await statuses_cursor.to_list(100)
    # Convert ObjectId to string for all documents
    for status in statuses:
        status["_id"] = str(status["_id"])
    return statuses