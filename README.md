# My Workspace - Personal Productivity App

A fullstack Next.js productivity application that allows users to manage notes and tasks with AI-powered features. Built with modern technologies including Next.js 15, TypeScript, MongoDB, and OpenAI integration.

## 🚀 Features

- **Authentication**: Secure email/password authentication with NextAuth.js
- **Notes Management**: Create, edit, delete, and organize notes
- **AI Summarization**: Get intelligent summaries of your notes using Google Gemini
- **Task Management**: Track tasks with completion status
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: State management with Zustand for seamless experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with credentials provider
- **State Management**: Zustand
- **AI Integration**: Google Gemini API for note summarization

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

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Option 1: Vercel (Recommended)

Vercel is the easiest option for Next.js apps and offers excellent integration:

1. **Prepare for deployment:**
```bash
npm run build  # Test local build
```

2. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts to link your project
```

3. **Set environment variables in Vercel:**
- Go to your project dashboard on vercel.com
- Navigate to Settings → Environment Variables
- Add all your environment variables:
  - `NEXTAUTH_URL` (e.g., `https://your-app.vercel.app`)
  - `NEXTAUTH_SECRET`
  - `MONGODB_URI`
  - `GEMINI_API_KEY`

### Option 2: Railway

Railway offers easy deployment with database hosting:

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Deploy:**
```bash
railway login
railway init
railway up
```

3. **Add MongoDB:**
```bash
railway add mongodb
```

### Option 3: Netlify

1. **Build the app:**
```bash
npm run build
```

2. **Deploy via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### Option 4: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

Then deploy:
```bash
docker build -t my-workspace .
docker run -p 3000:3000 my-workspace
```

### Database Options for Production

#### MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in your environment variables

#### Railway MongoDB
```bash
railway add mongodb
# Get connection string from Railway dashboard
```

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NEXTAUTH_URL=https://your-deployed-app.com
NEXTAUTH_SECRET=your-super-secret-key-for-production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/my-workspace
GEMINI_API_KEY=your-gemini-api-key
```

### Pre-deployment Checklist

- [ ] Test local build: `npm run build && npm start`
- [ ] Set up production database (MongoDB Atlas)
- [ ] Configure all environment variables
- [ ] Test authentication flow
- [ ] Verify AI features work with production API keys

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
