import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageLogo from '~assets/ipfs-logo.svg';
import { actionCreators } from '~redux/Auth/actions';
import Input from '~components/Input';
import Button from '~components/Button';

import styles from './styles.module.scss';
import { requiredString } from './validations';

function Login() {
  const dispatch = useDispatch();
  const { signInLoading } = useSelector(state => state.auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = () => dispatch(actionCreators.signIn({ email, password }));
  return (
    <div className="row full-width center middle space-between">
      <div className="column full-width center">
        <div className={`column full-width center ${styles.loginContainer}`}>
          <img className={styles.loginIconTitle} src={PageLogo} alt="ipfs-icon" />
          <span className={`subtitle bold ${styles.loginWelcome}`}>IPFS Proxy Key Manager</span>
          <div className={`column full-width center ${styles.loginFormContainer}`}>
            <Input
              value={email}
              name="email"
              label="Email"
              error={requiredString(email)}
              handleChange={handleEmailChange}
              type="email"
              inputClassName={styles.input}
              className="full-width m-bottom-3"
            />
            <Input
              value={password}
              name="password"
              label="Password"
              error={requiredString(password)}
              handleChange={handlePasswordChange}
              type="password"
              inputClassName={styles.input}
              className="full-width m-bottom-3"
              errorClassName={styles.error}
            />
            <Button
              type="submit"
              className={`full-width m-top-3 ${styles.button}`}
              loading={signInLoading}
              onClick={handleSubmit}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
