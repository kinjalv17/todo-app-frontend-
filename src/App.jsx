import { useState, useEffect } from "react";
import "./App.css";

import First from "./components/First";
import Second from "./components/Second";
import Disp from "./components/Disp";

function App() {
  // ======================
  // STATE
  // ======================
  
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const API_URL = "http://localhost:5000/api/todos";

  // productivity logic
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const productivity = total === 0 ? 0 : Math.round((completed / total) * 100);

  // ======================
  // LOAD FROM MYSQL DATABASE
  // ======================
 
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error loading tasks from database:", err));
  };

  // ======================
  // ADD TODO
  // ======================
  
  const addTodo = (text) => {
    if (!text.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }), // Backend expects 'title'
    })
      .then((res) => res.json())
      .then(() => {
        fetchTodos(); // Instantly refresh the screen list with updated database rows
      })
      .catch((err) => console.error("Error saving task:", err));
  };

  // ======================
  // DELETE TODO
  // ======================
  
  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTodos(); // Refresh screen
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // ======================
  // TOGGLE COMPLETE
  // ======================
  
  const toggleTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
    })
      .then(() => {
        fetchTodos(); // Refresh screen
      })
      .catch((err) => console.error("Error updating completion status:", err));
  };

  // ======================
  // GET TASKS BY DATE
  // ======================
  const getTasksByDate = (date) => {
    return todos.filter((t) => {
      if (!t.completedAt) return false;

      return (
        new Date(t.completedAt).toDateString() ===
        new Date(date).toDateString()
      );
    });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1>📝 todoapp</h1>

        <div className="navbar-stats">
          <div className="stat">⚡{productivity}% Done</div>
          <div className="stat"> {completed}/{total}</div>
          <div className="stat">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </nav>

      <div className="container">
        {/* ADD TODO */}
        <First addTodo={addTodo} />

        {/* STATS */}
        <Second
          total={todos.length}
          completed={todos.filter((t) => t.completed).length}
        />

        {/* TODO LIST */}
        <Disp
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      </div>
    </>
  );
}

export default App;
