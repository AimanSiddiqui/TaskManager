import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TaskForm from './../components/Tasks/TaskForm';
import TaskList from './../components/Tasks/TaskList';
import { fetchTasks } from './../services/taskService';
import { fetchStatuses } from './../services/statusService';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTasks();
    fetchAllStatuses();
  }, []);

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

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Row>
        <Col md={6}>
          <TaskForm
            statuses={statuses}
            loadingStatuses={loadingStatuses}
            fetchTasks={fetchAllTasks}
            setMessage={setMessage}
          />
        </Col>
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
