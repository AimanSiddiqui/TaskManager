import React from 'react';
import { Table, Spinner } from 'react-bootstrap';
import TaskItem from './TaskItem';

function TaskList({ tasks, statuses, loadingTasks }) {
  return loadingTasks ? (
    <Spinner animation="border" />
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskItem key={task.id || task._id} task={task} statuses={statuses} />
        ))}
      </tbody>
    </Table>
  );
}

export default TaskList;
