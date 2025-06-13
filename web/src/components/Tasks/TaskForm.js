import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { createTask } from '../../services/taskService';

function TaskForm({ statuses, loadingStatuses, fetchTasks, setMessage }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const payload = { title, status_id: status };

    try {
      const token = localStorage.getItem('token');
      await createTask(payload, token);
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

      <Form.Group className="mb-3" controlId="taskStatus">
        <Form.Label>Status</Form.Label>
        {loadingStatuses ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.status.charAt(0).toUpperCase() + opt.status.slice(1)}
              </option>
            ))}
          </Form.Select>
        )}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loadingStatuses || !statuses.length}>
        Add Task
      </Button>
    </Form>
  );
}

export default TaskForm;
