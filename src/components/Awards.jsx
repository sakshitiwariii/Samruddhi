import { awards } from '../data/awards'
import { useInView } from '../hooks/useInView'

export default function Awards() {
  const [ref, visible] = useInView()

  return (
    <section className="section awards" ref={ref} id="awards">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Black tie optional 🏆</p>
        <h2 className="section-title">The Completely Unofficial Teteriki Awards</h2>
        <div className="awards-grid">
          {awards.map((a, i) => (
            <article key={i} className="award-card glass-card">
              <span className="award-card__emoji">{a.emoji}</span>
              <h3>{a.title}</h3>
              <p>{a.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
