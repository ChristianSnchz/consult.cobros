import useEventListener from './useEventListener';

interface KeyPress {
  key: string;
}
// Hook
function useKeyPress(targetKey: string, callback: () => void, disabled = false) {
  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyPress) {
    if (!disabled && key === targetKey) {
      callback();
    }
  }
  useEventListener('keydown', !disabled ? downHandler : () => null, undefined, document);
}
export default useKeyPress;
