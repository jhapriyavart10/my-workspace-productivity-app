'use client';

import { useState } from 'react';
import { useTasksStore } from '@/store/tasksStore';
import { Task } from '@/types';

export default function TasksTab() {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } = useTasksStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    try {
      if (editingTask) {
        await updateTask(editingTask._id, { title, description });
        setEditingTask(null);
      } else {
        await addTask({ title, description, completed: false });
      }
      
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

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
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 animate-floating">
            <span className="text-white text-2xl">✅</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent text-shadow">Tasks</h2>
            <p className="text-gray-600 text-sm">Stay organized and boost your productivity</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{pendingTasks.length} pending</span>
              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{completedTasks.length} completed</span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">🎯 Goal Tracker</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-green-500/30 flex items-center space-x-2 btn-glow"
        >
          <span className="text-lg group-hover:rotate-180 transition-transform duration-300">+</span>
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-200/50 shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm font-semibold text-blue-800">Total Tasks</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 backdrop-blur-sm p-6 rounded-2xl border border-yellow-200/50 shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">⏳</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">{pendingTasks.length}</div>
              <div className="text-sm font-semibold text-yellow-800">Pending</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-6 rounded-2xl border border-green-200/50 shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🎉</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{completedTasks.length}</div>
              <div className="text-sm font-semibold text-green-800">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm p-8 rounded-2xl border border-green-200/50 shadow-xl animate-bounce-in">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                placeholder="Add more details..."
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {editingTask ? '✏️ Update Task' : '💾 Save Task'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl opacity-50">✅</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-6">Create your first task to start organizing your work!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Create First Task
          </button>
        </div>
      )}

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⏳</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pending Tasks</h3>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">{pendingTasks.length}</span>
          </div>
          <div className="grid gap-4">
            {pendingTasks.map((task, index) => (
              <div 
                key={task._id} 
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTask(task._id)}
                    className="mt-1 w-6 h-6 border-2 border-gray-300 rounded-lg hover:border-green-500 transition-all duration-200 flex items-center justify-center group-hover:scale-110"
                  >
                    <div className="w-3 h-3 bg-transparent group-hover:bg-green-100 rounded transition-all duration-200"></div>
                  </button>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-600 mb-3 leading-relaxed bg-gray-50/50 p-3 rounded-lg">{task.description}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <span>📅</span>
                      <span className="ml-1">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Completed Tasks</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{completedTasks.length}</span>
          </div>
          <div className="grid gap-4">
            {completedTasks.map((task, index) => (
              <div 
                key={task._id} 
                className="group bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-6 rounded-2xl border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-500 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTask(task._id)}
                    className="mt-1 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 border-2 border-green-500 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center shadow-lg group-hover:scale-110"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-700 text-lg mb-2 line-through">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-500 mb-3 line-through leading-relaxed bg-white/50 p-3 rounded-lg">{task.description}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <span>🎉</span>
                      <span className="ml-1">Completed: {new Date(task.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
