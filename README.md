<div align="center">
  <!-- Use your logo URL -->
  <img src="https://i.postimg.cc/HkXcxcgX/1758263167091.png" alt="IGNITE 2025 Logo" width="150" />
  <h1>IGNITE 2025 - Event Ticket Booking Site</h1>
  <p>
    A sleek, responsive, single-page application for attendees to learn about the IGNITE 2025 event, get AI-powered support, and securely purchase tickets online.
  </p>
  
  <!-- GitHub badges -->
  <p>
    <a href="https://github.com/suyogsontakke/ignite-2025-website/releases"><img src="https://img.shields.io/github/v/release/suyogsontakke/ignite-2025-website?label=Latest%20release&style=flat-square" alt="Latest release"/></a>
    <a href="https://github.com/suyogsontakke/ignite-2025-website/stargazers"><img src="https://img.shields.io/github/stars/suyogsontakke/ignite-2025-website?style=flat-square" alt="Stars"/></a>
    <a href="https://github.com/suyogsontakke/ignite-2025-website/forks"><img src="https://img.shields.io/github/forks/suyogsontakke/ignite-2025-website?style=flat-square" alt="Fork"/></a>
    <a href="https://github.com/suyogsontakke/ignite-2025-website/blob/main/LICENSE"><img src="https://img.shields.io/github/license/suyogsontakke/ignite-2025-website?style=flat-square&color=blue" alt="License"/></a>
    <img src="https://img.shields.io/github/languages/top/suyogsontakke/ignite-2025-website?style=flat-square&logo=html5&logoColor=white&color=E34F26" alt="Top Language: HTML"/>
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs welcome"/>
  </p>
  
  <strong>Live Demo: <a href="https://ignite-2025.vercel.app/">IGNITE BOOKING</a></strong>
</div>

