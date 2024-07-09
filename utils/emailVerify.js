import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
      user: 'hamim2114@gmail.com',
      pass: 'ukno blvj gbto akbh'
    }
  });

  const mailOptions = {
    from: 'poshcoderbd@gmail.com',
    to: email,
    subject: 'Posh Coder Email Verification',
    text: `Please verify your email by clicking the following link: 
    https://www.poshcoder.com/verify-email?token=${token}`
  };

  await transporter.sendMail(mailOptions);
};
