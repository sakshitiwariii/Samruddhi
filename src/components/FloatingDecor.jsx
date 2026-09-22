export default function FloatingDecor({ density = 'normal' }) {
  const items = density === 'hero'
    ? ['💗', '✨', '🦋', '⭐', '🌸', '💕', '🎀', '✦']
    : ['💗', '✨', '⭐', '💕']

  return (
    <div className="floating-decor" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className="floating-decor__item"
          style={{
            left: `${8 + (i * 11) % 84}%`,
            top: `${5 + (i * 17) % 75}%`,
            animationDuration: `${14 + (i % 5) * 3}s`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${0.85 + (i % 3) * 0.35}rem`,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
