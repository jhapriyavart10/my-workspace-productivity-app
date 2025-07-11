'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-20 blur-3xl animate-floating"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-200 to-pink-200 opacity-20 blur-3xl animate-floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-10 blur-3xl animate-floating" style={{animationDelay: '2s'}}></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({length: 64}).map((_, i) => (
              <div 
                key={i} 
                className="border border-blue-300 animate-pulse"
                style={{animationDelay: `${i * 0.1}s`}}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="mb-12 animate-fade-in-up">
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/25 animate-bounce-in btn-glow">
              <span className="text-4xl animate-floating">🚀</span>
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight text-shadow-lg">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">My Workspace</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
              Your personal productivity hub. Organize your thoughts with smart notes, 
              manage tasks efficiently, and leverage AI to boost your productivity.
            </p>
            
            {/* New feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in animate-delay-300">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">✨ AI-Powered</span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">🔒 Secure</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">⚡ Fast</span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">📱 Responsive</span>
            </div>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in animate-delay-400">
            <Link 
              href="/auth/signin"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 btn-glow"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Sign In</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </Link>
            <Link 
              href="/auth/signup"
              className="group relative bg-white/80 hover:bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl border-2 border-blue-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-300 backdrop-blur-sm hover:shadow-blue-500/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Get Started</span>
                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-white/30 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 transform hover:-translate-y-3 card-enhanced animate-fade-in-up animate-delay-100">
              <div className="w-18 h-18 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                <span className="text-4xl animate-floating">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors text-shadow">Smart Notes</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Create, edit, and organize your notes with AI-powered summarization to capture key insights and boost productivity.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                <span className="text-sm">Learn more</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-white/30 hover:shadow-2xl hover:shadow-green-500/15 transition-all duration-500 transform hover:-translate-y-3 card-enhanced md:mt-8 animate-fade-in-up animate-delay-200">
              <div className="w-18 h-18 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                <span className="text-4xl animate-floating" style={{animationDelay: '0.5s'}}>✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors text-shadow">Task Management</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Stay organized with intuitive task management. Track progress, set priorities, and never miss a deadline again.
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                <span className="text-sm">Learn more</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-white/30 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500 transform hover:-translate-y-3 card-enhanced animate-fade-in-up animate-delay-300">
              <div className="w-18 h-18 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                <span className="text-4xl animate-floating" style={{animationDelay: '1s'}}>🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors text-shadow">AI Assistant</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Get intelligent summaries and insights from your notes powered by Google Gemini to enhance understanding.
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                <span className="text-sm">Learn more</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
