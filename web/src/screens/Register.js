/**
 * Register Component
 * Handles user registration and account creation
 */
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  // Form state management
  const [email, setEmail] = useState('');         // Email input state
  const [password, setPassword] = useState('');   // Password input state
  const [message, setMessage] = useState(null);   // Alert message state
  const navigate = useNavigate();

  /**
   * Handle registration form submission
   * Creates new user account and redirects to login on success
   * 
   * @param {Event} e - Form submission event
   */
  async function handleRegister(e) {
    e.preventDefault();
    setMessage(null);

    try {
      // Attempt user registration
      await register(email, password);
      setMessage({ type: 'success', text: 'Registration successful! You can now log in.' });
      // Redirect to login page after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
  }

  return (
    <Container className="mt-4">
      <h1>Register</h1>
      
      {/* Display success/error messages */}
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      
      {/* Registration form */}
      <Form onSubmit={handleRegister}>
        {/* Email input field */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
}

export default Register;
