/**
 * TaskForm Component
 * Form for creating new tasks with title and status selection
 * 
 * @param {Object} props
 * @param {Array} props.statuses - List of available task statuses
 * @param {boolean} props.loadingStatuses - Loading state for statuses
 * @param {Function} props.fetchTasks - Function to refresh task list
 * @param {Function} props.setMessage - Function to set alert messages
 */
import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { createTask } from '../../services/taskService';

function TaskForm({ statuses, loadingStatuses, fetchTasks, setMessage }) {
  // Form state management
  const [title, setTitle] = useState('');     // Task title input state
  const [status, setStatus] = useState('');   // Selected status state

  /**
   * Handle task form submission
   * Creates new task and refreshes task list on success
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const payload = { title, status_id: status };

    try {
      const token = localStorage.getItem('token');
      await createTask(payload, token);
      // Reset form and show success message
      setTitle('');
      setStatus(statuses[0]?._id || '');
      setMessage({ type: 'success', text: 'Task created successfully!' });
      fetchTasks();
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Task title input field */}
      <Form.Group className="mb-3" controlId="taskTitle">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      {/* Status selection dropdown */}
      <Form.Group className="mb-3" controlId="taskStatus">
        <Form.Label>Status</Form.Label>
        {loadingStatuses ? (
          // Show spinner while loading statuses
          <Spinner animation="border" size="sm" />
        ) : (
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {/* Map statuses to dropdown options */}
            {statuses.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.status.charAt(0).toUpperCase() + opt.status.slice(1)}
              </option>
            ))}
          </Form.Select>
        )}
      </Form.Group>

      {/* Submit button - disabled while loading or no statuses available */}
      <Button 
        variant="primary" 
        type="submit" 
        disabled={loadingStatuses || !statuses.length}
      >
        Add Task
      </Button>
    </Form>
  );
}

export default TaskForm;
