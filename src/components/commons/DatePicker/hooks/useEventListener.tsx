import { useEffect } from 'react';

const useEventListener = (event: string, callback: (a: any) => void, options = false, target: any) => {
  useEffect(() => {
    target.addEventListener(event, callback, options);

    return () => target.removeEventListener(event, callback);
  }, [event, callback, options, target]);
};

export default useEventListener;
