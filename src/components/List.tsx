import { Button, Checkbox, Input } from "keep-react";
import { TodoItem } from "../App";
import { useState } from "react";

type Props = {
  todos: Array<TodoItem>;
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
              className={`flex-1 ${todo.completed ? "line-through" : ""}`}
              onDoubleClick={() => startEditing(todo.id, todo.label)}
            >
              {todo.label}
            </span>
          )}
          <Button
            onClick={() => startEditing(todo.id, todo.label)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
};
