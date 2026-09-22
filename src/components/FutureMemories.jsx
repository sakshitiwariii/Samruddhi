import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

const placeholders = [
  { emoji: '📸', label: 'Future photo' },
  { emoji: '🎥', label: 'Future video' },
  { emoji: '💌', label: 'Future memory' },
  { emoji: '✈️', label: 'Future adventure' },
  { emoji: '😂', label: 'Future chaos' },
]

const storageKey = 'samruddhi-future-memories'

export default function FutureMemories() {
  const [ref, visible] = useInView()
  const [images, setImages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) ?? {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(images))
  }, [images])

  const addImage = (label, file) => {
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      setImages((current) => ({ ...current, [label]: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (label) => {
    setImages((current) => {
      const next = { ...current }
      delete next[label]
      return next
    })
  }

  return (
    <section className="section future" ref={ref} id="future">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Blank pages on purpose 🌱</p>
        <h2 className="section-title">Memories We Haven&apos;t Made Yet…</h2>
        <div className="future-grid">
          {placeholders.map((p) => (
            <article key={p.label} className={`polaroid polaroid--empty ${images[p.label] ? 'has-image' : ''}`}>
              <label className="polaroid__frame polaroid__frame--empty" htmlFor={`future-image-${p.label}`}>
                {images[p.label] ? (
                  <img src={images[p.label]} alt={`${p.label} uploaded memory`} />
                ) : (
                  <span>{p.emoji}</span>
                )}
                <span className="future-upload-hint">{images[p.label] ? 'Change picture' : 'Add picture'}</span>
              </label>
              <input
                id={`future-image-${p.label}`}
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={(event) => addImage(p.label, event.target.files?.[0])}
              />
              <p className="handwriting">{p.label}</p>
              {images[p.label] && (
                <button type="button" className="future-remove" onClick={() => removeImage(p.label)}>
                  Remove picture
                </button>
              )}
            </article>
          ))}
        </div>
        <p className="future-message handwriting">
          This isn&apos;t the end of the scrapbook. There&apos;s still so much left to add.
        </p>
      </div>
    </section>
  )
}
