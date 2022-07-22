import { useState, useEffect } from 'react';
const useObservable = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
        root: null,
        rootMargin: '15%',
        threshold: 0.1,
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
