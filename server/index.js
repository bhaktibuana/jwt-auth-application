const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jwt_auth_db'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
});

// get data from "users"
app.get('/api/get_users', (req, res) => {
  const sqlQuery = "SELECT * FROM users";

  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

// get available email from "users"
app.get('/api/get/available_users/:users_email', (req, res) => {
  const usersEmail = req.params.users_email;

  const sqlQuery = "SELECT users_email FROM users WHERE users_email = ?";
  db.query(sqlQuery, usersEmail, (err, result) => {
    res.send(result);
  });
});

// insert data to "users"
app.post('/api/insert_users', (req, res) => {
  const usersName = req.body.usersName;
  const usersEmail = req.body.usersEmail;
  const usersPassword = req.body.usersPassword;
  const usersRole = "user";

  const sqlQuery = "INSERT INTO users (users_name, users_email, users_password, users_role) VALUES (?, ?, ?, ?)";
  db.query(sqlQuery, [usersName, usersEmail, usersPassword, usersRole], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log('listening on port 3001!');
});