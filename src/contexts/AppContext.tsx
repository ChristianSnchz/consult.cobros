import { constant } from 'lodash';
import React, { useEffect, createContext, Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import Spinner from '../components/commons/Spinner';
import { useWindowSize } from '../utils/hooks';

export interface IAppContext {
  isMobile: boolean;
  width: number;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
  hasErrors: boolean;
  setHasErrors: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const initialProps: IAppContext = {
  isMobile: null,
  width: 1000,
  title: '',
  setTitle: constant,
  hasErrors: false,
  setHasErrors: constant,
  isLoading: false,
  setIsLoading: constant
};

const AppContext = createContext(initialProps);
const AppProvider: FC = ({ children }) => {
  const [title, setTitle] = useState();
  const { width, widthOuter } = useWindowSize();
  const { pathname } = useLocation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMemo(() => !(widthOuter >= 768), [widthOuter]);

  useEffect(() => {
    if (hasErrors) {
      setHasErrors(false);
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        width,
        setTitle,
        title,
        hasErrors,
        isLoading,
        setHasErrors,
        setIsLoading
      }}
    >
      {children}
      {isLoading && !isMobile && <Spinner data-testid="spinnner-test" loading={true} color="#ec0000" size={36} />}
    </AppContext.Provider>
  );
};
export { AppContext };
export default AppProvider;
