import React from 'react';
import './Contact.scss';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <p>Address: 1234 Example St, Sample City, SC 12345</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows={4} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
