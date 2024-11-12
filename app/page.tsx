"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ModeToggle } from "components/Tooltip/dark-mode"


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newTodo, setNewTodo] = useState({ user: '', country: '', description: '' });

  useEffect(() => {
    // Fetch countries
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data.map(country => country.name.common)))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.description.length > 120) {
      alert('Description must be 120 characters or less');
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo({ user: '', country: '', description: '' });
    alert('Todo added successfully');
  };

  return (
    <>
      <div className="p-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User"
            value={newTodo.user}
            onChange={(e) => setNewTodo({ ...newTodo, user: e.target.value })}
            className="border p-2 mr-2"
          />
          <select
            value={newTodo.country}
            onChange={(e) => setNewTodo({ ...newTodo, country: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white p-2">Add Todo</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>User:</strong> {todo.user} <br />
              <strong>Country:</strong> {todo.country} <br />
              <strong>Description:</strong> {todo.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;