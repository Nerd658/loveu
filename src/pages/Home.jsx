import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Heart, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function Home() {
  const { partner, ideas } = useStore()
  
  // Calcul approximatif des jours (si la date est renseignée)
  let daysTogether = 0
  if (partner.anniversary) {
    const start = new Date(partner.anniversary)
    const now = new Date()
    daysTogether = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  }

  const todoIdeas = ideas.filter(i => i.status === 'todo').length

  return (
    <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      
      <div className="max-w-4xl w-full mx-auto space-y-12 relative z-10">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-widest font-semibold mb-6"
          >
            <Sparkles size={14} />
            <span>Relationship Master</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif italic font-light leading-tight tracking-tight mb-4"
          >
            Pour <span className="text-gold font-medium not-italic">{partner.name || 'ton Amour'}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/60 max-w-xl mx-auto"
          >
            Gérez vos moments, planifiez vos surprises, et devenez la meilleure version de vous-même dans votre couple.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <div className="glass-card p-6 flex flex-col justify-between h-40">
            <div className="text-primary flex items-center justify-between">
              <Calendar size={24} />
              <span className="text-xs uppercase tracking-wider text-foreground/50">Compteur</span>
            </div>
            <div>
              <h2 className="text-3xl font-display font-medium text-foreground">{daysTogether > 0 ? daysTogether : '?'}</h2>
              <p className="text-sm text-foreground/60">Jours ensemble</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 flex flex-col justify-between h-40 border-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)]">
            <div className="text-gold flex items-center justify-between">
              <Heart size={24} />
              <span className="text-xs uppercase tracking-wider text-foreground/50">Langages</span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground truncate">
                {partner.loveLanguages?.length ? partner.loveLanguages[0] : 'Non défini'}
              </h2>
              <p className="text-sm text-foreground/60">Langage principal</p>
            </div>
          </div>

          {/* Card 3 */}
          <Link to="/planning" className="glass-card p-6 flex flex-col justify-between h-40 hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="text-blue-400 flex items-center justify-between">
              <Sparkles size={24} />
              <ArrowRight size={16} className="text-foreground/30 group-hover:text-foreground transition-colors group-hover:translate-x-1" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-medium text-foreground">{todoIdeas}</h2>
              <p className="text-sm text-foreground/60">Surprises planifiées</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
