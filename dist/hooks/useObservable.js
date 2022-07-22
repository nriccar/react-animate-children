import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';
const useObservable = (ref) => {
    const { isMobile } = useWindowSize();
    const [isIntersecting, setIntersecting] = useState(false);
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
        threshold: 0,
        rootMargin: isMobile ? '60%' : '15%',
    });
    useEffect(() => {
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, []);
    return isIntersecting;
};
export default useObservable;
