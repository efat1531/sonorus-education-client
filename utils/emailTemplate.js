const moment = require("moment-timezone");

const resetPasswordTemplateHTML = (user, resetURL) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sonorous Education - Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 50px auto;
              padding: 30px;
              background-color: #f5f5f5;
              border-radius: 5px;
          }
          h2 {
              color: #333;
              font-size: 20px;
              margin-bottom: 20px;
          }
          p {
              color: #666;
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 15px;
          }
          a {
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              background-color: #ff7f00; /* Orange button color */
              border-radius: 5px;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
              color: #aaa;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Hi ${user.fullName()},</h2>
          <p>You recently requested a password reset for your account on Sonorous Education.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetURL}">Reset Password</a>
          <p>This link will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
          <p class="footer">Thanks,<br>Support Team<br>Sonorous Education</p>
      </div>
  </body>
  </html>  
    `;
};

const welcomeUserTemplateHTML = (user) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to [Your Company Name]!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 30px;
                background-color: #f5f5f5;
                border-radius: 5px;
            }
            h2 {
                color: #333;
                font-size: 20px;
                margin-bottom: 20px;
            }
            p {
                color: #666;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 15px;
            }
            a {
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                background-color: #3498db; /* Blue button color */
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #aaa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome to Sonorous Education, ${user.fullName()}!</h2>
            <p>We're thrilled to have you join our community.</p>
            <p>You're now ready to explore everything this education platform has to offer. Here are some things you can do:</p>
            <ul>
                <li>Explore our courses</li>
                <li>Browse our resources and articles</li>
                <li>Connect with us on social media</li>
            </ul>
            <p>If you have any questions, don't hesitate to contact our support team at support@sonorous-education.com.</p>
            <a href="#">Visit Our Website</a>
            <p class="footer">Thanks,<br>The Team at Sonorous Education</p>
        </div>
    </body>
    </html>
    `;
};

const passwordChangedEmailTemplate = (user) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Password Has Been Changed - [Your Company Name]</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 50px auto;
              padding: 30px;
              background-color: #f5f5f5;
              border-radius: 5px;
          }
          h2 {
              color: #333;
              font-size: 20px;
              margin-bottom: 20px;
          }
          p {
              color: #666;
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 15px;
          }
          .warning {
              color: #c0392b;
              font-weight: bold;
          }
          a {
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              background-color: #3498db; /* Blue button color */
              border-radius: 5px;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
              color: #aaa;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Hi ${user.fullName()},</h2>
          <p>This email is to confirm that your password for your account on Sonorous Education has been changed at ${moment(
            Date.now() - 1000
          )
            .tz(process.env.TZ)
            .format("hh:mm A, DD/MMMM/YYYY")}.</p>
          <p class="warning">**Important:** If you did not initiate this password change, please contact our support team immediately.</p>
          <p>We recommend resetting your password to ensure your account security. You can do so by clicking the link below:</p>
          <a href="#">Reset Your Password</a>
          <p>You can now log in to your account using your new password (if you initiated the change).</p>
          <a href="#">Log in to Your Account</a>
          <p class="footer">Thanks,<br>The Team at Sonorous Education</p>
      </div>
  </body>
  </html>
    `;
};

module.exports = {
  resetPasswordTemplateHTML,
  welcomeUserTemplateHTML,
  passwordChangedEmailTemplate,
};
