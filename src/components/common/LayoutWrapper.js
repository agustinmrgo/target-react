import React from 'react';
import { node } from 'prop-types';
import Smilies from 'assets/smilies.svg';
import { useResponsive } from 'hooks';

const LayoutWrapper = ({ children }) => {
  const isTabletOrMobile = useResponsive();
  if (isTabletOrMobile) {
    return (
      <div className="flex-column-centered">
        <div className="flex-column-centered" style={{ width: '100%' }}>
          {children}
        </div>
        <footer className="sidebar-footer">
          <img src={Smilies} alt="smilies" className="smilies-footer" />
        </footer>
      </div>
    );
  }
  return <>{children}</>;
};

LayoutWrapper.propTypes = {
  children: node.isRequired
};

export default LayoutWrapper;
