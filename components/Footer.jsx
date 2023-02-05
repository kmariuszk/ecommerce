import React from 'react'
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai'
import Link from 'next/link';

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
          <p>Sign Up For Newsletter!</p>
          <input className='Footer--input'/>
        </div>

        <div className='Footer--vertical-line' />

        <div className='Footer--action-buttons'>
          {actionButtons}
        </div>

        <div className='Footer--vertical-line' />

        <div className='Footer--social-media'>
          <AiOutlineFacebook className='Footer-element' size={40}/>
          <AiOutlineTwitter className='Footer-element' size={40}/>
          <AiOutlineInstagram className='Footer-element' size={40}/>
        </div>
      </div>
    </section>
  )
}

export default Footer