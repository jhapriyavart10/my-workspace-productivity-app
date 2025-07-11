@echo off
echo 🚀 Starting deployment process...

REM Check if build succeeds
echo 📦 Building application...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful!

echo.
set /p deploy_vercel="Deploy to Vercel? (y/n): "

if /i "%deploy_vercel%"=="y" (
    echo 🚀 Deploying to Vercel...
    
    REM Check if Vercel CLI is installed
    where vercel >nul 2>nul
    if %errorlevel% neq 0 (
        echo ❌ Vercel CLI not found. Installing...
        call npm install -g vercel
    )
    
    call vercel --prod
)

echo.
echo 🎉 Deployment process completed!
echo.
echo 📋 Post-deployment checklist:
echo    ✓ Set environment variables in your platform
echo    ✓ Set up production database (MongoDB Atlas)
echo    ✓ Test authentication flow
echo    ✓ Verify AI features work
echo.
echo 🔗 Environment variables needed:
echo    • NEXTAUTH_URL=https://your-app-domain.com
echo    • NEXTAUTH_SECRET=your-production-secret
echo    • MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
echo    • GEMINI_API_KEY=your-gemini-api-key
echo.
pause
