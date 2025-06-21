const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtFunctions = require("../utils/jwt");
require("dotenv").config();
const jwt_key = process.env.JWT_KEY;
async function createUser(req, res) {
  const { user_name, first_name, last_name, email, password } = req.body;
  const client = await pool.connect();
  const salt = 10;
  try {
    const hash = await bcrypt.hash(password, salt);
    const query =
      "insert into users(user_name,first_name,last_name,email,password_hash) values($1,$2,$3,$4,$5) returning(user_id,user_name,first_name,last_name,email);";
    const values = [user_name, first_name, last_name, email, hash];
    const result = await client.query(query, values);

    const token = jwtFunctions.genToken(result.rows[0], jwt_key);
    res.status(201).json({
      message: "user created succesfuly",
      newuser: result.rows[0],
      token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "user creatiopn failed", error: err.message });
  } finally {
    client.release();
  }
}

async function loginUser(req, res) {
  const { user_name, email, password } = req.body;
  const client = await pool.connect();
  try {
    const user = await findUserExists(email);
    if (user === undefined) {
      return res
        .status(404)
        .json({ message: "emailid not found please create a account" });
    }
    const result = await bcrypt.compare(password, user.password_hash);
    if (!result) {
      return res.status(401).json({ message: "wrong password" });
    }
    const token = jwtFunctions.genToken(result.rows[0], jwt_key);

    res.status(200).json({
      message: "login succesful",

      user: {
        user_id: user.user_id,
        email: user.email,
        user_name: user.user_name,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "login unsuccesfull", err: err.message });
  } finally {
    client.release();
  }
}

async function findUserExists(email) {
  const client = await pool.connect();
  try {
    const result = await client.query("select *from users where email=$1;", [
      email,
    ]);
    return result.rows[0] || undefined;
  } finally {
    client.release();
  }
}
module.exports = {
  createUser,
  loginUser,
};
