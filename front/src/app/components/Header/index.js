import { string } from 'prop-types';
import React from 'react';

import PageLogo from '~assets/ipfs-logo.svg';

const Header = ({ title, titleClassName, iconClassName }) => (
  <>
    <img className={iconClassName} src={PageLogo} alt="zerf-icon" />
    <span className={titleClassName}>{title}</span>
  </>
);

Header.propTypes = {
  iconClassName: string,
  title: string,
  titleClassName: string
};

export default Header;
