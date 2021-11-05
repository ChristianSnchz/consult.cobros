import { useCallback, useRef } from 'react';
import useEventListener from './useEventListener';

const useClickOutside = (callback: (a: any) => void, disabled = false) => {
  const element = useRef<any>(null);

  const handleClickOutside = useCallback(
    event => {
      if (element.current && !element.current.contains(event.target)) {
        callback(event);
      }
    },
    [callback]
  );
  useEventListener('click', !disabled ? handleClickOutside : () => null, true, document);

  return element;
};

export default useClickOutside;
