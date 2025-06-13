"""
Database Configuration Module
Sets up MongoDB connection and collection references
"""
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables from .env file
load_dotenv()

# Initialize MongoDB client with async support
client = AsyncIOMotorClient(os.getenv("MONGO_URI"))

# Get database instance
db = client[os.getenv("DATABASE_NAME")]

# Collection references
users_collection = db["users"]      # Stores user accounts and authentication data
tasks_collection = db["tasks"]      # Stores task information
statuses_collection = db["statuses"] # Stores task status options
