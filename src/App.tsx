import { useState } from "react";
import "./App.css";
import { List } from "./components/List";
import { Button, Input } from "keep-react";
import { Counter } from "./components/Counter";
import { FilterAndSort } from "./components/FilterAndSort";
import { useFilter } from "./hooks/useFilter";

export type TodoItem = {
  id: number;
  label: string;
  completed: boolean;
  createdAt: Date;
};

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const { filter, setFilter, sort, setSort, sortedTodos } = useFilter(todos);

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

  return (
    <div className="min-h-screen flex justify-center p-8">
      <div className="max-w-lg w-full mt-10">
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
            className="py-2 px-4 rounded bg-orange-500 hover:bg-orange-700"
          >
            Add
          </Button>
        </form>

        <Counter todos={todos} />
        {/* Filter and order  */}
        <FilterAndSort
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
        />

        <List
          todos={sortedTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
