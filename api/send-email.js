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

  // Define the neon colors
  const neonPink = '#ff00c1';
  const neonCyan = '#00f6ff';
  const bgDarkJungle = '#0a0f1f';
  const textBright = '#ffffff';

  // Set up the email's content using HTML with theme integration
  const mailOptions = {
    from: `"IGNITE 2025: Urban Jungle Rave" <${process.env.EMAIL_USER}>`,
    to: email, // The recipient's email from the form
    subject: `✅ Your IGNITE 2025 Expedition Pass is Confirmed!`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: ${textBright}; background-color: ${bgDarkJungle}; padding: 20px; border-radius: 10px; text-align: center;">
        <h2 style="color: ${neonPink}; text-shadow: 0 0 8px ${neonPink}, 0 0 12px ${neonCyan}; font-size: 28px; margin-bottom: 15px;">
          Hey ${name}, your spot in the Urban Jungle is CONFIRMED!
        </h2>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Welcome to the tribe! Your expedition pass for <b>IGNITE 2025</b> is secured. Get ready to unleash your wild side at Nagpur's most epic freshers' rave!
        </p>
        <div style="background-color: rgba(255, 255, 255, 0.05); padding: 15px; border-left: 4px solid ${neonCyan}; margin: 25px auto; max-width: 400px; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: ${textBright};">Your unique Expedition Pass ID:</p>
          <p style="font-size: 24px; color: ${neonCyan}; text-shadow: 0 0 5px ${neonCyan}; font-weight: bold; margin-top: 5px;">${ticketId}</p>
        </div>
        <p style="font-size: 14px; color: ${textBright}; margin-bottom: 20px;">
          Please keep this email safe. You can also download your full ticket and receipt from the confirmation screen on our website.
        </p>
        <p style="font-size: 16px; margin-bottom: 25px;">
          Prepare for an unforgettable night of electrifying beats, vibrant lights, and tropical rhythms!
        </p>
        <p style="font-size: 18px; color: ${neonPink}; text-shadow: 0 0 5px ${neonPink}; font-weight: bold; margin-bottom: 20px;">
          Date: Coming Soon! Stay tuned for the full reveal!
        </p>
        <br>
        <p style="font-size: 14px; color: ${textBright}; margin-top: 30px;">
          With wild enthusiasm,
        </p>
        <p style="font-size: 16px; font-weight: bold; color: ${neonPink}; text-shadow: 0 0 3px ${neonPink};">
          The IGNITE 2025 Tribe 🔥
        </p>
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
