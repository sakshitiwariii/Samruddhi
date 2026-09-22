export function burstConfetti(container, count = 40) {
  if (!container) return
  const colors = ['#ffb6c1', '#ffc0cb', '#e6b3ff', '#ffdab9', '#fff0f5', '#ff69b4']

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span')
    piece.className = 'confetti-piece'
    piece.style.left = `${40 + Math.random() * 20}%`
    piece.style.background = colors[Math.floor(Math.random() * colors.length)]
    piece.style.animationDelay = `${Math.random() * 0.4}s`
    piece.style.transform = `rotate(${Math.random() * 360}deg)`
    container.appendChild(piece)
    setTimeout(() => piece.remove(), 2500)
  }
}

export function spawnFloatingHearts(parent, count = 12) {
  if (!parent) return
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span')
    heart.className = 'float-heart-burst'
    heart.textContent = ['💗', '💕', '✨', '🎀', '🦋'][Math.floor(Math.random() * 5)]
    heart.style.left = `${Math.random() * 100}%`
    heart.style.animationDelay = `${Math.random() * 0.8}s`
    parent.appendChild(heart)
    setTimeout(() => heart.remove(), 3000)
  }
}
