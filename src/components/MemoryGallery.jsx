import { useCallback, useState } from 'react'
import { memories } from '../data/memories'
import { useInView } from '../hooks/useInView'

function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index]
  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onNav(-1)}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <figure className="lightbox__figure">
        <img src={item.image} alt={item.caption} />
        <figcaption>
          <p className="handwriting lightbox__caption">{item.caption}</p>
          <p className="lightbox__date">{item.date}</p>
        </figcaption>
      </figure>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onNav(1)}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  )
}

export default function MemoryGallery() {
  const [ref, visible] = useInView()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const realMemories = memories

  const open = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  const nav = useCallback(
    (dir) => {
      setLightboxIndex((idx) => {
        if (idx === null) return null
        const next = (idx + dir + realMemories.length) % realMemories.length
        return next
      })
    },
    [realMemories.length],
  )

  const onDoubleClick = (e) => {
    e.currentTarget.classList.add('polaroid--sparkle')
    setTimeout(() => e.currentTarget.classList.remove('polaroid--sparkle'), 800)
  }

  return (
    <section className="section memory-wall" ref={ref} id="memories">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Scrapbook mode 📸</p>
        <h2 className="section-title">A Little Gallery of Us 💗</h2>
        <p className="section-subtitle">Hover for love. Double-click for sparkles. Click to zoom.</p>

        <div className="polaroid-grid">
          {realMemories.map((mem, i) => (
            <article
              key={`${mem.image}-${i}`}
              className={`polaroid ${mem.isPlaceholder ? 'polaroid--placeholder' : ''}`}
              style={{ '--rot': `${mem.rotation ?? 0}deg` }}
              onDoubleClick={onDoubleClick}
            >
              <button type="button" className="polaroid__btn" onClick={() => open(i)}>
                <div className="polaroid__frame">
                  <img src={mem.image} alt={mem.caption} loading="lazy" />
                  <span className="polaroid__hearts" aria-hidden="true">💕💗</span>
                </div>
                <p className="polaroid__caption handwriting">{mem.caption}</p>
                <p className="polaroid__date">{mem.date}</p>
              </button>
            </article>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox items={realMemories} index={lightboxIndex} onClose={close} onNav={nav} />
      )}
    </section>
  )
}
