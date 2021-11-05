import { useCallback } from 'react';
import useEventListener from './useEventListener';

const ESCAPE_KEY = 27;
const useEscape = (callback: (a: any) => void, disabled = false) => {
  const handleEscapePress = useCallback(
    event => {
      if (event.keyCode === ESCAPE_KEY) {
        callback(event);
      }
    },
    [callback]
  );
  useEventListener('keydown', !disabled ? handleEscapePress : () => null, false, document);
};
export default useEscape;
