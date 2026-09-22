import { useState } from 'react'
import { openWhenLetters } from '../data/openWhen'
import { useInView } from '../hooks/useInView'

export default function OpenWhen() {
  const [ref, visible] = useInView()
  const [active, setActive] = useState(null)

  return (
    <section className="section open-when" ref={ref} id="open-when">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Emergency best-friend kit 💌</p>
        <h2 className="section-title">Open When…</h2>
        <div className="open-when-grid">
          {openWhenLetters.map((letter) => (
            <button
              key={letter.id}
              type="button"
              className={`mini-envelope ${active === letter.id ? 'is-open' : ''}`}
              onClick={() => setActive(active === letter.id ? null : letter.id)}
            >
              <span className="mini-envelope__icon">{letter.emoji}</span>
              <span className="mini-envelope__label">{letter.label}</span>
              {active === letter.id && (
                <p className="mini-envelope__message handwriting">{letter.message}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
