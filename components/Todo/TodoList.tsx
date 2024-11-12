import { Key } from "react"

const TodoList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(
        (
          task: {
            user:
              | string
              | number
              | null
              | undefined
            country:
              | string
              | number
              | null
              | undefined
            description:
              | string
              | number
              | null
              | undefined
          },
          index: Key | null | undefined
        ) => (
          <li key={index} className="mb-2 rounded-md border p-2">
            <p>
              <strong>User:</strong> {task.user}
            </p>
            <p>
              <strong>Country:</strong> {task.country}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
          </li>
        )
      )}
    </ul>
  )
}

export default TodoList
