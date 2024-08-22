import React from 'react';
import './roadmapSlider.scss';

const RoadmapSlider = ({ activeIndex, setActiveIndex }) => {
  const links = [
    {
      label: (
        <>
          <h4>1. Search for Lawyers in Your Area</h4>
          <p>
            Enter the type of lawyer you need (practice area) and your location
            to start browsing profiles
          </p>
        </>
      ),
    },
    {
      label: (
        <>
          <h4>2. Read Reviews from Past Clients</h4>
          <p>
            Get detailed profiles with complete information you need to make a
            hiring decision, including price, reviews, and an unbiased Avvo
            Rating
          </p>
        </>
      ),
    },
    {
      label: (
        <>
          <h4>3. Book a Consultation Online</h4>
          <p>
            Contact an attorney or book a consultation easily through our site
            so you can get the help you need without the stress
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="vertical-slider">
      {links.map((link, index) => (
        <div
          key={index}
          className={`slider-item ${index === activeIndex ? 'active' : ''}`}
        >
          {link.label}
        </div>
      ))}
    </div>
  );
};

export default RoadmapSlider;
