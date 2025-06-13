/**
 * Login Component
 * Handles user authentication and login form
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../services/authService';

function Login() {
  // Form state management
  const [username, setUsername] = useState('');    // Email input state
  const [password, setPassword] = useState('');    // Password input state
  const [message, setMessage] = useState(null);    // Alert message state
  const navigate = useNavigate();

  /**
   * Handle login form submission
   * Authenticates user and redirects to tasks page on success
   * 
   * @param {Event} e - Form submission event
   */
  async function handleLogin(e) {
    e.preventDefault();
    setMessage(null);

    try {
      // Attempt login and store token
      const data = await login(username, password);
      localStorage.setItem('token', data.access_token);
      navigate('/tasks');
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
  }

  return (
    <Container className="mt-4">
      <h1>Login</h1>
      
      {/* Display error/success messages */}
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      
      {/* Login form */}
      <Form onSubmit={handleLogin}>
        {/* Email input field */}
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password input field */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit" className='mb-3'>Login</Button>
      </Form>

      {/* Registration link */}
      <p>Not yet registered?  
        <a href="/register">Sign Up</a>   
      </p> 
    </Container>
  );
}

export default Login;
