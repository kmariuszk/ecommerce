import React from 'react';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/router";

const differentSorts = ['Price - high to low', 'Price - low to high'];

function Products({ products, categories }) {
  const uniqueBrands = useMemo(() => findUniqueBrands(products), [products]);
  const maxPrice = findMaxPrice(products);
  const router = useRouter();
  const initialCategory = findInitialCategory(router, categories);

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
  const [toDisplayProducts, setToDisplayProducts] = useState({ products: products, quantity: products.length });

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
    setToDisplayProducts(() => {
      let counter = 0;
      return {
        products: products.map((product) => {
        if (isSuitableProduct(product, filters)) {
          counter += 1;
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
      }), quantity: counter}
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <option key={index} value={option}>
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
              <h4>Price</h4>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={filters.price}
                className="products--price-bar"
                id="myRange"
                onChange={hanglePriceChange}
              />
              <p>Prices up to ${filters.price}</p>
            </div>

            <div className='products--categories'>
              <h4>Category</h4>
              <select
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option>
                  All
                </option>
                {
                  categories.map((category) => (
                    <option
                      key={category.name}
                      product={category.name}
                    >
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className='products--brand'>
              <h4>Brands</h4>

              {filters.brands.map((brand, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={index}
                      name={brand.name}
                      product={brand.name}
                      checked={brand.display}
                      onChange={() => handleBrandChange(index)}
                    />
                    <label htmlFor={index}>{brand.name}</label>
                  </div>
                )
              })}

            </div>
          </form>
        </div>
        <div className='products--products-list'>
          {
            toDisplayProducts.quantity !== 0 ?
            toDisplayProducts.products.filter((product) => product.display).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                image={product.imagesLinks[0]}
                price={product.price}
              />
            )) : (
              <h1>Unfortunately, no products...</h1>
            )
          }
        </div>
      </div>
    </div>
  )
}

Products.getInitialProps = async () => {
  const productsRes = await fetch('http://localhost:3000/api/products');
  let { data: products } = await productsRes.json();

  const categoriesRes = await fetch('http://localhost:3000/api/categories');
  const { data: categories } = await categoriesRes.json();

  products = products.map((product) => ({
    ...product,
    display: true,
    category: categories.find((category) => category._id === product.category).name
  }))

  return { products, categories };
};

function findUniqueBrands(products) {
  return [...new Set(products.map(product => product.brand))];
}

function findMaxPrice(products) {
  let maxPrice = 0;

  products.forEach((product) => maxPrice = Math.max(maxPrice, product.price))

  return maxPrice;
}

function findInitialCategory(router, categories) {
  let initialCategory = router.query.category;
  if (
    !initialCategory ||
    categories.find((category) => category.name === initialCategory) === undefined
  ) {
    initialCategory = "All";
  }
  return initialCategory;
}

export default Products