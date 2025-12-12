const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, code, type = 'verification') => {
  const subject = type === 'verification' ? 'Verify Your SwapAm Account' : 'Reset Your Password';
  const message = type === 'verification' 
    ? `Your verification code is: ${code}`
    : `Your password reset code is: ${code}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2E7D32, #1B5E20); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">SwapAm</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #2E7D32;">${subject}</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            ${message}
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="color: #2E7D32; font-size: 32px; letter-spacing: 4px; margin: 0;">
              ${code}
            </h3>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code will expire in 10 minutes. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };