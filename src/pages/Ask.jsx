import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Gem, MapPin, Mail } from 'lucide-react'
import confetti from 'canvas-confetti'

// 1. Curseur Magique (Poussière d'or)
function CursorTrail() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    let particleId = 0
    const handleMove = (e) => {
      // Limiter la création de particules (pas à chaque pixel)
      if (Math.random() > 0.5) return
      
      const x = e.clientX || (e.touches && e.touches[0].clientX)
      const y = e.clientY || (e.touches && e.touches[0].clientY)
      
      if (x === undefined || y === undefined) return

      const newParticle = {
        id: particleId++,
        x,
        y,
        size: Math.random() * 10 + 5,
        color: Math.random() > 0.5 ? '#fde68a' : '#e11d48' // Gold ou Crimson
      }

      setParticles(prev => [...prev.slice(-30), newParticle]) // Garder max 30 particules

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, 800)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              y: p.y - 50 + (Math.random() * 40 - 20),
              x: p.x + (Math.random() * 40 - 20)
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full shadow-[0_0_10px_currentColor]"
            style={{ 
              width: p.size, 
              height: p.size, 
              backgroundColor: p.color,
              color: p.color,
              marginLeft: -p.size/2,
              marginTop: -p.size/2
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function Ask() {
  const [phase, setPhase] = useState('envelope') // 'envelope' | 'opening' | 'question' | 'accepted'
  const [noCount, setNoCount] = useState(0)
  
  const noPhrases = [
    "Non", "Tu es sûre ?", "Vraiment ?", "Penses-y encore !", 
    "Si tu dis non, je vais pleurer...", "Ok j'arrête...", 
    "Je rigole, dis OUI !", "S'il te plaît ❤️", "Tu me brises le cœur", "Impossible de dire non"
  ]

  const yesButtonSize = noCount * 20 + 100
  const noButtonText = noPhrases[Math.min(noCount, noPhrases.length - 1)]

  const handleNo = () => setNoCount(prev => prev + 1)

  const handleYes = () => {
    setPhase('accepted')
    // Effet Explosion de Confettis 3D
    const end = Date.now() + 3 * 1000
    const colors = ['#e11d48', '#fde68a', '#ffffff']

    ;(function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  }

  const openEnvelope = () => {
    if (phase !== 'envelope') return
    setPhase('opening')
    setTimeout(() => setPhase('question'), 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden font-sans">
      <CursorTrail />

      {/* Lueur de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Phase 1 & 2 : L'Enveloppe Secrète */}
      <AnimatePresence mode="wait">
        {(phase === 'envelope' || phase === 'opening') && (
          <motion.div
            key="envelope-container"
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="relative cursor-pointer group perspective-[1000px]"
            onClick={openEnvelope}
          >
            <motion.div 
              className="text-center mb-8 absolute -top-20 left-1/2 -translate-x-1/2 w-full"
              animate={phase === 'envelope' ? { y: [0, -10, 0] } : { opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p className="text-gold font-serif italic text-xl tracking-widest">Ouvre-moi</p>
            </motion.div>

            {/* Corps de l'enveloppe */}
            <div className="relative w-80 h-56 bg-card border border-border shadow-[0_0_50px_rgba(225,29,72,0.1)] rounded-md flex items-center justify-center overflow-visible">
              
              {/* Le Rabat Supérieur (Top Flap) */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full origin-top z-30 drop-shadow-xl"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: phase === 'opening' ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ 
                  clipPath: 'polygon(0 0, 50% 50%, 100% 0)', 
                  backgroundColor: '#0a0a0a',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}
              />

              {/* La Lettre (Glisse vers le haut) */}
              <motion.div 
                className="absolute w-[90%] h-[90%] bg-white rounded-sm z-20 flex flex-col items-center justify-center text-black shadow-inner"
                initial={{ y: 0 }}
                animate={{ y: phase === 'opening' ? -150 : 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                <Heart className="text-primary mb-2 fill-primary/20" size={32} />
                <p className="font-serif italic font-semibold text-lg">Pour toi...</p>
              </motion.div>

              {/* Les autres rabats (Gorge de l'enveloppe) */}
              <div 
                className="absolute inset-0 z-20 bg-background/50 backdrop-blur-[2px]"
                style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)' }}
              />
              {/* Cachet rouge centré */}
              <motion.div 
                className="absolute z-40 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground/20"
                animate={phase === 'opening' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="text-white" size={20} />
              </motion.div>

            </div>
          </motion.div>
        )}

        {/* Phase 3 : La Question (Ask Out) */}
        {phase === 'question' && (
          <motion.div 
            key="question-container"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-2xl text-center z-10 flex flex-col items-center px-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase tracking-widest font-semibold mb-6 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
              <Gem size={14} />
              <span>Proposition Spéciale</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif italic font-light leading-tight mb-12">
              Veux-tu sortir <br/>avec moi ce week-end ?
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full relative min-h-[200px]">
              {/* Bouton OUI */}
              <motion.button
                className="bg-primary text-white font-medium rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.8)] flex items-center justify-center transition-colors z-20"
                style={{ 
                  width: Math.min(yesButtonSize, 350), 
                  height: Math.min(yesButtonSize / 2.5, 150),
                  fontSize: Math.min(yesButtonSize / 6, 48)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
              >
                Oui
              </motion.button>

              {/* Bouton NON */}
              <motion.button
                className="absolute md:relative bg-card border border-border text-foreground font-medium rounded-xl px-8 py-4 transition-all whitespace-nowrap z-10"
                onClick={handleNo}
                onMouseEnter={handleNo}
                onTouchStart={handleNo}
                style={{
                  transform: `scale(${Math.max(1 - noCount * 0.1, 0.2)})`,
                  opacity: Math.max(1 - noCount * 0.1, 0)
                }}
                animate={noCount > 0 ? {
                  x: (Math.random() - 0.5) * 150 * noCount,
                  y: (Math.random() - 0.5) * 100 * noCount
                } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {noButtonText}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Phase 4 : Accepté (Succès) */}
        {phase === 'accepted' && (
          <motion.div 
            key="success-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center space-y-6 max-w-lg glass-card p-12 z-20"
          >
            <div className="flex justify-center text-primary mb-4">
              <Heart size={64} className="fill-primary animate-pulse drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]" />
            </div>
            <h1 className="text-4xl font-serif italic text-gold">Parfait ! ✨</h1>
            <p className="text-xl font-light text-foreground/80">
              Prépare-toi, ça va être incroyable.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mt-4 border border-primary/20">
              <MapPin size={16} />
              <span className="text-sm">Le lieu et l'heure te seront communiqués très bientôt.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
