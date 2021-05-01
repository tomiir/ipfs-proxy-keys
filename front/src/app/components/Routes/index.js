import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';

import Home from '~screens/Home';
import { history } from '~redux/store';
import { ROUTES } from '~constants/routes';
import Login from '~app/screens/Login';

import styles from './styles.module.scss';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const AppRoutesContainer = () => (
  <ConnectedRouter history={history}>
    <div className={`column center middle ${styles.container}`}>
      <Suspense>
        <AuthenticatedRoute {...ROUTES.LOGIN_USER} component={Login} />
        <AuthenticatedRoute {...ROUTES.HOME} component={Home} exact />
      </Suspense>
    </div>
  </ConnectedRouter>
);

export default AppRoutesContainer;
