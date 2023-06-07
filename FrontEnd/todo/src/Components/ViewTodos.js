import React from "react";
import { Button, Checkbox } from "antd";

function ViewTodos({ todos, editTodo, markAsDone, deleteTodo }) {
  return (
    <div
      style={{
        padding: "40px 20px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {todos.map((todo, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexDirection: "row",
          }}
        >
          <Checkbox
            onChange={() => {
              markAsDone(todo._id);
            }}
            checked={todo.completed}
          />
          <div
            style={{
              textDecoration: todo.completed ? "line-through" : undefined,
            }}
          >
            {todo.title}
          </div>

          <Button onClick={() => editTodo(todo._id)}>Edit</Button>
          <Button
            type="primary"
            onClick={() => {
              deleteTodo(todo._id);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ViewTodos;
