import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'

export default function Coach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis ton coach en relation amoureuse. Comment puis-je t\'aider aujourd\'hui à devenir un "best" dans ton couple ?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simuler une réponse de l'IA (idéalement à connecter avec un vrai backend LLM)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "C'est une excellente question. La communication est la clé. N'oublie pas d'écouter activement et de valider les émotions de ton/ta partenaire sans chercher à toujours résoudre le problème immédiatement."
      }])
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl flex-1 flex flex-col h-[calc(100vh-4rem)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif italic text-primary">Coach en Relation IA</h1>
        <p className="text-foreground/60 text-sm mt-2">Des conseils sur-mesure pour masteriser ton couple.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gold text-background' : 'bg-primary/20 text-primary'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-gold/10 border border-gold/20 text-gold-light rounded-tr-none' : 'bg-card border border-border rounded-tl-none'}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSend} className="relative mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose-moi une question sur ta relation..."
          className="w-full bg-card border border-border rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-105"
        >
          <Send size={16} className="ml-1" />
        </button>
      </form>
    </div>
  )
}
