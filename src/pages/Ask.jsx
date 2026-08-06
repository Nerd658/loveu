import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, MapPin } from 'lucide-react'

export default function Ask() {
  const [noCount, setNoCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  
  // Textes progressifs pour le bouton "Non"
  const noPhrases = [
    "Non",
    "Tu es sûre ?",
    "Vraiment ?",
    "Penses-y encore !",
    "Si tu dis non, je vais être triste...",
    "Je vais être TRÈS triste...",
    "Je vais pleurer...",
    "Ok j'arrête de demander...",
    "Je rigole, dis OUI !",
    "S'il te plaît ❤️",
    "Tu me brises le cœur",
    "Non, c'est impossible"
  ]

  const yesButtonSize = noCount * 20 + 100 // Le bouton OUI grandit
  const noButtonText = noPhrases[Math.min(noCount, noPhrases.length - 1)]

  const handleNo = () => {
    setNoCount(prev => prev + 1)
  }

  if (accepted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 h-[calc(100vh-4rem)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-center space-y-6 max-w-lg glass-card p-12"
        >
          <div className="flex justify-center text-primary mb-4">
            <Heart size={64} className="fill-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-serif italic text-gold">Parfait ! ✨</h1>
          <p className="text-xl font-light text-foreground/80">
            Prépare-toi, ça va être incroyable.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mt-4 border border-primary/20">
            <MapPin size={16} />
            <span className="text-sm">Le lieu et l'heure te seront communiqués.</span>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)] overflow-hidden">
      
      <div className="max-w-2xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase tracking-widest font-semibold mb-6">
            <Sparkles size={14} />
            <span>Proposition Spéciale</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif italic font-light leading-tight mb-4">
            Veux-tu sortir <br/>avec moi ce week-end ?
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-8 relative min-h-[200px]">
          {/* Bouton OUI */}
          <motion.button
            className="bg-primary text-white font-medium rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] flex items-center justify-center transition-colors"
            style={{ 
              width: Math.min(yesButtonSize, 300), 
              height: Math.min(yesButtonSize / 2.5, 120),
              fontSize: Math.min(yesButtonSize / 6, 48)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAccepted(true)}
          >
            Oui
          </motion.button>

          {/* Bouton NON */}
          <motion.button
            className="bg-card border border-border text-foreground font-medium rounded-xl px-8 py-4 transition-all whitespace-nowrap"
            onClick={handleNo}
            onMouseEnter={handleNo}
            // Quand le bouton Oui devient trop gros, on cache presque le bouton non ou on le fait rétrécir
            style={{
              transform: `scale(${Math.max(1 - noCount * 0.1, 0.2)})`,
              opacity: Math.max(1 - noCount * 0.1, 0)
            }}
            animate={noCount > 0 ? {
              x: (Math.random() - 0.5) * 100 * noCount, // Déplacement aléatoire léger
              y: (Math.random() - 0.5) * 50 * noCount
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {noButtonText}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
