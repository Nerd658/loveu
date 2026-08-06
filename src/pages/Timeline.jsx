import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'
import { CalendarHeart, MapPin, Camera, Star, Heart, Calendar } from 'lucide-react'

// Mapping icon string to Lucide component
const iconMap = {
  CalendarHeart,
  MapPin,
  Camera,
  Star,
  Heart,
  Calendar
}

export default function Timeline() {
  const { memories } = useStore()
  
  // Sort by date desc (simplified for this example)
  const sortedMemories = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif italic font-light mb-4 text-gold">Notre Histoire</h1>
        <p className="text-foreground/60 font-light">Chaque moment précieux, gravé à jamais.</p>
      </div>

      <div className="relative border-l border-border/50 ml-4 md:ml-8 space-y-12 pb-12">
        {sortedMemories.map((mem, i) => {
          const Icon = iconMap[mem.icon] || Heart
          const colorClass = i % 2 === 0 ? 'from-primary to-rose-400' : 'from-gold to-yellow-300'
          
          return (
            <motion.div 
              key={mem.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]`}>
                <Icon size={14} className="text-white" />
              </div>

              {/* Content Card */}
              <div className="glass-card p-6 group hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-medium">{mem.title}</h3>
                  <span className="text-xs font-display tracking-widest text-gold/80 uppercase px-3 py-1 bg-gold/10 rounded-full w-fit">
                    {new Date(mem.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-foreground/70 font-light leading-relaxed mb-4">
                  {mem.description}
                </p>
                {mem.location && (
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <MapPin size={12} />
                    <span>{mem.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
        {memories.length === 0 && (
          <div className="pl-8 text-foreground/50 italic">Aucun souvenir ajouté pour le moment...</div>
        )}
      </div>
    </div>
  )
}
