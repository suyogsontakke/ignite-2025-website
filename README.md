<div align="center">
<!-- Use your logo URL -->
<img src="https://i.postimg.cc/HkXcxcgX/1758263167091.png" alt="IGNITE 2025 Logo" width="150" />
<h1>IGNITE 2025 - Event Ticket Booking Site</h1>
<p>
A responsive, single-page website for the IGNITE 2025 event, featuring secure Razorpay payments, a Google Gemini AI assistant, and instant PDF/JPG ticket generation.
</p>

<!-- GitHub badges -->

<p>
<a href="https://github.com/suyogsontakke/ignite-2025-website/releases"><img src="https://img.shields.io/github/v/release/[YOUR_USERNAME]/[YOUR_REPO_NAME]?label=Latest%20release&style=flat-square" alt="Latest release"/></a>
<a href="https://github.com/suyogsontakke/ignite-2025-website/stargazers"><img src="https://img.shields.io/github/stars/[YOUR_USERNAME]/[YOUR_REPO_NAME]?style=flat-square" alt="Stars"/></a>
<a href="https://github.com/suyogsontakke/ignite-2025-website/forks"><img src="https://img.shields.io/github/forks/[YOUR_USERNAME]/[YOUR_REPO_NAME]?style=flat-square" alt="Fork"/></a>
<a href="https://github.com/suyogsontakke/ignite-2025-website/blob/main/LICENSE"><img src="https://img.shields.io/github/license/[YOUR_USERNAME]/[YOUR_REPO_NAME]?style=flat-square&color=blue" alt="License"/></a>
<img src="https://img.shields.io/github/languages/top/suyogsontakke/ignite-2025-website?style=flat-square&logo=html5&logoColor=white&color=E34F26" alt="Top Language: HTML"/>
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs welcome"/>
</p>

<p>
<!-- Add your live demo link here -->
<strong>Live Demo: <a href="https://ignite-2025.vercel.app/">IGNITE BOOKING</a></strong>
</p>
</div>

<!-- Add a high-quality screenshot of your booking page -->

📖 Table of Contents

<details><summary>Table of Contents</summary>

● 🚀 About This Project

● ✨ Key Features

● 🛠️ Technologies Used

● 🔄 How It Works: Data Flow

● 🧰 Getting Started

   ● 📋 Prerequisites

   ● ⚙️ Installation & Setup

   ● ▶️ Run Locally

● 🔒 Environment Variables

● 🚀 Deployment

● 🤝 Contributing

● 📄 License

● 💎 Acknowledgements

</details>

🚀 About This Project

This repository contains the complete public-facing booking website for the "IGNITE 2025" event. It's a single-page application (SPA) designed to be the "front door" for attendees. It handles everything from event information and AI-powered support to secure ticket purchasing and instant ticket delivery.

It is built with Vanilla JavaScript and Tailwind CSS for a fast, modern, and fully responsive experience, with no frontend framework dependencies. This project serves as the client-facing component of a larger event management system that includes a secure admin panel and QR code verifier (in separate repositories/projects).

✨ Key Features

● Secure Payment Integration: Built with Razorpay Checkout for a seamless, secure, and mobile-friendly payment process.

● AI Support Chatbot: Features "Dolly," a custom-branded AI assistant powered by the Google Gemini API. It's pre-programmed with all event details (menu, rules, venue) to answer attendee questions in a friendly, conversational style.

● Instant Ticket Generation: On successful payment, the app instantly generates a downloadable Ticket and Payment Receipt.

  ● Uses ```qrious``` to create a unique, scannable QR code for the ticket.

  ● Uses ```html2canvas``` and ```jsPDF``` to offer downloads in both JPG and combined PDF formats.

● Secure Backend Connection: Securely submits all registration data to a Cloud Firestore database, placing it in a ```pending_registrations``` collection for admin approval (handled by a separate, secure admin application). Uses Firebase Anonymous Authentication for secure write access.

● Fully Responsive Design: A mobile-first design built with Tailwind CSS that looks great on all devices, from phones to desktops.

● Dynamic UI: Includes custom animations, a mobile-friendly navbar, and interactive menu cards using only Vanilla JavaScript and CSS.

🛠️ Technologies Used

<details><summary>This project utilizes the following technologies and services:</summary>

● HTML5: Standard markup language for creating web pages.

● Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.

● JavaScript (ES6+): Core programming language for web interactivity. Uses modern features like Modules.

● Firebase Firestore: A flexible, scalable NoSQL cloud database to store registration data securely.

● Firebase Authentication: Used for Anonymous Authentication to secure database writes.

● Razorpay API: Payment gateway integration for secure online payments in India.

● Google Gemini API: Powers the "Dolly" AI assistant for answering user questions.

● jsPDF: Client-side JavaScript library to generate PDF documents.

● html2canvas: JavaScript library to take "screenshots" of HTML elements.

● qrious: JavaScript library for generating QR codes.

</details>



🔄 How It Works: Data Flow

1. A user visits the site, which anonymously authenticates with Firebase in the background.

2. The user fills out the registration form (```name```, ```email```, ```mobile```).

3. The app initiates the Razorpay payment modal with the event amount.

