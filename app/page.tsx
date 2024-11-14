"use client"

import { useEffect, useState } from "react"
import { ModeToggle } from "components/Tooltip/dark-mode"
import { Country, Todo } from "../types"

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState<Todo>({ user: "", country: "", description: "", completed: false })
  const [isInitialized, setIsInitialized] = useState(false)

  // Load todos from localStorage once when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Todo[]
    if (Array.isArray(savedTodos)) {
      console.log("Loaded todos from localStorage:", savedTodos)
      setTodos(savedTodos)
    }
    setIsInitialized(true)
  }, [])

  // Fetch countries on initial load
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data as Country[]
        const sortedCountries = countriesData.map((country) => country.name.common).sort()
        setCountries(sortedCountries)
      })
  }, [])

  // Save todos to localStorage only after the initial load
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving todos to localStorage:", todos)
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isInitialized])

  const addTodo = () => {
    if (newTodo.description.length > 120) {
      alert("Description must be 120 characters or less")
      return
    }
    const updatedTodos = [...todos, newTodo]
    console.log("Updated todos:", updatedTodos)
    setTodos(updatedTodos)
    setNewTodo({ user: "", country: "", description: "", completed: false })
    alert("Todo added successfully")
  }

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
  }

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo))
    setTodos(updatedTodos)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <>
      <div className="p-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User"
            value={newTodo.user}
            onChange={(e) => setNewTodo({ ...newTodo, user: e.target.value })}
            onKeyDown={handleKeyDown}
            className="mr-2 border p-2"
          />
          <select
            value={newTodo.country}
            onChange={(e) => setNewTodo({ ...newTodo, country: e.target.value })}
            onKeyDown={handleKeyDown}
            className="mr-2 border p-2"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            onKeyDown={handleKeyDown}
            className="mr-2 border p-2"
          />
          <button onClick={addTodo} className="bg-blue-500 p-2 text-white">
            Add Todo
          </button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={`mb-2 border p-2 ${todo.completed ? "bg-gray-300" : ""}`}>
              <strong>User:</strong> {todo.user} <br />
              <strong>Country:</strong> {todo.country} <br />
              <strong>Description:</strong> {todo.description}
              <br />
              <button onClick={() => toggleTodo(index)} className="mr-2 bg-green-500 p-2 text-white">
                {todo.completed ? "Uncheck" : "Check"}
              </button>
              <button onClick={() => deleteTodo(index)} className="bg-red-500 p-2 text-white">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default TodoList
