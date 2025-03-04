import { useState, useEffect } from "react";
import "./App.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];


  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));


  }, [tasks]);

  const addTask = () => {
    if (title.trim() === "" || description.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      date: new Date().toLocaleString(),
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");

    
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>

        <h2 className="task-header">Pending Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <tr key={task.id} className="task-item pending">
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.date}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h2 className="task-header">Completed Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <tr key={task.id} className="task-item completed">
                  <td className="completed-text">{task.title}</td>
                  <td className="completed-text">{task.description}</td>
                  <td className="completed-text">{task.date}</td>
                  <td>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}