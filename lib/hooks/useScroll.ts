import { useState, useEffect } from 'react'

const useScroll = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const updatePosition = () => {
    setScrollPosition(window.pageYOffset)
  }

  useEffect(() => {
    updatePosition()
    window.addEventListener('scroll', updatePosition)
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export default useScroll
