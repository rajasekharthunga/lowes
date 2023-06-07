import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import ActionContainers from "./Components/ActionContainers";
import CreateTodo from "./Components/CreateTodo";
import ViewTodos from "./Components/ViewTodos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoData, setTodoData] = useState({});
  const [createTodoModelOpen, setCreateTodoModelOpen] = useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const closeCreateTodoModel = () => {
    setCreateTodoModelOpen(false);
    setEdit(false);
  };
  const openCreateTodoModel = () => {
    setCreateTodoModelOpen(true);
  };
  const createTodo = (edit, todoData, title) => {
    if (edit) {
      const updatedTodo = {
        title: title,
        completed: todoData.completed,
      };
      axios
        .put(`http://localhost:3003/todos/${editIndex}`, updatedTodo)
        .then(() => getTodos())
        .catch((err) => console.log(err));
      setEdit(false);
    } else {
      axios
        .post(`http://localhost:3003/todos`, {
          title: title,
          completed: false,
        })
        .then(() => getTodos())
        .catch((err) => console.log(err));
    }
  };
  const editTodo = (index) => {
    setEdit(true);
    const todo = todos.filter((todo) => todo._id === index)[0];
    setTodoData(todo);
    setCreateTodoModelOpen(true);
    setEditIndex(index);
  };

  const getTodos = () => {
    axios
      .get("http://localhost:3003/todos")
      .then((response) => {
        const todos = response.data;
        setTodos(todos);
      })
      .catch((err) => console.log(err));
  };

  const markAsDone = (index) => {
    const todo = todos.filter((todo) => todo._id === index)[0];
    axios
      .put(`http://localhost:3003/todos/${index}`, {
        title: todo.title,
        completed: !todo.completed,
      })
      .then(() => getTodos())
      .catch((err) => console.log(err));
  };
  const deleteTodo = (index) => {
    axios
      .delete(`http://localhost:3003/todos/${index}`)
      .then(() => getTodos())
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <ActionContainers
        openCreateTodoModel={openCreateTodoModel}
      ></ActionContainers>
      <CreateTodo
        createTodoModelOpen={createTodoModelOpen}
        closeCreateTodoModel={closeCreateTodoModel}
        createTodo={createTodo}
        todoData={todoData}
        edit={edit}
      ></CreateTodo>
      <ViewTodos
        todos={todos}
        editTodo={editTodo}
        markAsDone={markAsDone}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