<!-- Add a high-quality screenshot of your booking page -->
![IGNITE 2025 Screenshot](https://i.postimg.cc/tgBc0sLf/image.png)

---

## 📖 Table of Contents

<details><summary>Table of Contents</summary>

* [🚀 About This Project](#-about-this-project)
* [✨ Key Features](#-key-features)
* [🛠️ Technologies Used](#️-technologies-used)
* [🔗 System Architecture](#-system-architecture)
* [🧰 Getting Started](#-getting-started)
  * [📋 Prerequisites](#-prerequisites)
  * [⚙️ Installation & Setup](#️-installation--setup)
  * [▶️ Run Locally](#️-run-locally)
* [🔒 Environment Variables & Configuration](#-environment-variables--configuration)
* [🚀 Deployment](#-deployment)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [💎 Acknowledgements](#-acknowledgements)

</details>

---

## 🚀 About This Project

This repository contains the public-facing **Ticket Booking Website** for the "IGNITE 2025" event. It serves as the primary touchpoint for attendees, providing event details, showcasing promotional content, offering AI-driven support, and facilitating secure online ticket purchases.

Built entirely with **Vanilla JavaScript**, **Tailwind CSS**, and modern HTML5, this single-page application is designed to be fast, responsive, and engaging. It integrates seamlessly with **Firebase Firestore** for data submission and **Razorpay** for payment processing.

Data submitted through this site is initially stored in a `pending_registrations` collection in Firestore, awaiting review and approval via the separate **Admin Dashboard**.

---

## ✨ Key Features

* **Responsive Design:** Fully responsive layout optimized for desktops, tablets, and mobile devices using **Tailwind CSS**.
* **Event Information:** Clearly presents event details, venue information (when available), food menu highlights, core team members, and social media links.
* **Promotional Content:** Includes embedded video sections for event teasers and glimpses.
* **Secure Payment Integration:** Integrates with **Razorpay Checkout** for secure online payment processing.
* **Ticket Generation & Download:** Upon successful payment, generates a unique digital ticket with attendee details and a QR code using `qrious`. Includes functionality to download the ticket (JPG) and a payment receipt (JPG) or both combined as a PDF using `html2canvas` and `jsPDF`.
* **AI Chatbot Assistant ("Dolly"):** Features an integrated chatbot powered by the **Google Gemini API**. "Dolly" answers event-specific questions in a friendly, localized style based on a defined knowledge base and system prompt.
* **Serverless Backend:** Utilizes **Firebase Firestore** to securely store registration data upon successful payment. New registrations are placed in a `pending_registrations` collection for admin review.
* **Firebase Anonymous Authentication:** Uses Firebase anonymous sign-in to satisfy security rules required for writing data to Firestore.
* **Basic Security Measures:** Includes client-side input validation and attempts to disable right-click/developer tools access (basic deterrent).

---

## 🛠️ Technologies Used

<details><summary>This project utilizes the following technologies and services:</summary>

* [**HTML5**](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5): Standard markup language for creating web pages.
* [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework loaded via CDN for rapid styling and responsiveness.
* [**JavaScript (ES6+)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Core programming language for interactivity, API calls, and DOM manipulation. Uses modern features like Modules.
* [**Firebase Firestore**](https://firebase.google.com/products/firestore): NoSQL cloud database used to securely submit registration data to the `pending_registrations` collection.
* [**Firebase Authentication**](https://firebase.google.com/products/auth): Used for **Anonymous Authentication** to grant write permissions according to Firestore Security Rules.
* [**Google Gemini API**](https://ai.google.dev/): Powers the "Dolly" AI chatbot assistant, providing natural language responses based on event data.
* [**Razorpay Payment Gateway**](https://razorpay.com/): Integrated via their Web Checkout SDK for handling online payments securely.
* [**jsPDF**](https://github.com/parallax/jsPDF): Client-side JavaScript library to generate PDF documents (for combined ticket/receipt download).
* [**html2canvas**](https://html2canvas.hertzen.com/): JavaScript library to take "screenshots" of HTML elements (used for JPG exports and PDF generation).
* [**qrious**](https://github.com/neocotic/qrious): JavaScript library for generating QR codes dynamically for the digital tickets.

</details>

[![Technologies Used](https://skillicons.dev/icons?i=html,tailwind,js,firebase,googlecloud)](https://skillicons.dev)
*(Note: 'googlecloud' icon represents the Gemini API)*

---

## 🔗 System Architecture

This booking site is part of a larger serverless event platform:

1.  **Booking Site (This Repo):** Attendee registers -> Pays via Razorpay -> On success, data is written to Firestore (`pending_registrations`). Generates/downloads ticket locally.
2.  **Admin Dashboard (Separate App):** Admin logs in securely -> Reads from `pending_registrations` -> Approves registration -> Data is securely moved to `approved_registrations` using Firestore rules & admin privileges.
3.  **Ticket Verifier (Separate App):** Securely logs in (admin only) -> Scans QR code -> Reads *only* from `approved_registrations` to verify check-in status -> Updates check-in status securely using Firestore rules & admin privileges.

**Security:** Firestore rules ensure that the public booking site can *only* create entries in `pending_registrations` and cannot read or modify other data. Admin actions are protected by requiring authenticated admin UIDs.

---

## 🧰 Getting Started

To get this booking website running locally.

### 📋 Prerequisites

* A **Firebase Project** with Firestore and Anonymous Authentication enabled.
* A **Razorpay Account** with API keys (Test keys are sufficient for development).
* A **Google AI API Key** for the Gemini API (Chatbot functionality).
* [Node.js](https://nodejs.org/en/) (Optional: for using a local development server)
* [Git](https://git-scm.com/downloads)

### ⚙️ Installation & Setup

1.  **Clone the Repo**

 ```bash
  git clone https://github.com/suyogsontakke/ignite-2025-website.git
  ```
```bash
cd ignite-2025-website
```

2.  **Configure Firestore Rules**
    * Go to your **Firebase Console** -> **Firestore Database** -> **Rules**.
    * Paste the contents of the `FIRESTORE.rules` file provided in this repository.
    * **Publish** the rules. *(Note: These rules are specific to allowing *this* booking site to function. The complete system requires the combined ruleset found in the Admin Dashboard repo).*

3.  **Configure `index.html`**
    * Open `index.html` in a code editor.
    * Find the `<script type="module">` section.
    * **Firebase Config:** Locate the `firebaseConfig` object and replace the placeholder values with your actual Firebase project configuration keys.
    * **Razorpay Key:** Find the `options` object within the `handlePaymentAndRegistration` function. Replace `"rzp_test_..."` with your actual **Razorpay Key ID** (Test or Live).
        ```javascript
        const options = {
            "key": "YOUR_RAZORPAY_KEY_ID", // <-- Replace this
            // ... rest of the options
        };
        ```
    * **Gemini API Key:** Find the `getDollyResponse` function. Replace `"YOUR_GEMINI_API_KEY"` with your actual Google AI API key.
        ```javascript
        async function getDollyResponse(userMessage) {
            const apiKey = "YOUR_GEMINI_API_KEY"; // <-- Replace this
            // ... rest of the function
        }
        ```
    * **(Optional) Chatbot Prompt:** Modify the `systemPrompt` variable if you need to adjust the chatbot's persona or knowledge base.

### ▶️ Run Locally

* **Simple Method:** Open the `index.html` file directly in your web browser.
* **Recommended Method (using a local server):**
    ```bash
    npx live-server
    # OR if installed globally:
    # live-server
    ```
    Navigate to the local URL provided (e.g., `http://127.0.0.1:8080`).

---

## 🔒 Environment Variables & Configuration

This project relies on keys embedded directly in the `index.html` file due to its client-side nature. **For a production deployment, consider moving sensitive keys (especially Gemini API Key) to a backend function or proxy for better security.**

* **`firebaseConfig` Object:** Contains Firebase project credentials.
* **`Razorpay Key ID`:** Public key for initializing Razorpay Checkout.
* **`Gemini API Key`:** Used for the AI Chatbot. **Treat this as sensitive.**

---

## 🚀 Deployment

Deploy this static website using any modern hosting provider.

* **Vercel / Netlify:** Ideal for easy deployment. Connect your GitHub repository. No special configuration needed.
* **Firebase Hosting:** Good integration with the Firebase backend.
* **GitHub Pages:** Suitable for simple static hosting.

```bash
# Example Firebase Deployment
firebase deploy --only hosting
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the Project

2. Create your Feature Branch (```git checkout -b feature/AmazingFeature```)

3. Commit your Changes (```git commit -m 'Add some AmazingFeature'```)

4. Push to the Branch (```git push origin feature/AmazingFeature```)

5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See ```LICENSE``` file for more information (you may need to add a LICENSE file to your repo).

## 💎 Acknowledgements

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
