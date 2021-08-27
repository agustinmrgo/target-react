import React from 'react';
import { string, element, bool } from 'prop-types';
// import { useResponsive } from 'hooks';
import { useHistory } from 'react-router-dom';

import routes from 'constants/routesPaths';

import BackArrowIcon from 'assets/back_arrow_icon.svg';

const Navbar = ({ className = '', title, showMapIcon = true }) => {
  // const isTabletOrMobile = useResponsive();
  const history = useHistory();

  const showBackArrow = window.location.pathname === routes.createTarget;
  const showNavbarTitle = window.location.pathname !== routes.welcome;

  // const showMapIcon = isTabletOrMobile &&

  return (
    <>
      <div className={`navbar ${className || ''}`}>
        {showBackArrow && (
          <div className="back-arrow-icon" onClick={() => history.goBack()}>
            <img src={BackArrowIcon} alt="backArrowIcon" />
          </div>
        )}
        {showNavbarTitle && <h3 className="navbar-title">{title}</h3>}
      </div>
    </>
  );
};

Navbar.propTypes = {
  className: string,
  title: element.isRequired,
  showMapIcon: bool
};

export default Navbar;
