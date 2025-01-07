'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function VideoBackground() {
  const pathname = usePathname()
  const [videoSrc, setVideoSrc] = useState('/mimall-bg.mp4')

  useEffect(() => {
    if (pathname === '/michina') {
      setVideoSrc('/mimall-china-bg.mp4')
    } else if (pathname === '/hailoride') {
      setVideoSrc('https://hailoride.com/videobg/contact_us_bg.mp4')
    } else {
      setVideoSrc('/mimall-bg.mp4')
    }
  }, [pathname])

  return (
    <div className="video-bg">
      <video key={videoSrc} autoPlay muted loop playsInline>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
