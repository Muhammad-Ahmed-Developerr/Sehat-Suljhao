<div align="center">

<img src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" alt="Sehat-Suljhao Banner" width="100%" />

# 🏥 Sehat-Suljhao (صحت سلجھاؤ)
**Your AI-Powered Empathetic Medical Assistant**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-f55036?style=for-the-badge)](https://groq.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

*Translating complex medical jargon into simple, actionable, and empathetic health insights.*

[**Live Demo**](#) • [**Report Bug**](#) • [**Request Feature**](#)

</div>

---

## 🌟 The Vision

Medical reports can be intimidating. Patients often receive pages of complex laboratory data filled with incomprehensible acronyms (ALT, AST, HDL, LDL) without any clear, actionable advice. 

**Sehat-Suljhao** bridges the gap between complex medical science and human understanding. Powered by **Groq's lightning-fast inference** and **Google Gemini**, the platform introduces **Dr. Mona**, a deeply empathetic AI physician that not only breaks down your health metrics but also provides culturally resonant lifestyle, diet, and mental health advice (optimized for Urdu/Roman Urdu and English).

---

## ✨ God-Tier Features

| Feature | Description |
| :--- | :--- |
| 📄 **Smart Report Parsing** | Instantly upload lab reports. The AI extracts crucial biomarkers, flags abnormalities, and provides immediate clinical context. |
| 👩‍⚕️ **Dr. Mona AI Chat** | Ask anything! From "What does borderline sugar mean?" to "Give me a 7-day diet plan for fatty liver." Driven by **Llama-3.3-70b-versatile**. |
| 📊 **Interactive Dashboard** | A highly visual dashboard featuring beautiful, real-time gauges, Risk Indicators, and Health parameter row components. |
| 🌍 **Culturally Aware** | Designed with deep cultural empathy, offering localized dietary advice (e.g., using "Isbaghol" or "Daliya") instead of generic western diets. |
| 🎨 **Glassmorphic UI** | A breathtaking dark-mode interface powered by **Tailwind v4** and **Framer Motion**, delivering micro-animations and glowing ambient orbs. |

---

## 🏗️ Architecture & Tech Stack

<details>
<summary><b>Frontend Ecosystem (Click to expand)</b></summary>

- **Core:** [Next.js 15 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) for server-side optimized, high-performance rendering.
- **Language:** Strictly typed with [TypeScript](https://www.typescriptlang.org/) for massive scale maintainability.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) utilizing advanced arbitrary values and CSS modules.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) handling seamless page transitions and interactive micro-animations.
- **Icons & Charts:** [Lucide React](https://lucide.dev/) for crisp SVGs and [Recharts](https://recharts.org/) for data visualization.

</details>

<details>
<summary><b>AI & Backend Logic (Click to expand)</b></summary>

- **Inference Engine:** [Groq SDK](https://groq.com/). Delivering token generation at impossible speeds utilizing the `llama-3.3-70b-versatile` model for medical reasoning.
- **Multi-Modal AI:** [Google GenAI SDK](https://ai.google.dev/). Utilizing Gemini for complex document understanding and OCR capabilities.
- **State Management:** Advanced React 19 primitive hooks orchestrating a seamless SPA feel within the Next.js ecosystem.

</details>

---

## ⚙️ Quick Start

Want to run Sehat-Suljhao locally? It takes less than 3 minutes.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js `v18.x` or higher
- `npm` or `yarn`

### 2. Installation
Clone the repository and install the God-level dependencies:

```bash
# Clone the repository
git clone https://github.com/Muhammad-Ahmed-Developerr/Sehat-Suljhao.git

# Navigate into the project directory
cd Sehat-Suljhao

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```
Populate the file with your keys:
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
```

### 4. Ignite the Engine
Fire up the local development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` and witness the magic. 🚀

---

## 📂 Project Anatomy

```text
📦 Sehat-Suljhao
 ┣ 📂 app                  # Next.js 15 App Router & API Endpoints
 ┣ 📂 components           
 ┃ ┣ 📂 layout             # Navbar, Footer, Wrappers
 ┃ ┣ 📂 modals             # Disease Detail, Notifications
 ┃ ┣ 📂 sections           # Dashboard, Landing, Chat, Upload Pages
 ┃ ┗ 📂 ui                 # Atomic UI components (Buttons, Cards, Badges)
 ┣ 📂 lib                  # Core logic & Groq/Gemini Architecture
 ┣ 📂 types                # TypeScript strict type definitions
 ┣ 📂 constants            # Mock Data & Static configurations
 ┣ 📜 postcss.config.mjs   # Tailwind & PostCSS Configuration
 ┣ 📜 package.json         # Dependencies & Scripts
 ┗ 📜 README.md            # The blueprint (You are here)
```

---

## 🤝 Contributing

We believe in open-source and community-driven healthcare technology. 
Whether it's a bug fix, a new UI component, or a better AI prompt—your contribution is welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/GodLevelFeature`)
3. Commit your Changes (`git commit -m 'Add some GodLevelFeature'`)
4. Push to the Branch (`git push origin feature/GodLevelFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
Made with ❤️ for a healthier, more informed world.
</div>
