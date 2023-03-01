import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import hero from '../public/hero.png';
import headphones from '../public/headphones.png';
import keyboard from '../public/keyboard.png';

function Hero() {
  const featureDescription = 'Our gaming accessories offer high-precision controls, surround sound, and ergonomic design for an immersive gaming experience. Ideal for casual and competitive gamers alike.';

  return (
    <>
      <section className="homepage--hero-container">
        <Image className="homepage--hero-image" alt="hero" src={hero} unoptimized priority />
        <div className="homepage--hero-text-container">
          <h1 className="homepage--hero-title">
            Find Your Perfect Laptop
          </h1>
          <h3 className="homepage--hero-tagline">
            Powerful Performance, Portability and Style
          </h3>
          <Link className="homepage--action-button" href="/products?category=Laptops">
            Explore Laptops
          </Link>
        </div>
      </section>

      <section className="homepage--features">
        <Image
          className="homepage--headphones-image homepage--image"
          alt="headphones"
          src={headphones}
        />
        <p className="homepage--features-description">
          {featureDescription}
        </p>
        <Image
          className="homepage--keyboard-image homepage--image"
          alt="keyboard"
          src={keyboard}
        />
      </section>
    </>
  );
}

export default Hero;
