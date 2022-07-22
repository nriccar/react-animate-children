import { useState, useEffect } from 'react'

const useObservable = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  const observer: IntersectionObserver = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      threshold: 0,
      rootMargin: '15%',
    }
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
