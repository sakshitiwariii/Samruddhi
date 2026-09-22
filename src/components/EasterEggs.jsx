import { useEffect, useState } from 'react'
import { floatingCompliments, heartSecrets } from '../data/messages'

export default function EasterEggs() {
  const [toast, setToast] = useState(null)
  const [secretIdx, setSecretIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        const msg = floatingCompliments[Math.floor(Math.random() * floatingCompliments.length)]
        setToast(msg)
        setTimeout(() => setToast(null), 3200)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onHeartClick = (e) => {
      const target = e.target.closest('[data-secret-heart]')
      if (!target) return
      setToast(heartSecrets[secretIdx % heartSecrets.length])
      setSecretIdx((i) => i + 1)
      setTimeout(() => setToast(null), 2800)
    }
    document.addEventListener('click', onHeartClick)
    return () => document.removeEventListener('click', onHeartClick)
  }, [secretIdx])

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches === false) return

    const trail = (e) => {
      const el = document.createElement('span')
      el.className = 'cursor-heart'
      el.textContent = '💗'
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 700)
    }

    let throttle = 0
    const onMove = (e) => {
      const now = Date.now()
      if (now - throttle < 80) return
      throttle = now
      trail(e)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    toast ? (
      <div className="teteriki-toast handwriting" role="status">
        {toast}
      </div>
    ) : null
  )
}
