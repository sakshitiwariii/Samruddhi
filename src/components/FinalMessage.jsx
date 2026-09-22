import { useInView } from '../hooks/useInView'
import FloatingDecor from './FloatingDecor'

export default function FinalMessage({ onReplay }) {
  const [ref, visible] = useInView({ threshold: 0.3 })

  return (
    <section className="section final" ref={ref} id="end">
      <FloatingDecor density="hero" />
      <div className={`final__inner ${visible ? 'is-visible' : ''}`}>
        <p className="final__line">Some people become memories.</p>
        <p className="final__line final__line--emph handwriting">You became family. 💗</p>
        <p className="final__line final__title">Happy Birthday, Teteriki 🎀</p>
        <p className="final__cake handwriting">Now go eat some cake. 🎂</p>
        <button type="button" className="btn-primary" onClick={onReplay}>
          Replay the Surprise ✨
        </button>
      </div>
    </section>
  )
}
