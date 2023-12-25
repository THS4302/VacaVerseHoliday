const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.WEBSITE_EMAIL, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail email password or an application-specific password
  },
});

module.exports = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  port: process.env.DB_PORT,
  secretKey: process.env.SECRET_KEY_API,
  email: process.env.WEBSITE_EMAIL,
  emailPwd: process.env.EMAIL_PASSWORD,
  transporter,
};
