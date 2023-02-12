import React from 'react'
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Link from 'next/Link';

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
];

function Footer() {


  const actionButtons = navLinks.map((item, index) => (
    <Link className='Footer-element' key={index} href={item[1]}>{item[0]}</Link>
  ))

  return (
    <section className='Footer'>
      <div className='Footer--container'>
        <div className='Footer--newsletter'>
          <h3 className='Footer--newsletter-title'>Join the newsletter!</h3>
          <p className='Footer--newsletter-description'>Subscribe to get information about new products.</p>
          <input className='Footer--newsletter-input' placeholder='Your email address'/>
          <button className='Footer--newsletter-button'>SUBSCRIBE</button>
        </div>

        <div className='Footer--vertical-line' />

        <div className='Footer--action-buttons'>
          {actionButtons}
        </div>

        <div className='Footer--vertical-line' />

        <div className='Footer--social-media'>
          <Link href=''>
            <AiOutlineFacebook className='Footer-element' size={40} />
          </Link>
          <Link href=''>
            <AiOutlineTwitter className='Footer-element' size={40} />
          </Link>
          <Link href=''>
            <AiOutlineInstagram className='Footer-element' size={40} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Footer