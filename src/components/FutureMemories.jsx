import { useInView } from '../hooks/useInView'

const placeholders = [
  { emoji: '📸', label: 'Future photo' },
  { emoji: '🎥', label: 'Future video' },
  { emoji: '💌', label: 'Future memory' },
  { emoji: '✈️', label: 'Future adventure' },
  { emoji: '😂', label: 'Future chaos' },
]

export default function FutureMemories() {
  const [ref, visible] = useInView()

  return (
    <section className="section future" ref={ref} id="future">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Blank pages on purpose 🌱</p>
        <h2 className="section-title">Memories We Haven&apos;t Made Yet…</h2>
        <div className="future-grid">
          {placeholders.map((p) => (
            <div key={p.label} className="polaroid polaroid--empty">
              <div className="polaroid__frame polaroid__frame--empty">
                <span>{p.emoji}</span>
              </div>
              <p className="handwriting">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="future-message handwriting">
          This isn&apos;t the end of the scrapbook. There&apos;s still so much left to add.
        </p>
      </div>
    </section>
  )
}
