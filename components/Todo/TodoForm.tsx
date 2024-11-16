import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../types";

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
  countries: string[];
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, countries, filter, setFilter }) => {
  const [newTodo, setNewTodo] = useState<Todo>({ id: "", user: "", country: "", description: "", completed: false });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (!newTodo.user || !newTodo.country || !newTodo.description) {
      alert("Please fill in all fields before adding a todo.");
      return;
    }
    const todoWithId = { ...newTodo, id: uuidv4() };
    addTodo(todoWithId);
    setNewTodo({ id: "", user: "", country: "", description: "", completed: false });
    alert("Todo added successfully");
  };

  return (
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
        id="country-select"
        name="country"
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
      <button onClick={handleAddTodo} className="bg-blue-500 p-2 text-white mr-2">
        Add Todo
      </button>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-yellow-500 p-2 text-white"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TodoForm;