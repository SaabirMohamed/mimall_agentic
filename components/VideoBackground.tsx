'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const videoMapping = {
  '/': '/mimall-default.mp4',
  '/categories': '/mimall-categories-bg.mp4',
  '/michina': '/mimall-china-bg.mp4',
  '/stores': '/mimall-stores.bg.mp4',
  '/miia': '/mimall-miia-bg.mp4',
  '/login': '/mimall-default.mp4',
  '/auth/login': '/mimall-default.mp4',
  '/locations': '/mimall-locations-bg.mp4'
};

export default function VideoBackground() {
  const pathname = usePathname()
  const [videoSrc, setVideoSrc] = useState('/mimall-default.mp4')

  useEffect(() => {
    // Get the video source based on the current path, fallback to default if not found
    const newVideoSrc = videoMapping[pathname as keyof typeof videoMapping] || '/mimall-default.mp4';
    setVideoSrc(newVideoSrc)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      <video 
        key={videoSrc} 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
