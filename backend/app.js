const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection.js");
const cors = require("cors");
const UserAPI = require("./routes/user-route.js");
const TaskAPI = require("./routes/task-route.js");
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

// localhost:3300/api/v1/sign-in

app.get("/", (req, res) => {
    res.send("Hello from backend side");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${PORT}`);
});