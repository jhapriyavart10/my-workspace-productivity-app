# My Workspace - Personal Productivity App

A modern fullstack productivity application built with Next.js 15, featuring AI-powered note summarization and task management. Deployed on Vercel with MongoDB Atlas.

🔗 **Live Demo**: [https://dume-ai.vercel.app](https://dume-ai.vercel.app)

## 🚀 Features

- **🔐 Authentication**: Secure email/password authentication with NextAuth.js
- **📝 Smart Notes**: Create, edit, delete, and organize notes with AI-powered summarization
- **✅ Task Management**: Track tasks with completion status and priority
- **🤖 AI Integration**: Get intelligent summaries using Google Gemini API
- **📱 Responsive Design**: Modern, animated UI built with Tailwind CSS
- **⚡ Real-time Updates**: State management with Zustand for seamless experience
- **🎨 Enhanced UI**: Beautiful animations, gradients, and modern design elements

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: NextAuth.js with credentials provider
- **State Management**: Zustand
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom animations

## 🎨 UI Features

- **Modern Design**: Glass morphism effects, gradients, and smooth animations
- **Interactive Elements**: Hover effects, scale transforms, and smooth transitions
- **Enhanced Typography**: Gradient text effects and text shadows
- **Responsive Layout**: Mobile-first design with flexible layouts
- **Custom Animations**: Fade-in, bounce, float, and shimmer effects

## 🚀 Deployment

This app is deployed on Vercel and uses MongoDB Atlas for the database.

### Live Demo
- **URL**: [https://dume-ai.vercel.app](https://dume-ai.vercel.app)
- **Database**: MongoDB Atlas (Cloud)
- **Hosting**: Vercel

### Environment Variables for Production
```env
NEXTAUTH_URL=https://your-app-url.vercel.app
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/my-workspace?retryWrites=true&w=majority
GEMINI_API_KEY=your-gemini-api-key
```

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-workspace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/my-workspace
GEMINI_API_KEY=your-gemini-api-key
```

4. Start MongoDB (if running locally):
```bash
# Using MongoDB Community Edition
mongod
```

5. Run the development server:

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── notes/         # Notes CRUD operations
│   │   └── tasks/         # Tasks CRUD operations
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── models/                # Mongoose schemas
├── store/                 # Zustand state management
└── types/                 # TypeScript type definitions
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Base URL for NextAuth.js | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Optional |

## 🚀 Usage

1. **Sign Up**: Create a new account or sign in with existing credentials
2. **Dashboard**: Access your personal workspace with notes and tasks
3. **Notes**: Create, edit, and manage your notes with AI summarization
4. **Tasks**: Track your to-dos and mark them as complete

## 🤖 AI Features

The app includes AI-powered note summarization using Google's Gemini 1.5 Flash model. If no API key is provided, the app will show a mock summary for demonstration purposes.

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key" in the left sidebar
4. Create a new API key
5. Copy the API key and add it to your `.env.local` file as `GEMINI_API_KEY`

The Gemini API offers generous free usage limits, making it perfect for personal projects.

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT-based authentication with NextAuth.js
- Protected API routes with session validation
- User-specific data isolation
- Input validation and sanitization


