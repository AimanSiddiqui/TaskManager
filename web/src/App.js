/**
 * Main Application Component
 * Handles routing and authentication state management
 */
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import TaskManager from './screens/TaskManager';

function App() {
  // Initialize authentication state based on token presence in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  /**
   * Effect hook to listen for changes in localStorage
   * Updates authentication state when token changes
   */
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Get current token from localStorage
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route - Redirects to login if not authenticated */}
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
