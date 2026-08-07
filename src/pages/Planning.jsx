import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'
import { Plus, Check, Clock, Calendar, Gift, Heart, Coffee } from 'lucide-react'
import { useState } from 'react'

export default function Planning() {
  const { ideas, addIdea, updateIdeaStatus } = useStore()
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Date')

  const categories = {
    'Date': { icon: Coffee, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    'Cadeau': { icon: Gift, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    'Voyage': { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'Attention': { icon: Heart, color: 'text-primary', bg: 'bg-primary/10' },
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    addIdea({
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      status: 'todo'
    })
    setNewTitle('')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic text-primary mb-2">Projets & Idées</h1>
        <p className="text-foreground/60 font-light">Organise vos futures expériences et cadeaux.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Formulaire d'ajout */}
        <div className="md:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Plus size={18} className="text-gold" />
              Nouvelle idée
            </h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs text-foreground/50 mb-1 block">Description</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Dîner italien..."
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:border-primary/50 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-foreground/50 mb-1 block">Catégorie</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(categories).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`text-xs px-2 py-2 rounded-md border flex items-center gap-2 transition-colors ${newCategory === cat ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:bg-white/5'}`}
                    >
                      <div className={`shrink-0 ${categories[cat].color}`}>{categories[cat].icon({ size: 14 })}</div>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full vercel-btn justify-center mt-2">
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* Liste des idées */}
        <div className="md:col-span-2 space-y-4">
          {ideas.map((idea, i) => {
            const cat = categories[idea.category] || categories['Date']
            const Icon = cat.icon
            const isDone = idea.status === 'done'

            return (
              <motion.div 
                key={idea.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-4 flex items-center gap-4 transition-all ${isDone ? 'opacity-50' : ''}`}
              >
                <div className={`p-3 rounded-full ${cat.bg} ${cat.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${isDone ? 'line-through text-foreground/50' : ''}`}>{idea.title}</h3>
                  <span className="text-xs text-foreground/50 uppercase tracking-wider">{idea.category}</span>
                </div>
                <button 
                  onClick={() => updateIdeaStatus(idea.id, isDone ? 'todo' : 'done')}
                  className={`p-2 rounded-full border transition-colors ${isDone ? 'bg-primary/20 border-primary text-primary' : 'border-border text-foreground/40 hover:text-foreground hover:bg-white/5'}`}
                >
                  {isDone ? <Check size={16} /> : <Clock size={16} />}
                </button>
              </motion.div>
            )
          })}
          {ideas.length === 0 && (
            <div className="text-center text-foreground/40 py-12 border border-dashed border-border rounded-xl">
              Aucune idée pour le moment. Surprenez votre partenaire !
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
