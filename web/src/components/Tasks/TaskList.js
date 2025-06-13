/**
 * TaskList Component
 * Displays a table of tasks with their titles and statuses
 * 
 * @param {Object} props
 * @param {Array} props.tasks - List of tasks to display
 * @param {Array} props.statuses - List of available statuses
 * @param {boolean} props.loadingTasks - Loading state for tasks
 */
import React from 'react';
import { Table, Spinner } from 'react-bootstrap';
import TaskItem from './TaskItem';

function TaskList({ tasks, statuses, loadingTasks }) {
  // Show loading spinner while tasks are being fetched
  return loadingTasks ? (
    <Spinner animation="border" />
  ) : (
    // Task table
    <Table striped bordered hover>
      {/* Table header */}
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      {/* Table body with task items */}
      <tbody>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id || task._id} 
            task={task} 
            statuses={statuses} 
          />
        ))}
      </tbody>
    </Table>
  );
}

export default TaskList;
