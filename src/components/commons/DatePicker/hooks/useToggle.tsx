import { useCallback, useState } from 'react';

const useToggle = (defaultActive = false): [boolean, (a: boolean) => void] => {
  const [active, setActive] = useState<boolean>(defaultActive);
  const toggle: (a: boolean) => void = useCallback(a => setActive(a), []);

  return [active, toggle];
};

export default useToggle;
