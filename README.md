# 🚀 AI Code Reviewer

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
An intelligent, full-stack code analysis tool that not only identifies issues in your code but also provides **one-click automated fixes**. Powered by **Mistral AI** and built with a premium, high-performance developer experience in mind.


## 🌟 Key Features

- **Senior AI Persona**: Feedback is provided by a simulated Senior Developer (7+ years exp) focusing on security, performance, and scalability.
- **⚡ One-Click Fixes**: Don't just read about errors—fix them instantly. Our "Apply Recommended Fixes" feature swaps your code with AI-improved versions in one click.
- **Premium UI/UX**: Overhauled with an ultra-dark navy theme, glowing gradient borders, and sleek typography.
- **Shimmering Skeleton Screens**: A top-tier loading experience that perfectly predicts the AI's response layout while you wait.
- **Keyboard Shortcuts**: Productivity-first design with `Ctrl + Enter` for instant reviews.
- **Traffic Analytics**: Integrated natively with `@vercel/analytics` to monitor real-time usage.
- **Rate Limiting & Abuse Prevention**: Backend IP tracking via `express-rate-limit` prevents spam and API quota exhaustion.
- **Guardrails & Security**: Built-in protection against prompt injection and off-topic requests.
## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Editor**: `react-simple-code-editor`
- **Highlighting**: PrismJS & `rehype-highlight`
- **Analytics**: Vercel Analytics (`@vercel/analytics`)

### Backend
- **Server**: Node.js & Express
- **AI Engine**: Mistral AI SDK (`mistral-small-latest`)
- **Security**: `express-rate-limit` (IP-based rate limiting)
- **Environment**: Dotenv for secure configuration
- **CORS**: Configured for secure cross-origin communication

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- Mistral AI API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/talhaaa16/AI-code-review.git
   cd AI-code-review
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file
   echo "MISTRAL_API_KEY=your_key_here" > .env
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file (for production)
   echo "VITE_API_URL=http://localhost:7011" > .env
   npm run dev
   ```

## ⚙️ Configuration

### Backend `.env`
| Variable | Description |
|----------|-------------|
| `MISTRAL_API_KEY` | Your secret Mistral AI API key |

### Frontend `.env`
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | The URL of your running backend (Local or Vercel) |

## 🛡️ Security & Privacy
This application uses strict guardrails. It identifies and rejects non-technical chat requests and focus exclusively on code review tasks to ensure API efficiency and security.

