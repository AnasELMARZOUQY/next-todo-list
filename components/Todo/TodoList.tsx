import React from "react";
import { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, filter, setFilter }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`mb-2 border p-2 ${todo.completed ? "bg-gray-300" : ""}`}>
            <strong>User:</strong> {todo.user} <br />
            <strong>Country:</strong> {todo.country} <br />
            <strong>Description:</strong> {todo.description} <br />
            <button onClick={() => toggleTodo(todo.id)} className="mr-2 bg-green-500 p-2 text-white">
              {todo.completed ? "Uncheck" : "Check"}
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 p-2 text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;