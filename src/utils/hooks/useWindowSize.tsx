import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useWindowSize = () => {
  const isSSR = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
    widthOuter: window.outerWidth,
    heightOuter: null,
    visualViewportWidth: null
  });

  function changeWindowSize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      widthOuter: window.outerWidth,
      heightOuter: window.outerHeight,
      visualViewportWidth: window.visualViewport.width
    });
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
