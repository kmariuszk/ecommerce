import React from 'react'
import Image from 'next/image'
import hero from '../public/hero.png'
import headphones from '../public/headphones.png'
import keyboard from '../public/keyboard.png'
import ProductCard from '../components/ProductCard'
import fetch from 'isomorphic-unfetch';

function Index({ products }) {
  return (
    <>
      <section className='homepage--hero-container'>
        <Image className='homepage--hero-image' alt='hero' src={hero} unoptimized={true} priority></Image>
        <div className='homepage--hero-text-container'>
          <h1 className='homepage--hero-title'>
            Find Your Perfect Laptop
          </h1>
          <h3 className='homepage--hero-tagline'>
            Powerful Performance, Portability and Style
          </h3>
          <button className='homepage--action-button'>
            Explore Laptops
          </button>
        </div>
      </section>

      <section className='homepage--features'>
        <Image
          className='homepage--headphones-image homepage--image'
          alt='headphones'
          src={headphones}
        />
        <p className='homepage--features-description'>
          Our gaming accessories offer high-precision controls, surround sound, and ergonomic design for an immersive gaming experience. Ideal for casual and competitive gamers alike.
        </p>
        <Image
          className='homepage--keyboard-image homepage--image'
          alt='keyboard'
          src={keyboard}
        />
      </section>

      <section className='homepage--best-sellers'>
        <h1 className='homepage--best-sellers--title'>
          Top Selling
        </h1>
        <h3 className='homepage--best-sellers--description'>
          This week&apos;s most popular products
        </h3>
        <div className='homepage--best-sellers--product-container'>
          {
            products.sort(
              (p1, p2) =>
                (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
            ).slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                image={product.imagesLinks[0]}
                price={product.price}
              />
            ))
          }
        </div>
      </section>

      <section className='homepage--categories'>
        {/* TODO */}
      </section>
    </>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const { data } = await res.json();

  return { products: data };
};

export default Index