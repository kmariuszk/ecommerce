import React from 'react'
import Image from 'next/image'
import hero from '../public/hero.png'
import headphones from '../public/headphones.png'
import keyboard from '../public/keyboard.png'

function index() {
  return (
    <>
      <section className='homepage--hero-container'>
        <Image className='homepage--hero-image' alt='hero' src={hero}></Image>
        <div className='homepage--hero-text-containger'>
          <h1 className='homepage--hero-title'>Find your perfect laptop</h1>
          <h3 className='homepage--hero-tagline'>Powerful Performance, Portability and Style</h3>
          <button className='homepage--action-button'>Explore Laptops</button>
        </div>
      </section>
      <section className='homepage--features'>
        <Image className='homepage--headphones-image homepage--image' alt='headphones' src={headphones}/>
        <p className='homepage--features-description'>Our gaming accessories enhance your gaming experience with high-precision controllers, surround sound headphones, and ergonomic mouse pads. Responsive buttons and triggers, clear audio, and comfortable mouse surfaces take your gaming to the next level. Ideal for casual and competitive gamers.</p>
        <Image className='homepage--keyboard-image homepage--image' alt='keyboard' src={keyboard}></Image>
      </section>
    </>
  )
}

export default index