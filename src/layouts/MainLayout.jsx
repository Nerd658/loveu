import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Clock, MessageCircle, CalendarHeart, Settings, Gift } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function MainLayout() {
  const location = useLocation()
  const { partner } = useStore()
  
  const navItems = [
    { path: '/', icon: Heart, label: 'Tableau de bord' },
    { path: '/timeline', icon: Clock, label: 'Souvenirs' },
    { path: '/planning', icon: CalendarHeart, label: 'Projets' },
    { path: '/coach', icon: MessageCircle, label: 'Coach IA' },
    { path: '/ask', icon: Gift, label: 'Inviter' },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-semibold text-lg tracking-widest uppercase text-gold group-hover:text-gold-light transition-colors">
              {partner.name || 'Amour'} ✦
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-2 hover:bg-white/5 ${isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  <Icon size={16} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 border-b-2 border-primary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <Link to="/settings" className="p-2 text-foreground/60 hover:text-foreground transition-colors hover:bg-white/5 rounded-md">
            <Settings size={20} className={location.pathname === '/settings' ? 'text-primary' : ''} />
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col">
        <Outlet />
      </main>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border flex justify-around p-3 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-primary' : 'text-foreground/50 hover:text-foreground'}`}
            >
              <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
