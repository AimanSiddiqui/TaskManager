# Task Manager Application

This is a full-stack application with a React frontend and FastAPI backend, using MongoDB as the database.

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Project Structure

```
.
├── web/                      # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # Page components
│   │   ├── services/        # API services and utilities
│   │   ├── App.js           # Main application component
│   │   ├── index.js         # Application entry point
│   │   └── ...             # Other configuration files
│   ├── package.json         # Frontend dependencies
│   └── yarn.lock           # Dependency lock file
│
└── server/                   # FastAPI backend
    ├── app/                 # Application package
    │   ├── routers/        # API route handlers
    │   ├── main.py         # Application entry point
    │   ├── models.py       # Database models
    │   ├── database.py     # Database configuration
    │   ├── auth.py         # Authentication logic
    │   └── utils.py        # Utility functions
    ├── requirements.txt     # Python dependencies
    └── venv/               # Python virtual environment
```

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The server will start at `http://localhost:8000`

## Frontend Setup

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the web directory:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The frontend will start at `http://localhost:3000`

## MongoDB Setup

1. Install MongoDB Community Edition from [MongoDB's official website](https://www.mongodb.com/try/download/community)

2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # Linux
   sudo systemctl start mongod

   # Mac
   brew services start mongodb-community
   ```

3. Verify MongoDB is running:
   ```bash
   mongosh
   ```

4. Create a database and user (optional, for production):
   ```javascript
   use your_database_name
   db.createUser({
     user: "your_username",
     pwd: "your_password",
     roles: ["readWrite"]
   })
   ```

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

- Backend API runs on port 8000
- Frontend development server runs on port 3000
- MongoDB runs on port 27017

## Production Deployment

For production deployment:
1. Build the frontend:
   ```bash
   cd web
   npm run build
   ```

2. Set appropriate environment variables for production
3. Use a production-grade server (e.g., Gunicorn) for the backend
4. Configure proper MongoDB authentication and security settings
5. Set up proper CORS and security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

