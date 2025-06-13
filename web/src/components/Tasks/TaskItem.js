/**
 * TaskItem Component
 * Renders a single task row in the task list table
 * 
 * @param {Object} props
 * @param {Object} props.task - Task data object
 * @param {Array} props.statuses - List of available statuses
 */
import React from 'react';

function TaskItem({ task, statuses }) {
  // Find the status name for the task's status_id
  // Default to 'Unknown' if status not found
  const status = statuses.find((s) => s._id === task.status_id)?.status || 'Unknown';

  return (
    <tr>
      {/* Task title cell */}
      <td>{task.title}</td>
      {/* Status cell - capitalize first letter */}
      <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
    </tr>
  );
}

export default TaskItem;
