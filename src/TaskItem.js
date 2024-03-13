
import React, { useState } from 'react';
import './TaskItem.css'; 

function TaskItem({ task, removeTask, updateTask }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const toggleEditMode = () => {
    if (!editMode) {
      setEditedText(task.text);
    }
    setEditMode(!editMode);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const toggleCompleted = () => {
    updateTask(task.id, task.text, !task.completed);
  };

  const saveEdit = () => {
    if (editedText.trim() !== '') {
      updateTask(task.id, editedText, task.completed);
      toggleEditMode();
    } else {
      alert("You can't enter a blank task");
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {!editMode ? (
        <>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleCompleted}
              className="CheckBox_Section"
            />
            <span className="checkmark"></span>
          </label>
          <span>{task.text}</span>
          <div className="task-buttons">
            <button onClick={toggleEditMode} className="EditBtn">Edit</button>
            
            <button onClick={() => removeTask(task.id)} className="DeleteBtn">
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            className="SideInput"
          />
          <div className="task-buttons">
            <button onClick={saveEdit} className="SaveBtn">
              Save
            </button>
            <button onClick={toggleEditMode} className="CancelBtn">Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;