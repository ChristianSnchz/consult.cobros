import React, { FC, useContext, useState } from 'react';
import { HashRouter, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AnalyticsProvider } from '@santander/analytics-empresas';
import { Location } from 'history';
import Routes from '../Routes';
import { RootRouterLocation } from '../common/types';
import WizardGoBack from '../components/commons/WizardGoBack';
import { DefaultLayout, StyledPageHeader } from './styles';
import { Title } from '../styles/general';
import AppProvider, { AppContext } from '../contexts/AppContext';

// Ignore a Eslint false positive with dynamic imports.
import('../styles/index.scss').then();

interface RootProps {
  rootRouterLocation: RootRouterLocation;
}
interface ICustomLocation extends Location {
  state: { title: string };
}
const PageTitle = () => {
  const { title, setTitle } = useContext(AppContext);
  const history = useHistory();

  history.listen((r: ICustomLocation) => setTitle(r.state?.title));

  return <Title>{title || 'Consulta de deuda'}</Title>;
};
const PageHeader = ({ children }) => {
  const history = useHistory();
  const [isHome, setIsHome] = useState<boolean>(history.location.pathname === '/');
  history.listen((r: ICustomLocation) => {
    setIsHome(r.pathname === '/');
  });
  return <StyledPageHeader isHome={isHome}>{children}</StyledPageHeader>;
};
const AppDefaultLayout = ({ children }) => {
  const { isMobile } = useContext(AppContext);
  return <DefaultLayout isMobile={isMobile}>{children}</DefaultLayout>;
};
const Root: FC<RootProps> = ({ rootRouterLocation }: RootProps) => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              keepPreviousData: true
            }
          }
        })
      }
    >
      <AnalyticsProvider program="007" product="0004">
        <HashRouter>
          <AppProvider>
            <AppDefaultLayout>
              <PageHeader>
                {/* <PageTitle /> */}
                <WizardGoBack text={'Página anterior'} />
              </PageHeader>
              <Routes rootRouterLocation={rootRouterLocation} />
            </AppDefaultLayout>
          </AppProvider>
        </HashRouter>
      </AnalyticsProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default Root;
