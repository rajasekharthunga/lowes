import React from "react";

function ActionContainers({ openCreateTodoModel }) {
  return (
    <div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          fontSize: "16px",
          border: "0",
          borderRadius: "5px",
          width: "200px",
        }}
        onClick={openCreateTodoModel}
      >
        Add Todo
      </button>
    </div>
  );
}

export default ActionContainers;
