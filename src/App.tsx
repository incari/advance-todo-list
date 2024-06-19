import { useState } from "react";
import "./App.css";
import { List } from "./components/List";
import { Button, Input } from "keep-react";

export type TodoItem = {
  id: number;
  label: string;
  completed: boolean;
  createdAt: Date;
};

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sort, setSort] = useState<"name" | "date" | "status">("date");

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, label: newText } : todo
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Allowing using enter to submit
    e.preventDefault();
    // Filter empty string values
    if (newTodo.trim()) {
      const newTask: TodoItem = {
        id: Date.now(),
        label: newTodo,
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prevTodos) => [...prevTodos, newTask]);
      setNewTodo(""); // Clear input field
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === "name") return a.label.localeCompare(b.label);
    if (sort === "date") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sort === "status") return Number(a.completed) - Number(b.completed);
    return 0;
  });

  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="max-w-lg w-full">
      <header className="absolute top-0 left-0 h-16 bg-[#61dafbaa] w-full flex">
        <div className="text-xl font-bold m-auto ml-4 text-white">
          My Todo app
        </div>
      </header>
      <main>
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex items-center space-x-2"
        >
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="flex-grow p-2 border rounded text-white bg-[#61dafbaa]"
          />
          <Button
            type="submit"
            className="py-2 px-4 rounded"
          >
            Add
          </Button>
        </form>

        <div className="mb-4">
          <span>Pending: {pendingCount}</span> |{" "}
          <span>Completed: {completedCount}</span>
        </div>

        {/* Filter and order  */}
        <div className="flex gap-8">
          <div>
            <span className="mr-4">Filter by:</span>
            <select
              value={filter}
              onChange={(e) => {
                console.log(e.target.value);
                setFilter(e.target.value as "all" | "completed" | "pending");
              }}
              className="p-2 mb-10 border rounded bg-[#61dafbaa] text-white font-bold"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <span className="mr-4">Sort by:</span>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "name" | "date" | "status")
              }
              className="p-2 mb-10 border rounded bg-[#61dafbaa] text-white font-bold"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        <List
          todos={sortedTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </main>
    </div>
  );
}

export default App;
