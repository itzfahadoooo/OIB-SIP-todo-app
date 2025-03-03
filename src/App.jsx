import { useState } from "react";

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
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a written task"
          className="border p-2 w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Add Task
        </button>
      </div>

      <h2 className="text-xl font-semibold">Pending Tasks</h2>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <div
            key={task.id}
            className="flex justify-between p-2 bg-gray-100 mt-2"
          >
            <span>
              {task.text} <small>({task.date})</small>
            </span>
            <div>
              <button
                onClick={() => toggleComplete(task.id)}
                className="bg-green-500 text-white px-2 mr-2"
              >
                Complete
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      <h2 className="text-xl font-semibold mt-4">Completed Tasks</h2>
      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <div
            key={task.id}
            className="flex justify-between p-2 bg-gray-200 mt-2"
          >
            <span className="line-through">
              {task.text} <small>({task.date})</small>
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
