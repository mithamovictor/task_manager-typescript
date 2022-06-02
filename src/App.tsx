import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

interface MetaData {
  title: string,
  description: string
}

const App: React.FC = () => {
  const metaData: MetaData = {
    title: "Task Manager in React-TypeScript",
    description: "A simple task manager that has been built with react and typescript."
  }
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false
        }
      ]);
      setTodo("");
    }
  };

  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute("content", metaData.description);
    document.title = metaData.title;
  }, [metaData.description, metaData.title])
  

  return (
    <div className="App">
      <h1>{metaData.title}</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
};

export default App;
