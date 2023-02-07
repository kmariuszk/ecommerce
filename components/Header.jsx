import React from 'react'
import Link from 'next/link'
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
];

// document.getElementByClass("Header--search-button").addEventListener("click", function() {
//   document.getElementByClass("Header--search").focus();
// });

function Header() {
  const [isShrunk, setShrunk] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  function handleSearchClick() {
    setSearching(prevSearching => !prevSearching);
  }

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      // 👇 Get input value
      console.log(query);
      setQuery('');
    }
  };

  // TODO: make user focus on the search bar when they display it.
  // useEffect(() => {
  //   if (isSearching) {
  //     inputRef.current.focus();
  //   }
  // }, [isSearching])

  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 70 ||
            document.documentElement.scrollTop > 70)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actionButtons = navLinks.map((item, index) => (
    <Link className='Header--action-buttons' key={index} href={item[1]}>{item[0]}</Link>
  ))

  return (
    <div className={`Header ${isShrunk && 'Header--scrolled'}`} >
      <Link className='Header--title-button' href='/' >
        <h1 className='Header--title'>TECH-HUB</h1>
      </Link>

      <nav className='Header--buttons-container'>
        {actionButtons}

        <input
          className={`Header--search ${isSearching && 'active'}`}
          type='text'
          ref={inputRef}
          placeholder='What are you looking for?'
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          value={query}
        />

        <button className='Header--search-button' onClick={handleSearchClick}>
          <AiOutlineSearch size={18} />
        </button>

        <div
          className='Header--shopping-bag'
          onClick={() => {
            setShowCart(true);
          }}>
          <AiOutlineShopping size={18} />
        </div>
      </nav>

      {showCart && <Cart />}
    </div>
  )
}

export default Header