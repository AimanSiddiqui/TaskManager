from pymongo import MongoClient
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DATABASE_NAME")]

users_collection = db["users"]
tasks_collection = db["tasks"]
statuses_collection = db["statuses"]
