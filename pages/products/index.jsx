import React, { useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { TbMoodEmpty } from 'react-icons/tb';
import ProductCard from '../../components/ProductCard';
import { useStateContext } from '../../context/StateContext';

const differentSorts = ['Price - high to low', 'Price - low to high'];
const emptyListText = 'Sorry, we couldn\'t find any products that match your filters. Please try broadening your search criteria.';

const findUniqueBrands = (products) => [...new Set(products.map((product) => product.brand))];

const findMaxPrice = (products) => {
  let maxPrice = 0;

  products.forEach((product) => {
    maxPrice = Math.max(maxPrice, product.price);
  });

  return maxPrice;
};

const findInitialCategory = (router, categories) => {
  let initialCategory = router.query.category;

  if (
    !initialCategory
    || categories.find((category) => category.name === initialCategory) === undefined
  ) initialCategory = 'All';

  return initialCategory;
};

function Products({ products, categories }) {
  const { searchPhrase } = useStateContext();

  const uniqueBrands = useMemo(() => findUniqueBrands(products), [products]);
  const router = useRouter();
  const initialCategory = useMemo(() => findInitialCategory(router, categories), []);
  const maxPrice = findMaxPrice(products);

  const [filters, setFilters] = useState({
    sortBy: differentSorts[0],
    category: initialCategory,
    price: maxPrice,
    query: searchPhrase,
    brands: uniqueBrands.map((brand) => ({
      name: brand,
      display: false,
    })),
  });

  const [toDisplayProducts, setToDisplayProducts] = useState({
    products, quantity: products.length,
  });

  const handleSortChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: event.target.value,
    }));
  };

  const hanglePriceChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  const handleBrandChange = (id) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brands: prevFilters.brands.map((brand, brandId) => {
        if (id === brandId) return { ...brand, display: !brand.display };
        return brand;
      }),
    }));
  };

  const isAnyBrandChosen = (brands) => {
    if (brands.find((brand) => brand.display) === undefined) return false;
    return true;
  };

  const isSuitableProduct = (product) => {
    if (product.price > filters.price) return false;

    if (filters.category !== 'All') {
      if (product.category !== filters.category) return false;
    }

    if (isAnyBrandChosen(filters.brands)) {
      if (filters.brands.find((brand) => brand.name === product.brand).display === false) {
        return false;
      }
    }

    if (filters.query !== '') {
      if (!product.title.toLowerCase().includes(filters.query.toLowerCase())
        && !product.description.toLowerCase().includes(filters.query.toLowerCase())
      ) return false;
    }

    return true;
  };

  useEffect(() => {
    setToDisplayProducts(() => {
      let counter = 0;
      return {
        products: products.map((product) => {
          if (isSuitableProduct(product)) {
            counter += 1;
            return ({
              ...product,
              display: true,
            });
          }
          return ({
            ...product,
            display: false,
          });
        }).sort((p1, p2) => {
          if (filters.sortBy === 'Price - low to high') return p1.price > p2.price;
          return p1.price < p2.price;
        }),
        quantity: counter,
      };
    });
  }, [filters]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: searchPhrase,
    }));
  }, [searchPhrase]);

  return (
    <div className="products">
      <div className="products--sort-by">
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
      <div className="products--container">
        <div className="products--filters">
          <form>
            <div className="products--price">
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
              <p>
                Prices up to $
                {filters.price}
              </p>
            </div>

            <div className="products--categories">
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
                    >
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="products--brand">
              <h4>Brands</h4>

              {filters.brands.map((brand, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={index}
                    name={brand.name}
                    checked={brand.display}
                    onChange={() => handleBrandChange(index)}
                  />
                  <label htmlFor={index}>{brand.name}</label>
                </div>
              ))}

            </div>
          </form>
        </div>
        <div className="products--products-list">
          {
            toDisplayProducts.quantity !== 0
              ? toDisplayProducts.products.filter((product) => product.display).map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  image={product.imagesLinks[0]}
                  price={product.price}
                />
              )) : (
                <div className="products--empty-list">
                  <TbMoodEmpty className="icon" />
                  <h1>
                    {emptyListText}
                  </h1>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}

Products.getInitialProps = async () => {
  const productsRes = await fetch('https://ecommerce-zeta-jade.vercel.app/api/products');
  let { data: products } = await productsRes.json();

  const categoriesRes = await fetch('https://ecommerce-zeta-jade.vercel.app/api/categories');
  const { data: categories } = await categoriesRes.json();

  products = products.map((product) => ({
    ...product,
    display: true,
    category: categories.find((category) => category._id === product.category).name,
  }));

  return { products, categories };
};

export default Products;
