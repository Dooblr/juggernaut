import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      {/* Top Bar */}
      {/* <div className="top-bar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/site/services">Services</Link></li>
          <li><Link to="/site/about">About</Link></li>
          <li><Link to="/site/contact">Contact</Link></li>
        </ul>
      </div> */}

      {/* Main content area */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
