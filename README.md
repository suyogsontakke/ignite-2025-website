<div align="center">
<!-- Use your logo URL -->
<img src="https://i.postimg.cc/HkXcxcgX/1758263167091.png" alt="IGNITE 2025 Logo" width="150" />
<h1>IGNITE 2025 - Event Ticket Booking Site</h1>
<p>
A responsive, single-page website for the IGNITE 2025 event, featuring secure Razorpay payments, a Google Gemini AI assistant, and instant PDF/JPG ticket generation.
</p>

<!-- Badges: Replace with your actual stack/license -->

<p>
<img src="https://www.google.com/search?q=https://img.shields.io/badge/HTML5-E34F26%3Fstyle%3Dfor-the-badge%26logo%3Dhtml5%26logoColor%3Dwhite" alt="HTML5" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" alt="Tailwind CSS" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/JavaScript-F7DF1E%3Fstyle%3Dfor-the-badge%26logo%3Djavascript%26logoColor%3Dblack" alt="JavaScript" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Firebase-FFCA28%3Fstyle%3Dfor-the-badge%26logo%3Dfirebase%26logoColor%3Dblack" alt="Firebase" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/License-MIT-blue.svg%3Fstyle%3Dfor-the-badge" alt="License: MIT" />
</p>

<p>
<!-- Add your live demo link here -->
<strong><a href="#">[YOUR_LIVE_DEMO_LINK_HERE]</a></strong>
</p>
</div>

<!-- Add a high-quality screenshot of your booking page -->

🚀 About This Project

This repository contains the complete public-facing booking website for the "IGNITE 2025" event. It's a single-page application (SPA) designed to be the "front door" for attendees. It handles everything from event information and AI-powered support to secure ticket purchasing and instant ticket delivery.

It is built with Vanilla JavaScript and Tailwind CSS for a fast, modern, and fully responsive experience, with no frontend framework dependencies.

✨ Key Features

Secure Payment Integration: Built with Razorpay Checkout for a seamless, secure, and mobile-friendly payment process.

AI Support Chatbot: Features "Dolly," a custom-branded AI assistant powered by the Google Gemini API. It's pre-programmed with all event details (menu, rules, venue) to answer attendee questions in a friendly, conversational style.

Instant Ticket Generation: On successful payment, the app instantly generates a downloadable Ticket and Payment Receipt.

Uses qrious to create a unique, scannable QR code for the ticket.

Uses html2canvas and jsPDF to offer downloads in both JPG and combined PDF formats.

Secure Backend Connection: Securely submits all registration data to a Cloud Firestore database, placing it in a pending_registrations collection for admin approval (handled by a separate, secure admin application).

Fully Responsive Design: A mobile-first design built with Tailwind CSS that looks great on all devices, from phones to desktops.

Dynamic UI: Includes custom animations, a mobile-friendly navbar, and interactive menu cards to create an engaging user experience.

🛠️ Tech Stack

Frontend: HTML5, Tailwind CSS, Vanilla JavaScript (ES6 Modules)

Backend as a Service (BaaS):

Firebase Firestore: NoSQL database for storing registration data.

Firebase Authentication: Used for anonymous sign-in to grant the client secure, write-only permissions to the database.

APIs & Libraries:

Razorpay API: For payment processing.

Google Gemini API: For the AI chatbot.

jsPDF: For client-side PDF generation.

html2canvas: For capturing HTML elements as images.

qrious: For generating QR codes.

🔄 How It Works: Data Flow

A user visits the site, which anonymously authenticates with Firebase in the background.

The user fills out the registration form (name, email, mobile).

The app initiates the Razorpay payment modal with the event amount.

The user completes the payment on Razorpay's secure gateway.

On successful payment, Razorpay returns a paymentId.

The app combines the form data and paymentId and securely writes it as a new document to the pending_registrations collection in Firestore. This write is allowed by the FIRESTORE.rules.

Simultaneously, the app uses the user's data to generate the ticket and receipt on-the-fly and presents them with download buttons.

(Separately) An admin uses a secure admin panel to read from pending_registrations, approve the ticket (which moves it to approved_registrations), and prepare it for verification at the event.

🚀 Getting Started

To get a local copy up and running, follow these steps.

Prerequisites

You will need accounts and API keys for the following services:

Firebase (for Firestore & Auth)

Razorpay (for payment keys)

Google AI Studio (for the Gemini API Key)

Installation & Setup

Clone the Repo

git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPO_NAME].git


Set Up Firebase

Create a new project in the Firebase Console.

Go to Firestore Database, create a database, and go to the Rules tab.

Paste the contents of the FIRESTORE.rules file from this repository and Publish.

Go to Authentication -> Sign-in method and enable Anonymous sign-in.

Go to Project Settings and copy your Firebase config object (it looks like { apiKey: "...", authDomain: "...", ... }).

Configure index.html

Open index.html in a code editor.

Find the firebaseConfig object and paste your own config values.

Find the getDollyResponse function and replace YOUR_GEMINI_API_KEY_HERE with your Google AI Studio key.

Find the handlePaymentAndRegistration function and replace "rzp_test_RCthJa2Mqp2sit" in the options object with your own Razorpay Key.

Run the Project

You can open index.html directly in your browser.

For best results (to avoid any CORS issues with modules), run it with a local server. If you have VS Code, you can use the Live Server extension.

📄 License

Distributed under the MIT License.
