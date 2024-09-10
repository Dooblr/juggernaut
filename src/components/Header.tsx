import React from 'react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <nav className="header">
      <ul>
        <li onClick={() => onNavigate('services')}>Services</li>
        <li onClick={() => onNavigate('events')}>Events</li>
        <li onClick={() => onNavigate('Contact')}>Portfolio</li>
        <li onClick={() => onNavigate('About')}>Contact</li>
      </ul>
    </nav>
  );
};

export default Header;
