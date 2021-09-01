import React from 'react';
import { node } from 'prop-types';
import Smilies from 'assets/smilies.svg';
import { useResponsive } from 'hooks';
import { useIntl } from 'react-intl';
import routesPaths from 'constants/routesPaths';

const LayoutWrapper = ({ children }) => {
  const intl = useIntl();
  const isTabletOrMobile = useResponsive();

  if (isTabletOrMobile) {
    return (
      <div className="flex-column-centered">
        <div className="flex-column-centered" style={{ width: '100%' }}>
          {children}
        </div>
        {window.location.pathname !== routesPaths.map && (
          <footer className="sidebar-footer">
            <img
              src={Smilies}
              alt={intl.formatMessage({ id: 'alt.smilies' })}
              className="smilies-footer"
            />
          </footer>
        )}
      </div>
    );
  }
  return <>{children}</>;
};

LayoutWrapper.propTypes = {
  children: node.isRequired
};

export default LayoutWrapper;
