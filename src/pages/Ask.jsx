import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { Heart, Gem, MapPin, Mail, Sparkles, QrCode } from 'lucide-react'
import confetti from 'canvas-confetti'

// 1. Curseur Magique
function CursorTrail() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    let particleId = 0
    const handleMove = (e) => {
      if (Math.random() > 0.4) return
      const x = e.clientX || (e.touches && e.touches[0].clientX)
      const y = e.clientY || (e.touches && e.touches[0].clientY)
      if (x === undefined || y === undefined) return

      const newParticle = {
        id: particleId++, x, y,
        size: Math.random() * 10 + 5,
        color: Math.random() > 0.5 ? '#fde68a' : '#e11d48'
      }
      setParticles(prev => [...prev.slice(-30), newParticle])
      setTimeout(() => setParticles(prev => prev.filter(p => p.id !== newParticle.id)), 800)
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
            animate={{ opacity: 0, scale: 0, y: p.y - 50 + (Math.random() * 40 - 20), x: p.x + (Math.random() * 40 - 20) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full shadow-[0_0_10px_currentColor]"
            style={{ width: p.size, height: p.size, backgroundColor: p.color, color: p.color, marginLeft: -p.size/2, marginTop: -p.size/2 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Helper pour des sons simples (Web Audio API)
const playTone = (type = 'sine', freq = 440, duration = 0.2, vol = 0.1) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) { /* ignore si non supporté */ }
}

export default function Ask() {
  const [phase, setPhase] = useState('envelope') 
  const [noCount, setNoCount] = useState(0)
  
  // Gyroscope / Souris Parallax
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30 // max 15deg
      const y = (e.clientY / window.innerHeight - 0.5) * -30 
      rotateX.set(y)
      rotateY.set(x)
    }
    const handleDeviceOrientation = (e) => {
      if (e.beta && e.gamma) {
        rotateX.set(Math.max(-20, Math.min(20, e.beta - 45)))
        rotateY.set(Math.max(-20, Math.min(20, e.gamma)))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('deviceorientation', handleDeviceOrientation)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [rotateX, rotateY])
  
  const noPhrases = [
    "Non", "Tu es sûre ?", "Vraiment ?", "Penses-y encore !", 
    "L'écran devient sombre...", "Ok j'arrête...", 
    "Je rigole, dis OUI !", "S'il te plaît ❤️", "Tu me brises le cœur", "Impossible"
  ]

  const yesButtonSize = noCount * 20 + 100
  const noButtonText = noPhrases[Math.min(noCount, noPhrases.length - 1)]

  const handleNo = () => {
    setNoCount(prev => prev + 1)
    playTone('square', 150 - noCount * 10, 0.2, 0.05) // Son grave qui descend
  }

  const handleYes = () => {
    setPhase('accepted')
    playTone('sine', 600, 0.5, 0.1)
    setTimeout(() => playTone('sine', 800, 1, 0.1), 150)
    
    const end = Date.now() + 4 * 1000
    const colors = ['#e11d48', '#fde68a', '#ffffff']

    ;(function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }())
  }

  const openEnvelope = () => {
    if (phase !== 'envelope') return
    playTone('sine', 400, 0.3, 0.05)
    setPhase('opening')
    setTimeout(() => setPhase('question'), 1500)
  }

  // Climat dynamique : plus on dit non, plus le fond devient sombre et rouge
  const darkness = Math.min(noCount * 10, 80)
  const bgGradient = phase === 'accepted' 
    ? 'radial-gradient(circle at center, rgba(201,168,76,0.2) 0%, rgba(3,3,3,1) 100%)' 
    : `radial-gradient(circle at center, rgba(${225 - darkness}, 29, 72, ${0.1 + noCount*0.02}) 0%, rgba(3,3,3,1) 100%)`

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[100dvh] relative overflow-hidden font-sans transition-colors duration-1000"
      style={{ background: bgGradient }}
    >
      <CursorTrail />

      <motion.div 
        className="relative z-10 w-full max-w-2xl px-4 flex justify-center items-center perspective-[1200px]"
      >
        <motion.div 
          style={{ rotateX, rotateY }} 
          className="w-full flex justify-center items-center"
        >
          <AnimatePresence mode="wait">
            
            {/* L'Enveloppe Secrète */}
            {(phase === 'envelope' || phase === 'opening') && (
              <motion.div
                key="envelope-container"
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.8 }}
                className="relative cursor-pointer group"
                onClick={openEnvelope}
              >
                <motion.div 
                  className="text-center mb-8 absolute -top-20 left-1/2 -translate-x-1/2 w-full"
                  animate={phase === 'envelope' ? { y: [0, -10, 0] } : { opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <p className="text-gold font-serif italic text-xl tracking-widest drop-shadow-[0_0_10px_rgba(201,168,76,0.8)]">Ouvre-moi</p>
                </motion.div>

                <div className="relative w-80 h-56 bg-card border border-border shadow-[0_20px_50px_rgba(225,29,72,0.15)] rounded-md flex items-center justify-center overflow-visible">
                  {/* Rabat Supérieur */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full origin-top z-30 drop-shadow-xl"
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: phase === 'opening' ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                  />

                  {/* La Lettre */}
                  <motion.div 
                    className="absolute w-[90%] h-[90%] bg-zinc-100 rounded-sm z-20 flex flex-col items-center justify-center text-black shadow-inner"
                    initial={{ y: 0 }}
                    animate={{ y: phase === 'opening' ? -150 : 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  >
                    <Heart className="text-primary mb-2 fill-primary/20" size={32} />
                    <p className="font-serif italic font-semibold text-lg text-zinc-800">Pour toi...</p>
                  </motion.div>

                  <div className="absolute inset-0 z-20 bg-background/50 backdrop-blur-[2px]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)' }} />
                  
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

            {/* La Question */}
            {phase === 'question' && (
              <motion.div 
                key="question-container"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full text-center z-10 flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase tracking-widest font-semibold mb-6 shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                  <Gem size={14} />
                  <span>Proposition Spéciale</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-serif italic font-light leading-tight mb-12 drop-shadow-md">
                  Veux-tu sortir <br/>avec moi ce week-end ?
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full relative min-h-[200px]">
                  {/* OUI */}
                  <motion.button
                    className="bg-primary text-white font-medium rounded-2xl shadow-[0_0_40px_rgba(225,29,72,0.6)] hover:shadow-[0_0_60px_rgba(225,29,72,0.9)] flex items-center justify-center transition-colors z-20 relative overflow-hidden group"
                    style={{ 
                      width: Math.min(yesButtonSize, 350), 
                      height: Math.min(yesButtonSize / 2.5, 150),
                      fontSize: Math.min(yesButtonSize / 6, 48)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                  >
                    <span className="relative z-10">Oui</span>
                    {/* Brillance interne */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  </motion.button>

                  {/* NON */}
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
                      y: (Math.random() - 0.5) * 150 * noCount
                    } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {noButtonText}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Le Golden Ticket (VIP Date Pass) */}
            {phase === 'accepted' && (
              <motion.div 
                key="ticket-container"
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                className="w-full max-w-md relative"
              >
                {/* Structure du Ticket */}
                <div className="w-full bg-gradient-to-br from-gold-dark via-gold to-gold-light p-[2px] rounded-2xl shadow-[0_0_50px_rgba(201,168,76,0.4)]">
                  <div className="bg-card w-full rounded-2xl overflow-hidden flex flex-col">
                    
                    {/* Header Ticket */}
                    <div className="bg-gold/10 p-6 border-b border-gold/20 flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[30px] rounded-full translate-x-1/2 -translate-y-1/2" />
                      <div>
                        <h2 className="text-2xl font-display text-gold uppercase tracking-widest font-bold">VIP Date Pass</h2>
                        <p className="text-xs text-gold/70 font-mono mt-1">ADMIT ONE ✦ EXCLUSIVE EVENT</p>
                      </div>
                      <Sparkles className="text-gold" size={28} />
                    </div>

                    {/* Corps du Ticket */}
                    <div className="p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                      <div className="text-center">
                        <Heart size={48} className="mx-auto text-primary fill-primary/20 mb-4 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
                        <h3 className="text-3xl font-serif italic text-white mb-2">Réservation Confirmée</h3>
                        <p className="text-foreground/70 text-sm font-light">Prépare-toi pour un moment inoubliable.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-b border-border/50 py-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Date</p>
                          <p className="font-mono text-sm text-gold-light">Ce Week-End</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Lieu</p>
                          <p className="font-mono text-sm text-gold-light flex items-center gap-1">
                            <MapPin size={12} /> Secret
                          </p>
                        </div>
                      </div>

                      {/* Code Barre stylisé */}
                      <div className="flex justify-between items-end pt-2">
                        <div className="flex gap-1 h-12 items-end opacity-80">
                          {[30,40,20,48,15,40,35,48,20,30,48,10,25].map((h, i) => (
                            <div key={i} className="w-1.5 bg-foreground/80 rounded-t-sm" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                        <QrCode size={40} className="text-gold/80" />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
