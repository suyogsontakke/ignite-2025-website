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
  // This matches what your new frontend script is sending.
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

  // --- NEW THEME COLORS ---
  // Pulled directly from your website's CSS
  const neonGreen = '#16FF00';
  const bgDark = '#0B120E';
  const bgLight = '#111A15';
  const textBright = '#f8fafc';
  const textSecondary = '#a0aec0';

  // Set up the email's content using HTML with the new theme
  const mailOptions = {
    from: `"IGNITE 2025" <${process.env.EMAIL_USER}>`,
    to: email, // The recipient's email from the form
    subject: `✅ Your IGNITE 2025 Ticket is Confirmed! (Date: 14th Oct)`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: ${textBright}; background-color: ${bgDark}; padding: 25px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid ${bgLight};">
        
        <h2 style="color: ${neonGreen}; text-shadow: 0 0 8px ${neonGreen}, 0 0 12px ${neonGreen}; font-size: 28px; margin-bottom: 15px; text-align: center;">
          Hey ${name}, you're all set!
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 25px; text-align: center;">
          Your spot for <b>IGNITE 2025</b> is officially confirmed. Get ready to ignite the vibe at Nagpur's ultimate freshers' party!
        </p>

        <div style="background-color: ${bgLight}; padding: 20px; border-left: 4px solid ${neonGreen}; margin: 30px auto; max-width: 400px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 14px; color: ${textSecondary}; text-transform: uppercase; letter-spacing: 0.5px;">Your unique Ticket ID:</p>
          <p style="font-size: 26px; color: ${neonGreen}; text-shadow: 0 0 5px ${neonGreen}; font-weight: bold; margin-top: 8px; letter-spacing: 1px;">
            ${ticketId}
          </p>
        </div>

        <div style="background-color: ${bgLight}; padding: 20px; border-radius: 8px; margin-top: 25px; text-align: left;">
          <h3 style="color: ${neonGreen}; font-size: 20px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid ${textSecondary}; padding-bottom: 10px;">
            Event Details
          </h3>
          <ul style="list-style: none; padding-left: 0; margin: 0; color: ${textBright}; font-size: 16px; line-height: 1.8;">
            <li style="margin-bottom: 10px;"><strong>📅 Date:</strong> 14th October</li>
            <li style="margin-bottom: 10px;"><strong>⏰ Time:</strong> 11am To 6pm</li>
            <li style="margin-bottom: 10px;"><strong>📍 Venue:</strong> RAASTA🌴, Nagpur</li>
          </ul>
        </div>
        
        <p style="font-size: 14px; color: ${textSecondary}; text-align: center; margin-top: 30px;">
          Please keep this email safe. You can also download your full ticket and receipt from the confirmation screen on our website.
        </p>

        <p style="font-size: 14px; color: ${textBright}; margin-top: 40px; text-align: center;">
          See you there,
        </p>
        <p style="font-size: 18px; font-weight: bold; color: ${neonGreen}; text-shadow: 0 0 3px ${neonGreen}; text-align: center; margin-top: 5px;">
          The IGNITE 2025 Team 🔥
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
