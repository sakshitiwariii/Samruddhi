import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const TARGET = 15

export default function MiniGame() {
  const [ref, visible] = useInView()
  const areaRef = useRef(null)
  const basketRef = useRef(50)
  const [score, setScore] = useState(0)
  const [basket, setBasket] = useState(50)
  const [hearts, setHearts] = useState([])
  const [won, setWon] = useState(false)
  const [playing, setPlaying] = useState(false)

  const spawnHeart = useCallback(() => {
    setHearts((h) => [
      ...h,
      { id: crypto.randomUUID(), x: 5 + Math.random() * 90, y: 0 },
    ].slice(-25))
  }, [])

  useEffect(() => {
    basketRef.current = basket
  }, [basket])

  useEffect(() => {
    if (!playing || won) return
    const spawn = setInterval(spawnHeart, 750)
    return () => clearInterval(spawn)
  }, [playing, won, spawnHeart])

  useEffect(() => {
    if (!playing || won) return
    const move = setInterval(() => {
      setHearts((list) => {
        let gained = 0
        const b = basketRef.current
        const next = []
        for (const h of list) {
          const y = h.y + 3.5
          if (y > 82 && y < 96 && Math.abs(h.x - b) < 10) {
            gained++
            continue
          }
          if (y < 100) next.push({ ...h, y })
        }
        if (gained) {
          setScore((s) => {
            const total = s + gained
            if (total >= TARGET) setWon(true)
            return total
          })
        }
        return next
      })
    }, 45)
    return () => clearInterval(move)
  }, [playing, won])

  const onPointer = (e) => {
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const pct = ((clientX - rect.left) / rect.width) * 100
    setBasket(Math.max(8, Math.min(92, pct)))
  }

  const meter = Math.min(5, Math.floor((score / TARGET) * 5))

  const start = () => {
    setPlaying(true)
    setScore(0)
    setWon(false)
    setHearts([])
  }

  return (
    <section className="section mini-game" ref={ref} id="game">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Very serious gameplay 🎮</p>
        <h2 className="section-title">Catch the Teteriki Hearts 💗</h2>
        {!playing ? (
          <button type="button" className="btn-primary" onClick={start}>
            Start catching 💕
          </button>
        ) : (
          <>
            <p className="love-meter">
              Teteriki Love Meter:{' '}
              {'❤️'.repeat(meter)}
              {'🤍'.repeat(5 - meter)}
            </p>
            <div
              className="game-area"
              ref={areaRef}
              onMouseMove={onPointer}
              onTouchMove={onPointer}
              role="application"
              aria-label="Catch hearts game"
            >
              {hearts.map((h) => (
                <span key={h.id} className="falling-heart" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  💗
                </span>
              ))}
              <div className="basket" style={{ left: `${basket}%` }}>
                🎀
              </div>
            </div>
            {won && (
              <p className="game-win handwriting">
                Congratulations! You have officially collected an unreasonable amount of love. 💗
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
