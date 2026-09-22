import { musicTracks } from '../data/music'
import { useInView } from '../hooks/useInView'

export default function MusicPlayer() {
  const [ref, visible] = useInView()

  return (
    <section className="section music-player" ref={ref} id="music">
      <div className={`section-inner ${visible ? 'is-visible' : ''}`}>
        <p className="section-label handwriting">Optional vibes only 🎵</p>
        <div className="music-card glass-card">
          <p>🎵 <strong>Press play for the soundtrack of this little memory.</strong></p>
          <div className="music-track-list">
            {musicTracks.map((track) => (
              <article className="music-track" key={track.src}>
                <iframe
                  className="music-youtube"
                  src={track.src}
                  title={track.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <div className="music-meta">
                  <span>{track.title}</span>
                  <span className="music-artist">{track.artist}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
