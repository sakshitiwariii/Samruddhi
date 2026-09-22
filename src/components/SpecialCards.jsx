import { useState } from 'react'
import { specialCards } from '../data/messages'
import { useInView } from '../hooks/useInView'

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={`flip-card ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
    >
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">
          <span className="handwriting">{front}</span>
        </div>
        <div className="flip-card__face flip-card__face--back">
          <p>{back}</p>
        </div>
      </div>
    </button>
  )
}

export default function SpecialCards() {
  const [ref, visible] = useInView()

  return (
    <section className="section special-cards" ref={ref} id="special">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">A tiny truth booth 💌</p>
        <h2 className="section-title">Do You Know How Special You Are?</h2>
        <p className="section-subtitle">Tap a card. Pretend you&apos;re surprised. I&apos;ll know you&apos;re not.</p>
        <div className="flip-grid">
          {specialCards.map((card, i) => (
            <FlipCard key={i} front={card.front} back={card.back} />
          ))}
        </div>
      </div>
    </section>
  )
}
