import React from 'react'
import Image from 'next/image'
import hero from '../public/hero.png'
import headphones from '../public/headphones.png'
import keyboard from '../public/keyboard.png'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import fetch from 'isomorphic-unfetch';
import Link from 'next/Link';

function Index({ products, categories }) {
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
          <Link className='homepage--action-button' href='/products?category=Laptop'>
            Explore Laptops
          </Link>
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
        <h1 className='homepage--section-title'>
          Top Selling
        </h1>
        <h3 className='homepage--section-description'>
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
        <h1 className='homepage--section-title'>
          Categories
        </h1>
        <h3 className='homepage--section-description'>
          Find the perfect gaming gear for your play style with our selection of laptops and accessories.
        </h3>
        <div className='homepage--categories--categories-container'>
          {
            categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category.name}
                image={category.imageLink}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

Index.getInitialProps = async () => {
  const productsRes = await fetch('http://localhost:3000/api/products');
  const { data: products } = await productsRes.json();

  const categoriesRes = await fetch('http://localhost:3000/api/categories');
  const { data: categories } = await categoriesRes.json();

  return { products, categories };
};

export default Index