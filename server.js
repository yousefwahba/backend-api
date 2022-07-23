const express = require("express");
const env = require("dotenv").config();
const errorHandler = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("first get requiset");
});
app.use("/api/users", require("./routes/userRouters"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
