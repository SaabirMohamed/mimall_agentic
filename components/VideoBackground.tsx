'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function VideoBackground() {
  const pathname = usePathname()
  const [videoSrc, setVideoSrc] = useState('/mimall-default-bg.mp4')

  useEffect(() => {
    setVideoSrc('/mimall-default-bg.mp4')
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
