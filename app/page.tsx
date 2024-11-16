"use client"

import React, { useEffect, useState } from "react"
import { ModeToggle } from "components/Tooltip/dark-mode"
import { Country, Todo } from "../types"
import TodoForm from "../components/Todo/TodoForm"
import TodoList from "../components/Todo/TodoList"

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [filter, setFilter] = useState<string>("all")

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

  const addTodo = (todo: Todo) => {
    const updatedTodos = [...todos, todo]
    console.log("Updated todos:", updatedTodos)
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      return updatedTodos
    })
  }

  return (
    <>
      <div className="p-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <TodoForm addTodo={addTodo} countries={countries} filter={filter} setFilter={setFilter} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}

export default TodoApp
