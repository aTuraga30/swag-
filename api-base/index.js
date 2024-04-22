// Imports the express module, which is a web development framework within nodejs
const express = require("express");

// Configures express to use JSON, which we will need for the API
const app = express();
app.use(express.json());

// Defines a port variable, in this case it is 3000
const port = 3000;
const usersRouter = require("./routes/users");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
