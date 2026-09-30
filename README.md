Nexus Mail
Nexus Mail is a smart, AI-powered email client designed to supercharge inbox management, automate drafting, and provide intelligent email summarization. Built with a modern, dark-themed interface, it seamlessly integrates the Gmail API with Groq's lightning-fast Llama 3 models to execute natural language commands, draft contextual replies, and auto-categorize incoming threads.

🚀 Key Features
AI-Powered Intelligence
Natural Language Command Bar: Execute complex inbox tasks using plain text (e.g., "Auto-Sort Inbox into Priority and Work", "Mark all newsletters as read").

Smart Reply Generator: Automatically draft contextual replies with customizable tones (Concise, Professional, Friendly) and iterative prompt refinement.

Email Summarization: Instantly generate short or brief bulleted summaries of long email threads directly from the inbox list.

Groq AI Integration: Utilizes llama-3.3-70b-versatile and llama-3.1-8b-instant models with an automated multi-key rotation and fallback strategy to handle rate limits and 413 payload truncation.

Advanced Inbox Management
Dynamic Categorization: Emails are tagged and filtered into folders like Priority, Work, Newsletters, and Receipts with live count badges.

Bulk Actions: Select multiple emails to instantly mark as read, delete, or organize.

Draft Scheduling: Built-in date and time pickers to schedule follow-up emails for future dispatch.

AI Action History: A dedicated analytics dashboard tracking AI automation metrics, including "Time Saved," "Messages Affected," and "Success Rate."

Modern UI/UX
Resizable Panes: Adjustable left sidebar and right-hand AI Writing Studio with drag handles and minimum width constraints.

Floating Assistant Tab: A collapsible right panel with an edge-anchored toggle for quick access to the AI Assistant.

Full Email Modal: Read entire email threads in a clean, scrollable modal without leaving the inbox flow.

Dark Mode Native: A sleek, minimal dark theme utilizing Tailwind CSS and Lucide React icons.

🛠️ Tech Stack & Libraries
Frontend
Framework: React (TypeScript)

Styling: Tailwind CSS

Icons: Lucide React

Routing: React Router (or active view state management)

HTTP Client: Axios

Backend
Environment: Node.js / Express.js

Database: MongoDB (Mongoose for schemas like Draft and ActionHistory)

AI Engine: Groq SDK (groq-sdk)

Email Provider: Google APIs (googleapis, google-auth-library, gaxios)

⚙️ Environment Variables
To run this project locally, create a .env file in your server directory with the following variables:

Code snippet
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Groq API Keys (Supports automatic rotation/fallback)
GROQ_API_KEY_1=your_primary_groq_key
GROQ_API_KEY_2=your_secondary_groq_key
GROQ_API_KEY_3=your_tertiary_groq_key

# Google OAuth (Gmail API)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
💻 Getting Started
1. Clone the repository:

Bash
git clone https://github.com/yourusername/nexus-mail.git
cd nexus-mail
2. Install dependencies:
Navigate to both the client and server directories to install packages.

Bash
# Terminal 1 - Backend
cd server
npm install

# Terminal 2 - Frontend
cd client
npm install
3. Run the application:
Ensure your MongoDB instance is running and your .env variables are configured.

Bash
# Terminal 1 - Start the Express server (typically runs on port 5000)
cd server
npm run dev

# Terminal 2 - Start the React Vite app (typically runs on port 5173)
cd client
npm run dev
4. Authenticate:
Open http://localhost:5173 in your browser. Click the login button to authenticate via Google OAuth and grant Gmail permissions to begin fetching and sending emails.