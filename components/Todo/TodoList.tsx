import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"

const TodoList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(
        (
          task: {
            user:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined
            country:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined
            description:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
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
