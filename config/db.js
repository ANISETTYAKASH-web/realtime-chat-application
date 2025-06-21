const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 3000,
});

pool.on("connect", () => {
  console.log("database connected succesfully");
});
pool.on("release", () => {
  console.log("database disconnected succesfully");
});
module.exports = pool;
