import { useState } from 'react'
import { secretLetter } from '../data/messages'
import { useInView } from '../hooks/useInView'

export default function SecretLetter() {
  const [ref, visible] = useInView()
  const [open, setOpen] = useState(false)

  return (
    <section className="section secret-letter" ref={ref} id="letter">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">For your eyes only 💌</p>
        <h2 className="section-title">You have one unopened letter 💌</h2>

        {!open ? (
          <button
            type="button"
            className={`envelope ${open ? 'envelope--open' : ''}`}
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            <span className="envelope__flap" />
            <span className="envelope__body" />
            <span className="envelope__hint handwriting">Click to open</span>
          </button>
        ) : (
          <div className="letter-paper">
            <p className="handwriting letter-paper__greeting">{secretLetter.greeting}</p>
            {secretLetter.paragraphs.map((p, i) => (
              <p key={i} className="letter-paper__p handwriting">
                {p}
              </p>
            ))}
            <p className="handwriting letter-paper__sign">{secretLetter.signOff}</p>
          </div>
        )}
      </div>
    </section>
  )
}
