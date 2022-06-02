import { useState, useRef, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone, MdDoneAll } from "react-icons/md";
import { Todo } from "../model";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, todo: editTodo } : todoItem
      )
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todo" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          className="todo__input"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        <div className={`todo__text ${todo.isDone ? "line-through" : ""}`}>
          {todo.todo}
        </div>
      )}
      <div className="todo__icons">
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) setEdit(!edit);
          }}
        >
          <AiFillEdit className="blue-icon" />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete className="red-icon" />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          {todo.isDone ? (
            <MdDoneAll className="green-icon" />
          ) : (
            <MdDone className="green-icon" />
          )}
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
