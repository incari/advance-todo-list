import { useState, useMemo } from "react";
import { TodoItem } from "../App";

export type Filter = "all" | "completed" | "pending";
export type Sort = "name" | "date" | "status";

const useFilteredAndSortedTodos = (todos: TodoItem[]) => {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("date");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });
  }, [todos, filter]);

  const sortedTodos = useMemo(() => {
    return filteredTodos.sort((a, b) => {
      if (sort === "name") return a.label.localeCompare(b.label);
      if (sort === "date") return a.createdAt.getTime() - b.createdAt.getTime();
      if (sort === "status") return Number(a.completed) - Number(b.completed);
      return 0;
    });
  }, [filteredTodos, sort]);

  return {
    filter,
    setFilter,
    sort,
    setSort,
    sortedTodos,
  };
};

export { useFilteredAndSortedTodos as useFilter };
