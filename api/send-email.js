import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // --- DIAGNOSTIC LOGS ---
  console.log("Function '/api/send-email' started.");
  console.log("Is EMAIL_USER set?", !!process.env.EMAIL_USER);
  console.log("Is EMAIL_PASS set?", !!process.env.EMAIL_PASS);
  // -----------------------

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
  }

  const { name, email, ticketId, jpgData } = req.body;

  if (!name || !email || !ticketId || !jpgData) {
    console.error("Missing required fields in request body.");
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"IGNITE 2025" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Your Ticket for IGNITE 2025 is Confirmed!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #EF4444;">Hey ${name}, your ticket is here!</h2>
        <p>Thank you for registering for <b>IGNITE 2025</b>. Your ticket image is attached to this email.</p>
        <p>We can't wait to see you there!</p>
        <br>
        <p><b>The #IGNITE Team 🔥</b></p>
      </div>
    `,
    attachments: [
      {
        filename: `IGNITE-2025-Ticket-${ticketId}.jpg`,
        path: jpgData,
        contentType: 'image/jpeg'
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
    return res.status(200).json({ success: true, message: 'Email with JPG attachment sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'There was an error sending the email.',
      error: error.message 
    });
  }
}