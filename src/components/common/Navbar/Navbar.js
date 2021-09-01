import React from 'react';
import { string, element, bool } from 'prop-types';
import { useResponsive } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import routes from 'constants/routesPaths';

import BackArrowIcon from 'assets/back_arrow_icon.svg';
import MapIcon from 'assets/map_icon.svg';
import MenuIcon from 'assets/menu_icon.svg';

import './navbar.scss';

const Navbar = ({
  className = '',
  title = '',
  showNavbarTitle = true,
  showBackArrow = false,
  showMenuIcon = false,
  showMapIcon = true
}) => {
  const intl = useIntl();
  const isTabletOrMobile = useResponsive();
  const history = useHistory();

  return (
    <>
      <div className={`navbar ${className || ''}`}>
        {showBackArrow && (
          <div className="navbar__icon" onClick={() => history.goBack()}>
            <img src={BackArrowIcon} alt={intl.formatMessage({ id: 'alt.back' })} />
          </div>
        )}
        {showMenuIcon && (
          <div className="navbar__icon">
            <img src={MenuIcon} alt={intl.formatMessage({ id: 'alt.menu' })} />
          </div>
        )}
        {showNavbarTitle && <h3 className="navbar__title">{title}</h3>}
        {isTabletOrMobile && showMapIcon && (
          <div className="navbar__icon" onClick={() => history.push(routes.map)}>
            <img src={MapIcon} alt={intl.formatMessage({ id: 'alt.map' })} />
          </div>
        )}
      </div>
    </>
  );
};

Navbar.propTypes = {
  className: string,
  title: element,
  showNavbarTitle: bool,
  showBackArrow: bool,
  showMenuIcon: bool,
  showMapIcon: bool
};

export default Navbar;
