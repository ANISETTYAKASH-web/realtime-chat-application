const express = require("express");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 5000;
app.get("/", (req, res) => {
  res.send("hello there");
});
app.get("/db-test", async (req, res) => {
  const client = await pool.connect();
  const result = await client.query("SELECT NOW();");
  res.send(result.rows);
  client.release();
});
app.use("/users", userRoutes);
app.listen(port, () => {
  // res.status(200).json({ message: testing });
  console.log("hello world");
});
