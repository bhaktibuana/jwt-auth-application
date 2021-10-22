const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendConfirmationEmail = async (object) => {
  try {
    const token = await jwt.sign({ 
      users_name: object.usersName,
      users_email: object.usersEmail,
      users_role: object.usersRole,
      users_status: object.usersStatus
    }, process.env.JWT_SECRET_KEY);

    const url = `http://localhost:3001/verify/${token}`;

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'bhaktibuana19@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: 'BSA 📧 <no-reply@bsa.com>',
      to: `${object.usersEmail}`,
      subject: '[BSA] Please verify your account',
      text: '',
      html: `<h3>Hey ${object.usersName}</h3></br><p>Please click link bellow to verify your account.</p></br><a href=${url}>${url}</a></br><p>*The verification link automatically expired or inactive for use when have used once.</p>`
    };

    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (error) {
    return error;
  }
};

exports.sendConfirmationEmail = sendConfirmationEmail;