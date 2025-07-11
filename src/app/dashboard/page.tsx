'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNotesStore } from '@/store/notesStore';
import { useTasksStore } from '@/store/tasksStore';
import { NotesTab, TasksTab } from '@/components';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes');
  const fetchNotes = useNotesStore((state) => state.fetchNotes);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchNotes();
      fetchTasks();
    }
  }, [session, fetchNotes, fetchTasks]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-10 blur-3xl animate-floating"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200 to-pink-200 opacity-10 blur-3xl animate-floating" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Enhanced Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-xl border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 btn-glow">
                <span className="text-white font-bold text-lg animate-floating">MW</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-shadow">
                My Workspace
              </h1>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-white rounded-full px-5 py-2 shadow-lg border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-semibold">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">
                  {session.user?.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-100 hover:to-red-200 text-gray-700 hover:text-red-600 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/30 overflow-hidden animate-fade-in-up">
          <div className="border-b border-gray-200/30 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('notes')}
                className={`relative py-6 px-8 font-semibold text-base transition-all duration-300 flex-1 md:flex-none ${
                  activeTab === 'notes'
                    ? 'text-blue-600 border-b-3 border-blue-500 bg-white/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'
                } group`}
              >
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <span className={`text-2xl transition-all duration-300 ${
                    activeTab === 'notes' ? 'scale-110 animate-bounce-in' : 'group-hover:scale-105'
                  }`}>📝</span>
                  <span className="text-shadow">Notes</span>
                </div>
                {activeTab === 'notes' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`relative py-6 px-8 font-semibold text-base transition-all duration-300 flex-1 md:flex-none ${
                  activeTab === 'tasks'
                    ? 'text-green-600 border-b-3 border-green-500 bg-white/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'
                } group`}
              >
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <span className={`text-2xl transition-all duration-300 ${
                    activeTab === 'tasks' ? 'scale-110 animate-bounce-in' : 'group-hover:scale-105'
                  }`}>✅</span>
                  <span className="text-shadow">Tasks</span>
                </div>
                {activeTab === 'tasks' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-full"></div>
                )}
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8 bg-gradient-to-br from-white/50 to-gray-50/50">
            <div className="animate-scale-in">
              {activeTab === 'notes' && <NotesTab />}
              {activeTab === 'tasks' && <TasksTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
