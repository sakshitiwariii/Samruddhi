import { useCallback, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'
import Birthday from './components/Birthday'
import SpecialCards from './components/SpecialCards'
import MemoryGallery from './components/MemoryGallery'
import VideoGallery from './components/VideoGallery'
import Personality from './components/Personality'
import Awards from './components/Awards'
import Timeline from './components/Timeline'
import SecretLetter from './components/SecretLetter'
import OpenWhen from './components/OpenWhen'
import MemoryJar from './components/MemoryJar'
import MiniGame from './components/MiniGame'
import MusicPlayer from './components/MusicPlayer'
import FutureMemories from './components/FutureMemories'
import FinalMessage from './components/FinalMessage'
import EasterEggs from './components/EasterEggs'
import './index.css'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const replay = useCallback(() => {
    setUnlocked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!booted) {
    return <LoadingScreen onDone={() => setBooted(true)} />
  }

  return (
    <div className="app">
      <div className="paper-texture" aria-hidden="true" />
      <EasterEggs />

      {!unlocked ? (
        <Hero onOpen={() => setUnlocked(true)} />
      ) : (
        <main className="main-content" id="top">
          <Birthday />
          <SpecialCards />
          <MemoryGallery />
          <VideoGallery />
          <Personality />
          <Awards />
          <Timeline />
          <SecretLetter />
          <OpenWhen />
          <MemoryJar />
          <MiniGame />
          <MusicPlayer />
          <FutureMemories />
          <FinalMessage onReplay={replay} />
        </main>
      )}
    </div>
  )
}
