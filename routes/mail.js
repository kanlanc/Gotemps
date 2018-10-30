const express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
var User = require("../models/users");
var passport = require("passport");
var middleware = require("../middleware/index.js");

router.get("/", (req, res) => {
  res.render("templates/mail");
});

router.post("/", middleware.isLoggedIn ,(req, res) => {
  // var smtpTransport = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: "gotempsc@gmail.com",
  //     pass: "123@abcd"
  //   }
  // });

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "wuvsnizuknvzl2uo@ethereal.email", // generated ethereal user
        pass: "Ha9Fps66kxVARNYrsJ" // generated ethereal password
    }
});


  var mailOptions = {
    to: "saivicky2015@gmail.com",
    subject: req.body.subject,
    text: req.body.content
  };
  console.log(mailOptions);
  // smtpTransport.sendMail(mailOptions, function(error, response) {
    transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.redirect("/templates");
    }
  });
});

module.exports = router;
