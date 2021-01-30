import { useState, useEffect } from 'react';

const breakpoints = {
  sm: '(max-width: 640px)',
  md: '(min-width: 641px) and (max-width: 768px)',
  lg: '(min-width: 769px) and (max-width: 1024px)',
  xl: '(min-width: 1025px) and (max-width: 1280px)',
  '2xl': '(min-width: 1281px) and (max-width: 1546px)',
}

function useContainerSize() {
  const [containerSize, setContainerSize] = useState(null);

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia(breakpoints[containerSize]).matches) return;
      for (let screen of Object.keys(breakpoints)) {
        const matchMediaQuery = breakpoints[screen];
        const matches = window.matchMedia(matchMediaQuery).matches;
        if (matches) {
          setContainerSize(screen);
          break;
        }
      }
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return containerSize;
}

export default useContainerSize;
