// Core Module
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const DB_PATH = "mongodb+srv://root:root@cluster0.i4xyvpa.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";

//Local Module
const todoItemsRouter = require("./routes/todoItemsRouter")
const errorsController = require("./controllers/errors");

const app = express();

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
const PORT= process.env.PORT || 3001;
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: ["https://todo-react-app-phi-neon.vercel.app","http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("Welcome To TODO API");
});

app.use("/api/todo", todoItemsRouter);

// app.use(errorsController.pageNotFound);


mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
