import { create } from 'zustand';
import { NotesState } from '@/types';

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const notes = await response.json();
        set({ notes, loading: false });
      } else {
        set({ loading: false });
        throw new Error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      set({ loading: false });
    }
  },

  addNote: async (noteData) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const newNote = await response.json();
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      } else {
        throw new Error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  updateNote: async (id, updates) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        set((state) => ({
          notes: state.notes.map((note) =>
            note._id === id ? updatedNote : note
          ),
        }));
      } else {
        throw new Error('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        set((state) => ({
          notes: state.notes.filter((note) => note._id !== id),
        }));
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  summarizeNote: async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}/summarize`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedNote = await response.json();
        set((state) => ({
          notes: state.notes.map((note) =>
            note._id === id ? updatedNote : note
          ),
        }));
      } else {
        throw new Error('Failed to summarize note');
      }
    } catch (error) {
      console.error('Error summarizing note:', error);
      throw error;
    }
  },
}));
