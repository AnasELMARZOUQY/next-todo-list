export interface Country {
  name: {
    common: string;
  };
}

export interface User {
  name: string
  country: string
  description: string
}

export interface Todo {
  id: string
  user: string
  country: string
  description: string
  completed: boolean;
}

export interface Task {
  name: string
  description: string;
  user: string;
  country: string;
}

export interface TodoFormProps {
  addTask: (task: Task) => void;
}