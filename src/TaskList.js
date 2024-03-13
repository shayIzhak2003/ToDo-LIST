
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, removeTask, updateTask }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}

export default TaskList;