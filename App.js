import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task.trim(), done: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.done ? "done" : ""}>
            <span>{t.text}</span>
            <div className="btn-group">
              <button onClick={() => toggleDone(index)}>
                {t.done ? "Undo" : "Finish"}
              </button>
              <button onClick={() => deleteTask(index)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
