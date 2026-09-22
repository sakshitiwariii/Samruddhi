import { useRef, useState } from 'react'
import { musicTrack } from '../data/music'
import { useInView } from '../hooks/useInView'

export default function MusicPlayer() {
  const [ref, visible] = useInView()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // File may be missing until user adds /public/music/our-song.mp3
      }
    }
  }

  const onTimeUpdate = () => {
    const a = audioRef.current
    if (!a || !a.duration) return
    setProgress(a.currentTime / a.duration)
  }

  const seek = (e) => {
    const a = audioRef.current
    if (!a || !a.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    a.currentTime = ratio * a.duration
  }

  return (
    <section className="section music-player" ref={ref} id="music">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Optional vibes only 🎵</p>
        <div className="music-card glass-card">
          <p>🎵 <strong>Press play for the soundtrack of this little memory.</strong></p>
          {musicTrack.type === 'youtube' ? (
            <iframe
              className="music-youtube"
              src={musicTrack.src}
              title={musicTrack.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <audio
              ref={audioRef}
              src={musicTrack.src}
              preload="metadata"
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              onEnded={() => setPlaying(false)}
            />
          )}
          <div className="music-meta">
            <span>{musicTrack.title}</span>
            <span className="music-artist">{musicTrack.artist}</span>
          </div>
          {musicTrack.type !== 'youtube' && <div className="music-controls">
            <button type="button" className="btn-round" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <div className="music-progress" onClick={seek} role="slider" aria-valuenow={Math.round(progress * 100)}>
              <div className="music-progress__fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <label className="music-volume">
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setVolume(v)
                  if (audioRef.current) audioRef.current.volume = v
                }}
              />
            </label>
          </div>}
          {musicTrack.type !== 'youtube' && !duration && (
            <p className="music-hint">Add your song at <code>/public/music/our-song.mp3</code></p>
          )}
        </div>
      </div>
    </section>
  )
}
