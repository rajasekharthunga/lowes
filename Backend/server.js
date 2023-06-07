const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3003; // Change the port as per your preference

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://rajasekhar:mern@goals.zlebne5.mongodb.net/Todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongodB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a Todo schema and model
const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { collection: "Todo_collection" }
);

const Todo = mongoose.model("Todo_collection", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    console.log("todos", todos);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: "Error creating todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    console.log("id", req.params.id, req.body);
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting todo" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
