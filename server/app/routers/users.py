from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.models import User
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register(user: User):
    if await users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Username already exists")
    user.password = hash_password(user.password)
    result = await users_collection.insert_one(user.dict())
    return {"id": str(result.inserted_id)}

@router.post("/login")
async def login(user: User):
    db_user = await users_collection.find_one({"email": user.email})
    print(db_user)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Convert ObjectId to string
    user_id = str(db_user["_id"])
    
    # Create the access token with the user_id as a string
    access_token = create_access_token(data={"email": user.email, "user_id": user_id})
    
    return {"access_token": access_token, "token_type": "bearer"}
