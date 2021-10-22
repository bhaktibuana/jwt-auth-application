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
app.get('/api/get_available_users/:users_email', (req, res) => {
  const usersEmail = req.params.users_email;

  const sqlQuery = "SELECT users_email FROM users WHERE users_email = ?";
  db.query(sqlQuery, usersEmail, (err, result) => {
    res.send(result);
  });
});

// signup
app.post('/api/signup', (req, res) => {
  const usersObject = {
    usersName: req.body.usersName,
    usersEmail: req.body.usersEmail,
    usersPassword: crypto.createHash('sha256').update(req.body.usersPassword).digest('hex'),
    usersRole: 'user',
    usersStatus: 'unverified'
  };

  const sqlQuery = "INSERT INTO users (users_name, users_email, users_password, users_role, users_status) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlQuery, [
    usersObject.usersName,
    usersObject.usersEmail,
    usersObject.usersPassword,
    usersObject.usersRole,
    usersObject.usersStatus
  ], (err, result) => {
    console.log(result);
    res.send(result);

    sendConfirmationEmail(usersObject)
      .then((result) => console.log('Email sent...', result))
      .catch((error) => console.log(error.message));
  });
});

// verify account
app.get('/verify/:token', (req, res) => {
  const token = req.params.token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({ auth: false, message: "Failed to verify." });
    } else {
      const sqlQueryCheck = "SELECT users_status FROM users WHERE users_email = ?";
      db.query(sqlQueryCheck, decoded.users_email, (err, result) => {
        if (result[0].users_status == "verified") {
          res.send("The verification link has expired!");
        } else {
          const sqlQuery = "UPDATE users SET users_status = 'verified' WHERE users_email = ?";
          db.query(sqlQuery, decoded.users_email, (err, result) => {
            res.send("Your account has been successfully verified!");
            console.log(result);
          });
        }
      });
    }
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