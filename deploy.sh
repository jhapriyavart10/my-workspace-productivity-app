#!/bin/bash

# Deployment script for My Workspace
echo "🚀 Starting deployment process..."

# Check if build succeeds
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Check if user wants to deploy to Vercel
echo ""
read -p "Deploy to Vercel? (y/n): " deploy_vercel

if [[ $deploy_vercel =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if command -v vercel &> /dev/null; then
        vercel --prod
    else
        echo "❌ Vercel CLI not found. Installing..."
        npm install -g vercel
        vercel --prod
    fi
fi

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "📋 Post-deployment checklist:"
echo "   ✓ Set environment variables in your platform"
echo "   ✓ Set up production database (MongoDB Atlas)"
echo "   ✓ Test authentication flow"
echo "   ✓ Verify AI features work"
echo ""
echo "🔗 Environment variables needed:"
echo "   • NEXTAUTH_URL=https://your-app-domain.com"
echo "   • NEXTAUTH_SECRET=your-production-secret"
echo "   • MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db"
echo "   • GEMINI_API_KEY=your-gemini-api-key"
