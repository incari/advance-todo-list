import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

import { render, fireEvent } from "@testing-library/react";
import { List } from "../List"; // Adjust the import path if necessary
import { TodoItem } from "../../App";

// Mock data
const todos: TodoItem[] = [
  { id: 1, label: "Test Todo 1", completed: false, createdAt: new Date() },
  { id: 2, label: "Test Todo 2", completed: true, createdAt: new Date() },
];

const toggleTodo = jest.fn();
const deleteTodo = jest.fn();
const editTodo = jest.fn();

describe("List Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the list of todos", () => {
    const { getByText, getAllByRole, getAllByText } = render(
      <List
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    );

    expect(getByText("Test Todo 1")).toBeInTheDocument();
    expect(getByText("Test Todo 2")).toBeInTheDocument();
    expect(getByText("Test Todo 3")).toBeInTheDocument();

    // Toggle checkbox
    fireEvent.click(getAllByRole("checkbox")[0]);
    expect(toggleTodo).toHaveBeenCalledWith(1);

    // Delete row
    fireEvent.click(getAllByText("Delete")[0]);
    expect(deleteTodo).toHaveBeenCalledWith(1);

    // Edit row
    // Click button
    fireEvent.click(getAllByText("Edit")[0]);
    expect(deleteTodo).toHaveBeenCalledWith(1);

    // Edit input
    const input = getByText("Test Todo 1");
    fireEvent.change(input, { target: { value: "Updated Todo 1" } });
    fireEvent.blur(input);
    expect(editTodo).toHaveBeenCalledWith(1, "Updated Todo 1");
  });
});
