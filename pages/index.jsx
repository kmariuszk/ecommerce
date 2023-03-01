import React from 'react';
import fetch from 'isomorphic-unfetch';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const homepageDescription = 'Find the perfect gaming gear for your play style with our selection of laptops and accessories.';

function Index({ products, categories }) {
  return (
    <>
      <Hero />

      <section className="homepage--best-sellers">
        <h1 className="homepage--section-title">
          Top Selling
        </h1>

        <h3 className="homepage--section-description">
          This week&apos;s most popular products
        </h3>

        <div className="homepage--best-sellers--product-container">
          {
            products.sort((p1, p2) => {
              if (p1.price < p2.price) {
                return 1;
              } if (p1.price > p2.price) {
                return -1;
              }
              return 0;
            }).slice(0, 4).map((product) => (
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

      <section className="homepage--categories">
        <h1 className="homepage--section-title">
          Categories
        </h1>

        <h3 className="homepage--section-description">
          {homepageDescription}
        </h3>

        <div className="homepage--categories--categories-container">
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
  );
}

Index.getInitialProps = async () => {
  const productsRes = await fetch('https://ecommerce-zeta-jade.vercel.app/api/products');
  const { data: products } = await productsRes.json();

  const categoriesRes = await fetch('https://ecommerce-zeta-jade.vercel.app/api/categories');
  const { data: categories } = await categoriesRes.json();

  return { products, categories };
};

export default Index;
