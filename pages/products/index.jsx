import React from 'react';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const differentSorts = ['Price - high to low', 'Price - low to high'];

function Products({ products, categories }) {
  const uniqueBrands = findUniqueBrands(products);
  const maxPrice = findMaxPrice(products);
  const initialCategory = findInitialCategory(useRouter().query);

  const [filters, setFilters] = useState({
    sortBy: differentSorts[0],
    category: initialCategory,
    price: maxPrice,
    brands: uniqueBrands.map((brand) => ({
      name: brand,
      display: false
    })),
  })

  // Initially display all of the products
  const [toDisplayProducts, setToDisplayProducts] = useState(
    products.map((product) => ({ ...product, display: true }))
  );

  function handleSortChange(event) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: event.target.value,
    }))
  }

  function hanglePriceChange(event) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: event.target.value,
    }));
  }

  function handleCategoryChange(event) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }))
  }

  function handleBrandChange(id) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brands: prevFilters.brands.map((brand, brandId) => {
        if (id === brandId) return { ...brand, display: !brand.display };
        else return brand;
      })
    }))
  }

  useEffect(() => {
    setToDisplayProducts(() => products.map((product) => {
      if (isSuitableProduct(product, filters)) {
        return ({
          ...product,
          display: true,
        })
      } else {
        return ({
          ...product,
          display: false,
        })
      }
    }).sort((p1, p2) => {
      if (filters.sortBy === 'Price - low to high') return p1.price > p2.price;
      else return p1.price < p2.price;
    }));

  }, [filters]);

  function isSuitableProduct(product, filters) {
    // Price filter
    if (product.price > filters.price) return false;

    // Category filter
    if (filters.category !== 'All') {
      if (product.category !== filters.category) return false;
    }

    // Brands filter
    if (isAnyBrandChosen(filters.brands)) {
      if (filters.brands.find((brand) => brand.name === product.brand).display === false) return false;
    }

    return true;
  }

  function isAnyBrandChosen(brands) {
    if (brands.find((brand) => brand.display) === undefined) return false;
    return true;
  }

  return (
    <div className='products'>
      <div className='products--sort-by'>
        <p>Sort by: </p>
        <select onChange={handleSortChange}>
          {
            differentSorts.map((option, index) => (
              <option key={index}>
                {option}
              </option>
            ))
          }
        </select>
      </div>
      <div className='products--container'>
        <div className='products--filters'>
          <form>
            <div className='products--price'>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={filters.price}
                className="products--price-bar"
                id="myRange"
                onChange={hanglePriceChange}
              />
            </div>

            <div className='products--categories'>
              Products-categories
              <select
                type="select"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option>
                  All
                </option>
                {
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className='products--brand'>
              <ul>
                Products-brands
                {filters.brands.map((brand, index) => {
                  return (
                    <li key={index}>
                      <div>
                        <input
                          type="checkbox"
                          id={index}
                          name={brand.name}
                          value={brand.name}
                          checked={brand.display}
                          onChange={() => handleBrandChange(index)}
                        />
                        <label htmlFor={index}>{brand.name}</label>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </form>
        </div>
        <div className='products--products-list'>
          {
            toDisplayProducts.filter((product) => product.display).map((product) => (
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
  const productsRes = await fetch('http://localhost:3000/api/products');
  const { data: products } = await productsRes.json();

  const categoriesRes = await fetch('http://localhost:3000/api/categories');
  const { data: categories } = await categoriesRes.json();

  return { products, categories };
};

function findUniqueBrands(products) {
  return [...new Set(products.map(product => product.brand))];
}

function findMaxPrice(products) {
  return products.reduce((acc, value) => {
    return (acc = acc.price > value.price ? acc.price : value.price);
  });
}

function findInitialCategory(query) {
  if (query.category) {
    return query.category;
  } else {
    return 'All'
  }
}

export default Products