import { useEffect, useState } from 'react'

interface WindowSize {
  isMobile: boolean
  width: number
  height: number
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    isMobile: false,
    width: 0,
    height: 0,
  })

  const handleResize = () =>
    setWindowSize({
      isMobile: windowSize.width <= 480,
      width: window.innerWidth,
      height: window.innerHeight,
    })

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
