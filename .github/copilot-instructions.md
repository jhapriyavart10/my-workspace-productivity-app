# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js fullstack productivity app called "My Workspace" with the following features:

## Tech Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with credentials provider
- **State Management**: Zustand
- **AI Integration**: Google Gemini API for note summarization

## Project Structure
- `/src/app` - App Router pages and layouts
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions, database connection, auth config
- `/src/models` - Mongoose schemas
- `/src/store` - Zustand state management
- `/src/types` - TypeScript type definitions

## Key Features
1. **Authentication**: Email/password signup/login with NextAuth.js
2. **Dashboard**: Protected route with notes and tasks management
3. **Notes**: CRUD operations with AI summarization
4. **Tasks**: Task management with completion tracking
5. **Responsive UI**: Modern design with Tailwind CSS

## Development Guidelines
- Use TypeScript for all files
- Follow Next.js App Router conventions
- Use server components where possible, client components only when needed
- Implement proper error handling and loading states
- Ensure responsive design for all components
- Use proper authentication middleware for protected routes
