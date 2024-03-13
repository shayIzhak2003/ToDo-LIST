import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchTasksWithDelay = () => {
      fetch('/tasks.json') 
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
          calculateTotalCompleted(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading tasks:', error);
          setLoading(false);
        });
    };

    const delayTimeout = setTimeout(fetchTasksWithDelay, 5000); 

    return () => clearTimeout(delayTimeout); 

  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    calculateTotalCompleted(tasks);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      if (tasks.some(task => task.text === newTask)) {
        alert("You can't enter the same mission again!");
      } else {
        setTasks([...tasks, { text: newTask, id: Date.now(), completed: false }]);
        setNewTask('');
      }
    } else {
      alert("You can't enter a blank task");
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    calculateTotalCompleted(updatedTasks);
  };

  const updateTask = (taskId, newText, newCompleted) => {
    
    const isDuplicate = tasks.some(task => task.text === newText && task.id !== taskId);
  
    if (isDuplicate) {
      alert("You can't update an available mission! ");
    } else {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, text: newText, completed: newCompleted } : task
      );
      setTasks(updatedTasks);
      calculateTotalCompleted(updatedTasks);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalCompleted = (updatedTasks) => {
    const completedTasks = updatedTasks.filter(task => task.completed);
    setTotalCompleted(completedTasks.length);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="app-container">
        <h1>{tasks.length === 0 ? "No Tasks" : `Total Tasks: ${tasks.length}`}</h1>
        <h2>{totalCompleted === tasks.length ? "All tasks completed / No Tasks" : `Total Completed Tasks: ${totalCompleted}`}</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="MainInput"
        />
        <button onClick={addTask} className="AddBtn">Add Task</button>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks"
          className="MainInput"
        />
        <div className="task-list-container">
          <TaskList
            tasks={filteredTasks}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        </div>
        
        <>
        <h4>App Guidence</h4>
        </>
        <div class="accordion accordion-flush" id="accordionFlushExample">
   <div class="accordion-item">
     <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        How to Use This Task Management App
      </button>
     </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <h3>Welcome to the Task Management App!</h3>
        <p>This app allows you to manage your tasks efficiently. Here's a step-by-step guide on how to use it:</p>

        <h4>1. Adding a New Task</h4>
        <p>To add a new task:</p>
        <ul>
          <li>Click on the input field labeled "Enter new task."</li>
          <li>Type the description of your new task.</li>
          <li>Click the "Add Task" button to add it to your task list.</li>
        </ul>

        <h4>2. Searching for Tasks</h4>
        <p>You can search for tasks by typing keywords in the "Search tasks" input field. The app will filter and display tasks that match your search terms in real-time.</p>

        <h4>3. Marking a Task as Completed</h4>
        <p>To mark a task as completed:</p>
        <ul>
          <li>Click the checkbox next to the task you want to mark as completed.</li>
        </ul>

        <h4>4. Updating a Task</h4>
        <p>If you need to update a task:</p>
        <ul>
          <li>Click the "Edit" button next to the task you want to update.</li>
          <li>Edit the task description or mark it as completed/uncompleted.</li>
          <li>Click the "Save" button to save your changes.</li>
        </ul>

        <h4>5. Removing a Task</h4>
        <p>To remove a task:</p>
        <ul>
          <li>Click the "Delete" button next to the task you want to remove.</li>
        </ul>

        <h4>6. Total Tasks and Completed Tasks</h4>
        <p>You can see the total number of tasks and the total number of completed tasks at the top of the page.</p>

        <p>That's it! You're now ready to efficiently manage your tasks with this app.</p>
      </div>
    </div>
  </div>
</div>

      </div>
      
      {/* Flying squares */}
      <div className="square square1"></div>
      <div className="square square2"></div>
      <div className="square square3"></div>
      <div className="square square4"></div>
      <div className="square square5"></div>

     
    </div>
  );
}

export default App;
