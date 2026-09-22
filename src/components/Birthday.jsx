import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { burstConfetti } from '../utils/confetti'

const CANDLE_COUNT = 5

export default function Birthday() {
  const [ref, visible] = useInView()
  const [lit, setLit] = useState(() => Array(CANDLE_COUNT).fill(true))
  const [wished, setWished] = useState(false)
  const confettiRef = useRef(null)

  const allOut = lit.every((c) => !c)

  useEffect(() => {
    if (allOut && !wished) {
      setWished(true)
      burstConfetti(confettiRef.current, 35)
    }
  }, [allOut, wished])

  const blow = (index) => {
    if (!lit[index]) return
    setLit((prev) => {
      const next = [...prev]
      next[index] = false
      return next
    })
  }

  return (
    <section className="section birthday" ref={ref} id="birthday">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Birthday time 🎂</p>
        <h2 className="section-title">HAPPY BIRTHDAY, TETERIKI! 🎂💗</h2>
        <p className="section-subtitle">
          To the girl who makes ordinary days feel a little more special.
        </p>

        <div className="birthday-scene">
          <div className="balloons" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`balloon balloon--${i}`} />
            ))}
          </div>

          <div className="cake-wrap">
            <div className="cake">
              <div className="cake__icing" />
              <div className="cake__layer cake__layer--top" />
              <div className="cake__layer cake__layer--mid" />
              <div className="cake__layer cake__layer--bottom" />
              <div className="cake__candles">
                {lit.map((isLit, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`candle ${isLit ? 'candle--lit' : 'candle--out'}`}
                    onClick={() => blow(i)}
                    aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                  >
                    <span className="candle__flame" />
                    <span className="candle__stick" />
                  </button>
                ))}
              </div>
            </div>
            <p className="cake-hint handwriting">
              {allOut ? 'Wish made! ✨' : 'Click each candle to blow them out 🕯️'}
            </p>
          </div>
          <div className="birthday-confetti" ref={confettiRef} aria-hidden="true" />
        </div>

        <div className="sticker-row" aria-hidden="true">
          <span>🎈</span><span>🎉</span><span>✨</span><span>🧁</span><span>💗</span>
        </div>
      </div>
    </section>
  )
}
