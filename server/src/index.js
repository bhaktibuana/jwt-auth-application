const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./model/dbConnection');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendConfirmationEmail } = require('./services/emailServices');
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
  sendConfirmationEmail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
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
  const usersPassword = crypto.createHash('sha256').update(req.body.usersPassword).digest('hex');
  const usersRole = 'user';
  const usersStatus = 'unverified';

  const sqlQuery = "INSERT INTO users (users_name, users_email, users_password, users_role, users_status) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlQuery, [usersName, usersEmail, usersPassword, usersRole, usersStatus], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// test jwt
app.post('/api/test_jwt', (req, res) => {
  const usersEmail = req.body.usersEmail;

  const sqlQuery = "SELECT * FROM users WHERE users_email = ?";
  db.query(sqlQuery, usersEmail, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      const usersId = result[0].users_id;
      const usersName = result[0].users_name;
      const usersEmail = result[0].users_email;
      const usersRole = result[0].users_role;
      const token = jwt.sign({ 
        users_id: usersId, 
        users_name: usersName,
        users_email: usersEmail,
        users_role: usersRole
      }, process.env.JWT_SECRET_KEY);

      res.json({ auth: true, token: token, result: result });
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("No token received.");
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate." });
      } else {
        req.userId = decoded.id;
        res.send(decoded);
        next();
      }
    });
  }
};

app.get('/api/user_auth', verifyJWT, (req, res) => {
  res.send("You are authenticate!");
});

app.listen(3001, () => {
  console.log('listening on port 3001!');
});