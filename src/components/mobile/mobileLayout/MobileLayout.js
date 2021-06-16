import React, { useState } from 'react';
import { element } from 'prop-types';
import './mobileLayout.scss';

const MobileLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="mobile-layout-container">
      <div className="top-nav">
        <a className="icon burger-menu" onClick={toggleMenu}>
          <i className="fas fa-bars" />
        </a>
        <a href="#home" className="nav-title">
          TARGET
        </a>
        <a className="icon">
          <i className="fas fa-map-marker-alt" />
        </a>
      </div>
      {isMenuOpen && (
        <div className="top-nav">
          <a href="#about">About</a>
        </div>
      )}
      <div className="mobile-content">{children}</div>
    </div>
  );
};

MobileLayout.propTypes = {
  children: element
};

export default MobileLayout;
