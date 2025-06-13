"""
Main FastAPI application module
Sets up the application, middleware, and routes
"""
from fastapi import FastAPI
from app.routers import users, tasks, statuses
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI application
app = FastAPI(
    title="Task Manager API",
    description="API for managing tasks and user authentication",
    version="1.0.0"
)

# Configure CORS middleware
# This allows the frontend application to make requests to the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routers with their respective prefixes and tags
# Tags are used for API documentation grouping
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(statuses.router, prefix="/api/statuses", tags=["Statuses"])

@app.get("/")
async def root():
    """
    Root endpoint
    Returns a welcome message
    """
    return {"message": "Welcome to the Task Management API!"}

