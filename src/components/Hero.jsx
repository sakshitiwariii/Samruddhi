import { useRef } from 'react'
import FloatingDecor from './FloatingDecor'
import { burstConfetti, spawnFloatingHearts } from '../utils/confetti'

export default function Hero({ onOpen }) {
  const burstRef = useRef(null)

  const handleOpen = () => {
    burstConfetti(burstRef.current, 55)
    spawnFloatingHearts(burstRef.current, 18)
    setTimeout(onOpen, 900)
  }

  return (
    <section className="hero section" id="top">
      <FloatingDecor density="hero" />
      <div className="hero__content glass-card">
        <p className="hero__eyebrow handwriting">For my Teteriki 💗</p>
        <h1 className="hero__title">
          Samruddhi, this little corner of the internet is just for you…
        </h1>
        <p className="hero__warning handwriting">
          Warning: may contain excessive amounts of love, memories &amp; embarrassing pictures.
        </p>
        <button type="button" className="btn-primary hero__btn" onClick={handleOpen}>
          Open Your Surprise 🎀
        </button>
      </div>
      <div className="hero__burst" ref={burstRef} aria-hidden="true" />
      <button type="button" className="secret-heart" aria-label="Secret message" data-secret-heart>
        💗
      </button>
    </section>
  )
}