4. The user completes the payment on Razorpay's secure gateway.

5. On successful payment, Razorpay returns a ```paymentId```.

6. The app combines the form data and ```paymentId``` and securely writes it as a new document to the ```pending_registrations``` collection in Firestore. This write is allowed by the ```FIRESTORE.rules```.

7. Simultaneously, the app uses the user's data to generate the ticket and receipt on-the-fly and presents them with download buttons.

8. (Separately) An admin uses a secure admin panel (not included in this repo) to read from ```pending_registrations```, approve the ticket (which moves it to an ```approved_registrations``` collection), and prepare it for verification at the event using a QR scanner app (also separate).

🧰 Getting Started

To get a local copy up and running, follow these steps.

📋 Prerequisites

You will need accounts and API keys for the following services:

● Firebase (for Firestore & Auth)

● Razorpay (for payment keys - use Test keys for development)

● Google AI Studio (for the Gemini API Key)

● Node.js (Optional: for using a local development server like ```live-server```)

● Git

⚙️ Installation & Setup

1. Clone the Repo

```bash
git clone https://github.com/suyogsontakke/ignite-2025-website.git
```
```bash
cd ignite-2025-website
```

2. Set Up Firebase

● Create a new project in the Firebase Console.

● Go to Firestore Database, create a database (start in Test mode for easy setup, but remember to secure it with rules later).

● Go to the Rules tab, paste the contents of the ```FIRESTORE.rules``` file from this repository and Publish.

● Go to Authentication -> Sign-in method and enable Anonymous sign-in.

● Go to Project Settings (⚙️ icon) -> Your apps -> Web app. Register a new web app, and copy the Firebase config object (it looks like ```{ apiKey: "...", authDomain: "...", ... }```).

3. Configure Environment Variables (in ```index.html```)

● Open ```index.html``` in a code editor.

● Find the ```<script type="module">``` section.

● Firebase Config: Locate the ```firebaseConfig``` object and paste your copied config values there.

● Gemini API Key: Find the ```getDollyResponse``` function. Replace the placeholder ```apiKey``` ("YOUR_GEMINI_API_KEY_HERE" or similar) with your actual Google AI Studio key.

```bash
const apiKey = "YOUR_GEMINI_API_KEY_HERE"; // <-- PASTE YOUR KEY HERE
```


● Razorpay Key: Find the ```handlePaymentAndRegistration``` function. Locate the ```options``` object for ```new Razorpay(options)``` and replace the placeholder ```key``` with your Razorpay Test Key.

```bash
const options = {
    "key": "YOUR_RAZORPAY_TEST_KEY_HERE", // <-- PASTE YOUR KEY HERE
    // ... other options
};
```


▶️ Run Locally

● Simple Method: Open the ```index.html``` file directly in your web browser.

● Recommended Method (using a local server):

● If you don't have a local server installed, you can use ```npx```:

```bash
npx live-server
```


● Or, if you have Node.js installed, you can install ```live-server``` globally:

```bash
npm install -g live-server
live-server
```


● This will typically open the site at ```http://127.0.0.1:8080``` (or similar) and automatically reload when you save changes. Using a server avoids potential issues with ES6 modules loading directly from the file system.

🔒 Environment Variables

This project requires the following keys/credentials to be configured directly within the ```index.html``` file:

```bash
// Inside <script type="module">

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

// Google Gemini API Key (inside getDollyResponse function)
const apiKey = "YOUR_GEMINI_API_KEY_HERE";

// Razorpay Key ID (inside handlePaymentAndRegistration function options)
const options = {
    "key": "YOUR_RAZORPAY_TEST_KEY_HERE",
    // ...
};
```


Note: For a production deployment, consider securing these keys further, potentially using Firebase Hosting's reserved URLs or server-side functions if scaling the project.

🚀 Deployment

This project is a static website and can be deployed easily to various platforms:

● Vercel: Connect your GitHub repository for automatic deployments on push. No special configuration is needed.

● Netlify: Similar to Vercel, connect your GitHub repository.

● Firebase Hosting: Use the Firebase CLI to deploy the ```index.html``` file and any assets.

```bash
# Install Firebase CLI (if you haven't already)
npm install -g firebase-tools
# Login to Firebase
firebase login
# Initialize Firebase Hosting in your project folder
firebase init hosting
# Deploy
firebase deploy --only hosting
```


● GitHub Pages: Enable GitHub Pages in your repository settings.

Remember to update the Firebase, Gemini, and Razorpay keys in your deployed ```index.html``` file, potentially using Live keys for Razorpay in production.

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the Project

2. Create your Feature Branch (```git checkout -b feature/AmazingFeature```)

3. Commit your Changes (```git commit -m 'Add some AmazingFeature'```)

4. Push to the Branch (```git push origin feature/AmazingFeature```)

5. Open a Pull Request

📄 License

Distributed under the MIT License. See ```LICENSE``` file for more information (you may need to add a LICENSE file to your repo).

💎 Acknowledgements

● Firebase

● Tailwind CSS

● Razorpay

● Google AI

● jsQR

● jsPDF

● html2canvas

● qrious

● Shields.io for Badges (shields.io)

● Skill Icons (skillicons.dev)
