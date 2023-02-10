import React from 'react';
import ProductCard from '../components/ProductCard';

function Products({ products }) {
  return (
    <div className='products'>
      <div className='products--container'>
        <div className='products--filters'>
          Filters
        </div>
        <div className='products--products-list'>
          {
            products.sort(
              (p1, p2) =>
                (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
            ).map((product) => (
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
      </div>
    </div>
  )
}

Products.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const { data } = await res.json();

  return { products: data };
};


export default Products