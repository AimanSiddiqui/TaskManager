import React from 'react';

function TaskItem({ task, statuses }) {
  const status = statuses.find((s) => s._id === task.status_id)?.status || 'Unknown';

  return (
    <tr>
      <td>{task.title}</td>
      <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
    </tr>
  );
}

export default TaskItem;
