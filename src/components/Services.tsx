import React from 'react';
import './Services.scss';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="services">

      {/* Services Section */}
      <div className="services-container">
        <h1>Our Services</h1>
        <div className="services-grid">
          <div className="service-card">
            <h2>Consumer Engagement</h2>
            <p>Boost your brand's interaction with customized consumer engagement strategies.</p>
          </div>
          <div className="service-card">
            <h2>Websites and Apps</h2>
            <p>We create responsive, high-performance websites and apps tailored to your business needs.</p>
          </div>
          <div className="service-card">
            <h2>SEO</h2>
            <p>Improve your search rankings with our advanced SEO strategies and solutions.</p>
          </div>
          <div className="service-card">
            <h2>Promotional Video</h2>
            <p>Engage your audience with high-quality promotional videos that drive conversions.</p>
          </div>
          <div className="service-card">
            <h2>Music Composition and Production</h2>
            <p>Good tunes make your content more enjoyable. Our team can create customized music that fits your brand and drives sales.</p>
          </div>
          <div className="service-card">
            <h2>Audio Engineering</h2>
            <p>Have a great song and need to give it a boost? We have you covered.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
