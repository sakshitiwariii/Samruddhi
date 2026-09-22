import { timeline } from '../data/timeline'
import { useInView } from '../hooks/useInView'

function TimelineItem({ item }) {
  const [ref, visible] = useInView({ threshold: 0.2 })

  return (
    <article ref={ref} className={`timeline-item ${visible ? 'is-visible' : ''}`}>
      <div className="timeline-item__dot" />
      <div className="timeline-item__card glass-card">
        <span className="timeline-item__year">{item.year}</span>
        <h3>{item.title}</h3>
        <p>{item.story}</p>
        <img src={item.image} alt="" loading="lazy" className="timeline-item__photo" />
      </div>
    </article>
  )
}

export default function Timeline() {
  const [ref, visible] = useInView()

  return (
    <section className="section friendship-timeline" ref={ref} id="timeline">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Plot of our friendship 🕰️</p>
        <h2 className="section-title">How We Became Us 💗</h2>
        <div className="timeline-track">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
