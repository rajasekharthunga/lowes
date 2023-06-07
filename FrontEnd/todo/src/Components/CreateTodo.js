import React from "react";
import { Modal } from "antd";

function CreateTodo({
  createTodoModelOpen,
  closeCreateTodoModel,
  createTodo,
  todoData,
  edit,
}) {
  const [title, setTitle] = React.useState("");
  const [warnMessage, setWarnMessage] = React.useState(false);
  React.useEffect(() => {
    if (todoData) {
      setTitle(todoData.title);
    }
  }, [todoData]);
  return (
    <div>
      <Modal
        title="Create Todo"
        centered
        open={createTodoModelOpen}
        onOk={() => {
          if (title !== "") {
            createTodo(edit, todoData, title);
            closeCreateTodoModel();
            setTitle("");
            setWarnMessage(false);
          } else {
            setWarnMessage(true);
          }
        }}
        onCancel={() => {
          setWarnMessage(false);
          closeCreateTodoModel();
        }}
        okText={edit ? "Edit" : "Create"}
      >
        {warnMessage && (
          <span style={{ color: "brown", padding: "20px 0" }}>
            Title is empty !!
          </span>
        )}
        <div>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CreateTodo;
