import React, { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Popup from '../popup/Popup';
import logo from './bglogo1.png';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleRegistrationSuccess = (username) => {
    setUser(username);
    closePopup();
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <Link to={'/'}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
              <ul className="dropdown">
                <li>
                  <Link to="/mission">Our Mission</Link>
                </li>
                <li>
                  <Link to="/team">Our Team</Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/service">Our Service</NavLink>
              <ul className="dropdown">
                <li>
                  <Link to="/lawyer">Find The Lawyer</Link>{' '}
                  {/* Use Link for navigation */}
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/blog">Blog</NavLink>
              <ul className="dropdown"></ul>
            </li>

            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          {user ? (
            <div className="welcome-message">Welcome, {user}!</div>
          ) : (
            <button className="sign" onClick={openPopup}>
              <PersonIcon style={{ marginRight: '8px' }} />
              Registration
            </button>
          )}
          {isPopupOpen && (
            <Popup
              closeForm={closePopup}
              onRegisterSuccess={handleRegistrationSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
