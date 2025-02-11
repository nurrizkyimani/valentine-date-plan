import nodemailer from 'nodemailer';

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.RECIPIENT_EMAIL) {
  throw new Error("Required email credentials not found in environment variables");
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendValentineConfirmation(
  to: string,
  name: string,
  date: string,
  time: string,
  restaurantName: string
) {
  const emailContent = `
    <h1>💖 Your Valentine's Date is Confirmed! 💖</h1>
    <p>Dear ${name},</p>
    <p>Your romantic getaway has been scheduled:</p>
    <ul>
      <li>Date: ${date}</li>
      <li>Time: ${time}</li>
      <li>Restaurant: ${restaurantName}</li>
    </ul>
    <p>Can't wait to create beautiful memories together!</p>
  `;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: to,
    subject: '💝 Your Valentine\'s Date is Confirmed!',
    html: emailContent,
  });
}