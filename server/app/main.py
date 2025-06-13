from fastapi import FastAPI
from app.routers import users, tasks, statuses
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
app.include_router(statuses.router, prefix="/api/statuses", tags=["Statuses"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Task Management API!"}

