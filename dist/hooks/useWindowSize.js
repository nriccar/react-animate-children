import { useEffect, useState } from 'react';
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        isMobile: false,
        width: 0,
        height: 0,
    });
    const handleResize = () => setWindowSize({
        isMobile: window.innerWidth <= 480,
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
};
export default useWindowSize;
