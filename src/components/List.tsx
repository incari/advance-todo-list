import { Button, Checkbox, Input } from "keep-react";
import { TodoItem } from "../App";
import { useState } from "react";

type Props = {
  todos: TodoItem[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newLabel: string) => void;
};

export const List = ({ todos, toggleTodo, deleteTodo, editTodo }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const startEditing = (id: number, label: string) => {
    setEditingId(id);
    setEditingValue(label);
  };

  const commitEdit = (id: number) => {
    // Prevent to add empty value
    if (!editingValue.trim()) {
      setEditingId(null);
      return;
    }
    editTodo(id, editingValue);
    setEditingId(null);
    setEditingValue("");
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center space-x-4"
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />

          {editingId === todo.id ? (
            <Input
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              //Autofocus onMount
              autoFocus
              // Save on blur
              onBlur={() => commitEdit(todo.id)}
              // Save on enter
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitEdit(todo.id);
                }
              }}
              className="flex-grow p-2 border rounded text-white bg-[#61dafbaa]"
            />
          ) : (
            <span
              onDoubleClick={() => startEditing(todo.id, todo.label)}
              className={`flex-1 ${
                todo.completed ? "line-through" : ""
              } text-ellipsis overflow-hidden`}
            >
              {todo.label}
            </span>
          )}
          <Button
            onClick={() => startEditing(todo.id, todo.label)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
};
