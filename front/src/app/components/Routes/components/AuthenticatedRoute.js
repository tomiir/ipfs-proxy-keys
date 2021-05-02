import React from 'react';
import { bool, string, func, object } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Helmet from '~components/Helmet';
import LocalStorageService from '~services/LocalStorageService';
import { ROUTES } from '~constants/routes';

const AuthenticatedRoute = ({
  title,
  description,
  path,
  publicRoute,
  component: Component,
  componentProps,
  ...props
}) => {
  const manager = LocalStorageService.getTokenManager();
  const redirectToHome = publicRoute && !!manager?.token;
  const redirectToLogin = !publicRoute && !manager?.token;
  return redirectToLogin ? (
    <Redirect to={ROUTES.LOGIN_USER.path} />
  ) : redirectToHome ? (
    <Redirect to={ROUTES.HOME.path} />
  ) : (
    <>
      <Helmet title={title} description={description} />
      <Route path={path} render={() => <Component {...componentProps} />} {...props} />
    </>
  );
};

AuthenticatedRoute.propTypes = {
  path: string.isRequired,
  authorized: bool,
  component: func,
  componentProps: object, // eslint-disable-line
  description: string,
  publicRoute: bool,
  title: string
};

export default withRouter(AuthenticatedRoute);
