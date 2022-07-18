const express = require("express");
const env = require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("first get requiset");
});
app.use("/api/users", require("./routes/userRouters"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
