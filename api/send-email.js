// Import and configure dotenv to load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // This line forces the loading of your local credentials

// Import nodemailer
import nodemailer from 'nodemailer';

// This is the Vercel Serverless Function handler
export default async function handler(req, res) {
  // Ensure the request is a POST, as it contains the form data
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
  }

  // Destructure the name, email, and ticketId from the request body
  const { name, email, ticketId } = req.body;

  // Check if all required data is present
  if (!name || !email || !ticketId) {
    return res.status(400).json({ success: false, message: 'Missing required fields: name, email, or ticketId' });
  }

  // Configure the Nodemailer transporter using credentials from environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your 16-character Gmail "App Password"
    },
  });

  // Set up the email's content using HTML
  const mailOptions = {
    from: `"IGNITE 2025" <${process.env.EMAIL_USER}>`,
    to: email, // The recipient's email from the form
    subject: '✅ Your Ticket for IGNITE 2025 is Confirmed!',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #EF4444;">Hey ${name}, your spot is confirmed!</h2>
        <p>Thank you for registering for <b>IGNITE 2025</b>. We're thrilled to have you join us for Nagpur's biggest freshers' party!</p>
        <hr>
        <p>Your unique Ticket ID is: <b style="font-size: 18px; color: #EF4444;">${ticketId}</b></p>
        <p>Please keep this email safe. You can also download your full ticket and receipt from the confirmation screen on our website.</p>
        <br>
        <p>Get ready for an unforgettable night of music, food, and fun!</p>
        <p>See you on October 25th!</p>
        <br>
        <p>Warmly,</p>
        <p><b>The IGNITE Team 🔥</b></p>
      </div>
    `,
  };

  // Attempt to send the email and handle the result
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'There was an error sending the email.',
      error: error.message 
    });
  }
}
