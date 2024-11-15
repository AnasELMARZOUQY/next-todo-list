// File: __tests__/TodoList.test.tsx

import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import TodoList from "../app/page"

describe("TodoList Component", () => {
  test("renders the todo list component", () => {
    render(<TodoList />)
    expect(screen.getByText("Todo List")).toBeInTheDocument()
  })

  test("adds a new todo", () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText("User"), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByPlaceholderText("Country"), { target: { value: "USA" } })
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Buy groceries" } })
    fireEvent.click(screen.getByText("Add Todo"))
    expect(screen.getByText("Buy groceries")).toBeInTheDocument()
  })

  test("prevents adding an empty todo", () => {
    render(<TodoList />)
    fireEvent.click(screen.getByText("Add Todo"))
    expect(screen.getByText("Please fill in all fields before adding a todo.")).toBeInTheDocument()
  })

  test("marks a todo as completed", () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText("User"), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByPlaceholderText("Country"), { target: { value: "USA" } })
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Buy groceries" } })
    fireEvent.click(screen.getByText("Add Todo"))
    fireEvent.click(screen.getByLabelText("Mark as completed"))
    expect(screen.getByText("Buy groceries")).toHaveClass("completed")
  })

  test("filters todos based on completion status", () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText("User"), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByPlaceholderText("Country"), { target: { value: "USA" } })
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Buy groceries" } })
    fireEvent.click(screen.getByText("Add Todo"))
    fireEvent.click(screen.getByLabelText("Mark as completed"))
    fireEvent.click(screen.getByText("Show Completed"))
    expect(screen.getByText("Buy groceries")).toBeInTheDocument()
    fireEvent.click(screen.getByText("Show Active"))
    expect(screen.queryByText("Buy groceries")).not.toBeInTheDocument()
  })
})
