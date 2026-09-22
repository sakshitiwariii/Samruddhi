/**
 * Video memories — add files to /public/videos/ or use YouTube URLs
 * type: 'local' | 'youtube'
 */
export const videos = [
  {
    type: 'local',
    video: '/videos/memory1.mp4',
    thumbnail: '/images/placeholder-video.svg',
    title: 'One of our many chaotic moments 😂',
    date: '2025',
    description: 'Replace with your .mp4 in /public/videos/',
    isPlaceholder: true,
  },
  {
    type: 'youtube',
    video: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    thumbnail: '/images/placeholder-video.svg',
    title: 'YouTube memory (paste your link)',
    date: '2025',
    description: 'Replace YOUR_VIDEO_ID with a real watch URL in src/data/videos.js',
    isPlaceholder: true,
  },
]
