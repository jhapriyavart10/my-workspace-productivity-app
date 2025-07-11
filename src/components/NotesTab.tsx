'use client';

import { useState } from 'react';
import { useNotesStore } from '@/store/notesStore';
import { Note } from '@/types';

export default function NotesTab() {
  const { notes, loading, addNote, updateNote, deleteNote, summarizeNote } = useNotesStore();
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summaryLoading, setSummaryLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingNote) {
        await updateNote(editingNote._id, { title, content });
        setEditingNote(null);
      } else {
        await addNote({ title, content });
      }
      
      setTitle('');
      setContent('');
      setShowForm(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  const handleSummarize = async (noteId: string) => {
    setSummaryLoading(noteId);
    try {
      await summarizeNote(noteId);
    } catch (error) {
      console.error('Error summarizing note:', error);
    } finally {
      setSummaryLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 animate-floating">
            <span className="text-white text-2xl">📝</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent text-shadow">Notes</h2>
            <p className="text-gray-600 text-sm">Organize your thoughts with AI-powered insights</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{notes.length} notes</span>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">✨ AI Enhanced</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 flex items-center space-x-2 btn-glow"
        >
          <span className="text-lg group-hover:rotate-180 transition-transform duration-300">+</span>
          <span>Add Note</span>
        </button>
      </div>

      {/* Enhanced Add/Edit Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm p-8 rounded-3xl border border-blue-200/50 shadow-2xl shadow-blue-500/10 animate-scale-in card-enhanced">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-lg animate-floating">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-shadow">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h3>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-blue-500">📌</span>
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md focus-enhanced"
                placeholder="Enter a compelling title..."
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-purple-500">✍️</span>
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none shadow-sm hover:shadow-md focus-enhanced"
                placeholder="Share your thoughts and ideas..."
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl btn-glow"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{editingNote ? '✏️' : '💾'}</span>
                  <span>{editingNote ? 'Update Note' : 'Save Note'}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Enhanced Notes List */}
      <div className="space-y-6">
        {notes.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-floating">
              <span className="text-6xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-shadow">No notes yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">Create your first note to get started on your productivity journey! Capture ideas, thoughts, and insights with AI-powered enhancements.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg btn-glow"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <span>Create First Note</span>
              </span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {notes.map((note, index) => (
              <div 
                key={note._id} 
                className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 card-enhanced animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📝</span>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-shadow">{note.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Created {new Date(note.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleSummarize(note._id)}
                      disabled={summaryLoading === note._id}
                      className="bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center space-x-2 shadow-md"
                    >
                      <span className={summaryLoading === note._id ? 'animate-spin' : ''}>🤖</span>
                      <span>{summaryLoading === note._id ? 'Summarizing...' : 'AI Summary'}</span>
                    </button>
                    <button
                      onClick={() => handleEdit(note)}
                      className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      <span className="flex items-center gap-1">
                        <span>✏️</span>
                        <span>Edit</span>
                      </span>
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      <span className="flex items-center gap-1">
                        <span>🗑️</span>
                        <span>Delete</span>
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="text-gray-700 mb-6 leading-relaxed whitespace-pre-wrap bg-gradient-to-br from-gray-50/80 to-blue-50/80 p-6 rounded-2xl border border-gray-100 shadow-inner">
                  {note.content}
                </div>
                
                {note.aiSummary && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border-l-4 border-purple-400 mb-4 animate-bounce-in">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">🤖</span>
                      <h4 className="text-sm font-bold text-purple-900">AI Summary</h4>
                    </div>
                    <p className="text-purple-800 leading-relaxed">{note.aiSummary}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>Created: {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{note.content.split(' ').length} words</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
