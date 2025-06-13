/**
 * TaskManager Component
 * Main component for managing tasks, including task creation and listing
 */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TaskForm from './../components/Tasks/TaskForm';
import TaskList from './../components/Tasks/TaskList';
import { fetchTasks } from './../services/taskService';
import { fetchStatuses } from './../services/statusService';

function TaskManager() {
  // State management
  const [tasks, setTasks] = useState([]);          // List of tasks
  const [statuses, setStatuses] = useState([]);    // List of available statuses
  const [message, setMessage] = useState(null);    // Alert message state
  const [loadingTasks, setLoadingTasks] = useState(false);     // Tasks loading state
  const [loadingStatuses, setLoadingStatuses] = useState(false); // Statuses loading state
  const navigate = useNavigate();

  // Load tasks and statuses on component mount
  useEffect(() => {
    fetchAllTasks();
    fetchAllStatuses();
  }, []);

  /**
   * Fetch all tasks from the API
   * Updates tasks state and handles errors
   */
  const fetchAllTasks = async () => {
    setLoadingTasks(true);
    try {
      const token = localStorage.getItem('token');
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoadingTasks(false);
    }
  };

  /**
   * Fetch all statuses from the API
   * Updates statuses state and handles errors
   */
  const fetchAllStatuses = async () => {
    setLoadingStatuses(true);
    try {
      const data = await fetchStatuses();
      setStatuses(data);
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoadingStatuses(false);
    }
  };

  return (
    <Container className="mt-4">
      {/* Header with logout button */}
      <Row>
        <Col>
          <h1>Task Manager</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>

      {/* Alert message display */}
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      {/* Main content area */}
      <Row>
        {/* Task creation form */}
        <Col md={6}>
          <TaskForm
            statuses={statuses}
            loadingStatuses={loadingStatuses}
            fetchTasks={fetchAllTasks}
            setMessage={setMessage}
          />
        </Col>
        {/* Task list display */}
        <Col md={6}>
          <TaskList
            tasks={tasks}
            statuses={statuses}
            loadingTasks={loadingTasks}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default TaskManager;
