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
          <h1 className='homepage--hero-title'>Find Your Perfect Laptop</h1>
          <h3 className='homepage--hero-tagline'>Powerful Performance, Portability and Style</h3>
          <button className='homepage--action-button'>Explore Laptops</button>
        </div>
      </section>
      <section className='homepage--features'>
        <Image className='homepage--headphones-image homepage--image' alt='headphones' src={headphones}/>
        <p className='homepage--features-description'>Our gaming accessories offer high-precision controls, surround sound, and ergonomic design for an immersive gaming experience. Ideal for casual and competitive gamers alike.</p>
        <Image className='homepage--keyboard-image homepage--image' alt='keyboard' src={keyboard}></Image>
      </section>
    </>
  )
}

export default index