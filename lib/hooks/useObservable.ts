import { useState, useEffect } from 'react'

const useObservable = (ref: any): boolean => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  const observer: IntersectionObserver = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      root: null,
      rootMargin: '15%',
      threshold: 0.1,
    },
  )

  useEffect(() => {
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}

export default useObservable
