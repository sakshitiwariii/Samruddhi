import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t)
          setTimeout(onDone, 400)
          return 100
        }
        return p + 8
      })
    }, 80)
    return () => clearInterval(t)
  }, [onDone])

  return (
    <div className="loading-screen">
      <div className="loading-screen__scrapbook">
        <p className="handwriting loading-screen__title">Wrapping your surprise… 🎀</p>
        <div className="loading-bar">
          <div className="loading-bar__fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-screen__tiny">Teteriki loading protocol initiated 💗</p>
      </div>
    </div>
  )
}
