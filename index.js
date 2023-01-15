const express = require("express");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/user.routes");
var cors = require("cors");
const { todoRouter } = require("./Routes/todo.routes");
const { authMiddleware } = require("./Middlewares/authentication.middleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use(authMiddleware);
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected to the db");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running at http://localhost:8080");
});
