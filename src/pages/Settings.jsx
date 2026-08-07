import { useStore } from '../store/useStore'
import { User, Calendar as CalendarIcon, Heart, Save } from 'lucide-react'

export default function Settings() {
  const { partner, updatePartner } = useStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation ou animations additionnelles possibles ici
    alert('Profil sauvegardé !')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif italic text-gold mb-2">Profil du Partenaire</h1>
        <p className="text-foreground/60 text-sm font-light">Personnalisez l'application pour votre moitié.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-foreground/70 mb-1 flex items-center gap-2">
              <User size={16} className="text-primary" />
              Nom ou Surnom
            </label>
            <input 
              type="text" 
              value={partner.name}
              onChange={(e) => updatePartner({ name: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-2.5 focus:border-primary/50 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-foreground/70 mb-1 flex items-center gap-2">
              <CalendarIcon size={16} className="text-gold" />
              Date de rencontre / d'anniversaire
            </label>
            <input 
              type="date" 
              value={partner.anniversary}
              onChange={(e) => updatePartner({ anniversary: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-2.5 focus:border-gold/50 outline-none transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <label className="text-sm text-foreground/70 mb-3 flex items-center gap-2">
            <Heart size={16} className="text-rose-400" />
            Langages de l'Amour
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Paroles valorisantes', 'Moments de qualité', 'Cadeaux', 'Services rendus', 'Toucher physique'].map(lang => {
              const isSelected = partner.loveLanguages?.includes(lang)
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    const newLangs = isSelected 
                      ? partner.loveLanguages.filter(l => l !== lang)
                      : [...(partner.loveLanguages || []), lang]
                    updatePartner({ loveLanguages: newLangs })
                  }}
                  className={`px-4 py-3 rounded-lg border text-sm text-left transition-all ${isSelected ? 'border-rose-500 bg-rose-500/10 text-rose-300' : 'border-border bg-background hover:bg-white/5'}`}
                >
                  {lang}
                </button>
              )
            })}
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-rose-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all hover:-translate-y-0.5">
            <Save size={18} />
            Sauvegarder le profil
          </button>
        </div>
      </form>
    </div>
  )
}
