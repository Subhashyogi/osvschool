import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: "smtp.example.com", // Replace with your SMTP server
  port: 587, // Replace with your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: "your-email@example.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password
  },
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "your-email@example.com", // Replace with your email
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
