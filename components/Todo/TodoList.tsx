import { Key } from "react"
import { Task } from "types"

const TodoList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task: Task, index: Key | null | undefined) => (
        <li key={index} className="mb-2 rounded-md border p-2">
          <p>
            <strong>Name:</strong> {task.name}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default TodoList
