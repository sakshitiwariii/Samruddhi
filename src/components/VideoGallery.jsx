import { useState } from 'react'
import { videos } from '../data/videos'
import { useInView } from '../hooks/useInView'

function getYoutubeId(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    return u.searchParams.get('v')
  } catch {
    return null
  }
}

function VideoModal({ item, onClose }) {
  if (!item) return null
  const ytId = item.type === 'youtube' ? getYoutubeId(item.video) : null

  return (
    <div className="video-modal" role="dialog" aria-modal="true">
      <button type="button" className="video-modal__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className="video-modal__player">
        {item.type === 'youtube' && ytId ? (
          <iframe
            title={item.title}
            src={`https://www.youtube.com/embed/${ytId}?autoplay=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video controls playsInline preload="metadata" poster={item.thumbnail}>
            <source src={item.video} type="video/mp4" />
            Your browser does not support video — add a file to /public/videos/
          </video>
        )}
      </div>
      <div className="video-modal__meta">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="ticket-date">{item.date}</span>
      </div>
    </div>
  )
}

export default function VideoGallery() {
  const [ref, visible] = useInView()
  const [active, setActive] = useState(null)

  return (
    <section className="section video-section" ref={ref} id="videos">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Director&apos;s cut 🎬</p>
        <h2 className="section-title">Our Little Cinema 🎬💗</h2>
        <p className="section-subtitle">Movie tickets for memories — sound stays off until you press play.</p>

        <div className="ticket-grid">
          {videos.map((v, i) => (
            <article key={i} className={`movie-ticket ${v.isPlaceholder ? 'movie-ticket--placeholder' : ''}`}>
              <button type="button" className="movie-ticket__btn" onClick={() => setActive(v)}>
                <div className="movie-ticket__thumb">
                  <img src={v.thumbnail} alt="" loading="lazy" />
                  <span className="movie-ticket__play">▶</span>
                </div>
                <div className="movie-ticket__body">
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                  <span className="ticket-date">{v.date}</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </section>
  )
}
