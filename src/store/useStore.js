import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      partner: {
        name: 'Mon Amour',
        nickname: '',
        anniversary: '',
        loveLanguages: [],
        avatar: '',
      },
      memories: [
        { id: '1', date: '2024-01-01', title: 'Notre rencontre', description: 'Le début de tout.', location: '', icon: 'CalendarHeart' }
      ],
      ideas: [
        { id: '1', title: 'Dîner aux chandelles', category: 'Date', status: 'todo' },
        { id: '2', title: 'Voyage surprise', category: 'Voyage', status: 'todo' }
      ],
      
      updatePartner: (data) => set((state) => ({ partner: { ...state.partner, ...data } })),
      addMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
      removeMemory: (id) => set((state) => ({ memories: state.memories.filter(m => m.id !== id) })),
      addIdea: (idea) => set((state) => ({ ideas: [...state.ideas, idea] })),
      updateIdeaStatus: (id, status) => set((state) => ({ 
        ideas: state.ideas.map(i => i.id === id ? { ...i, status } : i) 
      })),
    }),
    {
      name: 'loveu-storage',
    }
  )
)
