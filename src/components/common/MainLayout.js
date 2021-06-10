import React from 'react';
import { element } from 'prop-types';

const MainLayout = ({ sidebarContent, mainContent }) => (
  <div className="main-layout-container">
    <div className="sidebar-content">{sidebarContent}</div>
    <div className="main-content">{mainContent}</div>
  </div>
);

MainLayout.propTypes = {
  sidebarContent: element.isRequired,
  mainContent: element.isRequired
};

export default MainLayout;
