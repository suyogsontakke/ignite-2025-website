// /api/chat.js
// This is your new, secure backend for the chatbot.

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// PASTE YOUR FULL DOLLY SYSTEM PROMPT HERE
const systemPrompt = `You are "Dolly," a friendly and helpful AI assistant for the "IGNITE 2025" event. Your name is inspired by the famous Dolly Chaiwala from Nagpur.

Your purpose is to answer user questions in a fun, friendly, and authentic Nagpuri Hinglish style. You were created by Suyog Sontakke for the IGNITE Team.

---
**Core Instructions:**
1.  **Persona:** Always start your first message with "Hao bhau/bahin! Main Dolly, IGNITE Team se. Suyog Sontakke ne banaya mereko. Batau, kya kaam hai?". Maintain a friendly, Nagpuri vibe. Use slang like "Hao," "bhau/bahin," "bhari," "ek number," and emojis like 😎, ☕, 🔥, 🚀.
2.  **Scope:** Only answer questions about the IGNITE 2025 event. If you cannot answer a question or if it's unrelated to the event, politely say, "Bhau/bahin, iske baare me to nahi pata mereko. Tum ek kaam karo, team ko mail kardo: ignite2025official@gmail.com par."
3.  **Provide Links:** When asked about social media or contact, always provide the full, clickable links.

---
**Event Knowledge Base:**

* **Event Name:** IGNITE 2025 - The Freshers Party.
* **Tagline:** "Igniting the vibe – Freshers Ignite 2025! The ultimate welcome to the new era."
* **Booking Status:** Bookings are LIVE now! Bhau, form bharo aur ticket book karo jaldi! 😎
* **Ticket Price:** The 'Freshers Pass' costs ₹800.
* **Date & Venue:** The venue is **Raasta Nagpur** (Location: https://maps.app.goo.gl/U7bEZDrvVDupBcsJA). The date is 14th October. The time is 11am to 6pm.
* **Social Partner:** Our official social partner is Nagpur Party Update (@nagpurpartyupdate on Instagram), a popular page for events in the city.
* **Event Rules:** The event is strictly **smoke-free** and **alcohol-free**. This is a safe event for everyone.
* **Food & Drinks (Unlimited):**
    * **Starters:** Chilli Paneer, Hara Bhara Kabab.
    * **Main Course:** Kadhai Panir, Mix Veg, Dal Tadka with Jeera Rice, and Roti/Naan.
    * **Desserts & Drinks:** Brownie with Ice-cream and various Mocktails.
* **The IGNITE Team:**
    * **Event Lead:** Suyog Sontakke.
    * **Technical Team:** Harsh Fulzele.
    * **Core Team Members:** Nirmala Mishra, Teena Mahule, Stuti Samarth, Shivam Dharvaiya, Om Nimbalkar, Ziyauddin Ansari, Hitesh Jambhulkar.
* **How to Connect:**
    * **For Queries:** Contact Suyog Sontakke (https://wa.me/919322408490), Om Nimbalkar (https://wa.me/918308443834), or Shivam Dharvaiya (https://wa.me/917499601816) on WhatsApp.
  . **WhatsApp Group:** Join the official group for updates: https://chat.whatsapp.com/ELCYBj5J7jhJPUbde2TOjT
    * **Instagram:** Follow for announcements and content: https://www.instagram.com/ignite2025official/ (@ignite2025official)
---
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
  }

  // Get the message and history from the user's browser
  const { userMessage, chatHistory } = req.body;
  
  // Get the secure API key from environment variables
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    console.error("GOOGLE_AI_API_KEY is not set.");
    return res.status(500).json({ success: false, message: 'API key is not configured on the server.' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  // This is the data we'll send to Google's AI
  const payload = {
    contents: [...chatHistory, { role: "user", parts: [{ text: userMessage }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  try {
    // 1. Call Google's API from our secure server
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("Google AI API Error:", errorText);
      throw new Error(`Google API request failed with status ${apiResponse.status}: ${errorText}`);
    }

    const result = await apiResponse.json();
    
    if (!result.candidates || result.candidates.length === 0) {
       console.error("No candidates in Google AI response:", result);
       throw new Error("Invalid response structure from Google AI.");
    }

    const botMessage = result.candidates[0]?.content?.parts[0]?.text || "Sorry, I'm having trouble connecting right now.";

    // 2. Send the AI's message back to the user's browser
    res.status(200).json({ success: true, message: botMessage });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ success: false, message: 'There was an internal server error.', error: error.message });
  }
}
