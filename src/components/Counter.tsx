import { TodoItem } from "../App";

export const Counter = ({ todos }: { todos: TodoItem[] }) => {
  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="mb-4">
      <span>Pending: {pendingCount}</span> |{" "}
      <span>Completed: {completedCount}</span>
    </div>
  );
};
