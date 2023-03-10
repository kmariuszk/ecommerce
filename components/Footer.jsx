import React, { useState } from 'react';
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai';

import Link from 'next/link';
import { toast } from 'react-hot-toast';

const navLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
];

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const actionButtons = navLinks.map((item, index) => (
    <Link className="Footer-element" key={index} href={item[1]}>{item[0]}</Link>
  ));

  const handleNewsletterInputChange = (event) => {
    setNewsletterEmail(event.target.value);
  };

  const handleEmailSubmission = () => {
    const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (mailRegex.test(newsletterEmail)) {
      setNewsletterEmail('');
      toast.success('Email has been saved!');
    } else {
      toast.error('Incorrect email address!');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEmailSubmission();
    }
  };

  return (
    <section className="Footer">
      <div className="Footer--container">
        <div className="Footer--newsletter">
          <h3 className="Footer--newsletter-title">
            Join the newsletter!
          </h3>
          <p className="Footer--newsletter-description">
            Subscribe to get information about new products.
          </p>
          <input
            className="Footer--newsletter-input"
            placeholder="Your email address"
            value={newsletterEmail}
            onChange={handleNewsletterInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="Footer--newsletter-button"
            onClick={handleEmailSubmission}
          >
            SUBSCRIBE
          </button>
        </div>

        <div className="Footer--vertical-line" />

        <div className="Footer--action-buttons">
          {actionButtons}
        </div>

        <div className="Footer--vertical-line" />

        <div className="Footer--social-media">
          <Link href="https://www.facebook.com/">
            <AiOutlineFacebook className="Footer-element" size={40} />
          </Link>
          <Link href="https://www.twitter.com/">
            <AiOutlineTwitter className="Footer-element" size={40} />
          </Link>
          <Link href="https://www.instagram.com/">
            <AiOutlineInstagram className="Footer-element" size={40} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
