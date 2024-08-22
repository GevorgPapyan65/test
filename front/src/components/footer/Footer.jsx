import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './footer.scss'; // Make sure to update your CSS file accordingly.

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Legal Advice</li>
            <li>Lawyers Directory</li>
            <li>Consultations</li>
            <li>Legal Forms</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>FAQ</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className="container copyroght">
        <small>© RightAid. All Rights Reserved {currentYear}</small>
      </div>
    </div>
  );
}
