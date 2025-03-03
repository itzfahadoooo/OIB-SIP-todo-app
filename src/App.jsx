import { useState } from "react";
import "./App.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      date: new Date().toLocaleString(),
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      <div className="cont1">
        <div className="todo-input">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>

        <h2 className="task-header">Pending Tasks</h2>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <div key={task.id} className="task-item pending">
              <span>
                {task.text} <small>({task.date})</small>
              </span>
              <div>
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="complete-button"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        <h2 className="task-header">Completed Tasks</h2>
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <div key={task.id} className="task-item completed">
              <span className="completed-text">
                {task.text} <small>({task.date})</small>
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
