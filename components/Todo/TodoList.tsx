const TodoList = ({ tasks }) => {
    return (
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="mb-2 p-2 border rounded-md">
            <p><strong>User:</strong> {task.user}</p>
            <p><strong>Country:</strong> {task.country}</p>
            <p><strong>Description:</strong> {task.description}</p>
          </li>
        ))}
      </ul>
    );
  };
  
export default TodoList;