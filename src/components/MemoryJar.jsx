import { useState } from 'react'
import { jarNotes } from '../data/messages'
import { useInView } from '../hooks/useInView'

function randomNote(exclude) {
  const pool = jarNotes.filter((n) => n !== exclude)
  return pool[Math.floor(Math.random() * pool.length)] ?? jarNotes[0]
}

export default function MemoryJar() {
  const [ref, visible] = useInView()
  const [note, setNote] = useState(null)
  const [pulling, setPulling] = useState(false)

  const pull = () => {
    setPulling(true)
    setTimeout(() => {
      setNote((prev) => randomNote(prev))
      setPulling(false)
    }, 600)
  }

  return (
    <section className="section memory-jar" ref={ref} id="jar">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Pick a note 🫙</p>
        <h2 className="section-title">A Jar Full of Reasons I Love You</h2>
        <button
          type="button"
          className={`jar ${pulling ? 'jar--pull' : ''}`}
          onClick={pull}
          aria-label="Pull a note from the jar"
        >
          <div className="jar__glass">
            <div className="jar__notes" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="jar__fold" style={{ left: `${10 + i * 10}%` }} />
              ))}
            </div>
          </div>
          <span className="jar__label handwriting">Tap the jar ✨</span>
        </button>
        {note && (
          <blockquote className="jar-note handwriting">
            “{note}”
          </blockquote>
        )}
      </div>
    </section>
  )
}
