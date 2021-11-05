import React, { FC, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { RootRouterLocation } from '../common/types';
import Home from '../views/Home';
import routes from './routes';

interface RoutesProps {
  rootRouterLocation: RootRouterLocation;
}

const Routes: FC<RoutesProps> = ({ rootRouterLocation }: RoutesProps) => {
  const history = useHistory();

  useEffect(() => {
    if (rootRouterLocation?.state?.microfrontPath) {
      history.push(rootRouterLocation.state.microfrontPath);
    }
  }, [history, rootRouterLocation]);

  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      {routes.map((r, i) => (
        <Route key={i} exact path={r.url} component={r.component} />
      ))}
    </Switch>
  );
};

export default Routes;
