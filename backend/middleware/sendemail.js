const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const sdmail = async (email) => {
  const userEmail = email;

  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  // Combine sendMail into sdmail
  const sendMail = async () => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "np621522@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      let otp = Math.floor(100000 + Math.random() * 900000).toString();
      const mailOptions = {
        from: "EXITMATE <np621522@gmail.com>",
        to: userEmail,
        subject: "Verification Code",
        text: "Your 6 Digit Code for verification is " + otp,

      };

      const result = await transport.sendMail(mailOptions);
      return { success: true, otp }; // return success and otp
    } catch (error) {
      console.error("Error sending email:", error.message); // log the error
      return { success: false }; // return failure
    }
  };

  // Call sendMail and return its result
  return sendMail();
};

module.exports = sdmail;