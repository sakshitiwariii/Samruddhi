import { useState } from 'react'
import { personalityCards } from '../data/personality'
import { useInView } from '../hooks/useInView'

export default function Personality() {
  const [ref, visible] = useInView()
  const [openId, setOpenId] = useState(null)

  const toggle = (id, effect) => {
    setOpenId((prev) => (prev === id ? null : id))
    if (effect === 'shake') {
      const el = document.getElementById(`personality-${id}`)
      el?.classList.add('sticker--shake')
      setTimeout(() => el?.classList.remove('sticker--shake'), 500)
    }
  }

  return (
    <section className="section personality" ref={ref} id="personality">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Very scientific analysis 💅🏻</p>
        <h2 className="section-title">Things That Scream Samruddhi</h2>
        <div className="sticker-grid">
          {personalityCards.map((card) => {
            const open = openId === card.id
            return (
              <button
                key={card.id}
                id={`personality-${card.id}`}
                type="button"
                className={`sticker-card sticker-card--${card.effect} ${open ? 'is-open' : ''}`}
                onClick={() => toggle(card.id, card.effect)}
              >
                <span className="sticker-card__emoji">{card.emoji}</span>
                <h3>{card.title}</h3>
                <p className="sticker-card__teaser">{open ? card.reveal : card.teaser}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
