import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai';

import { useRouter } from 'next/router';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const navLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
];

function Header() {
  const {
    showCart, setShowCart, searchPhrase, setSearchPhrase,
  } = useStateContext();
  const router = useRouter();

  const [isShrunk, setShrunk] = useState(false);
  const [isSearching, setSearching] = useState(false);

  const handleSearchClick = () => {
    if (searchPhrase !== '') {
      router.push('/products');
    } else {
      setSearching((prevSearching) => !prevSearching);
    }
  };

  const handleQueryChange = (event) => {
    setSearchPhrase(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push('/products');
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setShrunk((prevIshrunk) => {
        if (
          !prevIshrunk
          && (document.body.scrollTop > 70
            || document.documentElement.scrollTop > 70)
        ) {
          return true;
        }

        if (
          prevIshrunk
          && document.body.scrollTop < 4
          && document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return prevIshrunk;
      });
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const actionButtons = navLinks.map((item, index) => (
    <Link className="Header--action-buttons" key={index} href={item[1]}>{item[0]}</Link>
  ));

  return (
    <div className={`Header ${isShrunk && 'Header--scrolled'}`}>
      <Link className="Header--title-button" href="/">
        <h1 className="Header--title">
          TECH-HUB
        </h1>
      </Link>

      <nav className="Header--buttons-container">
        {actionButtons}

        <input
          className={`Header--search ${isSearching && 'active'}`}
          type="text"
          placeholder="What are you looking for?"
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          value={searchPhrase}
        />

        <button
          type="button"
          className="Header--search-button"
          onClick={handleSearchClick}
        >
          <AiOutlineSearch size={18} />
        </button>

        <div
          role="presentation"
          className="Header--shopping-bag"
          onClick={() => {
            setShowCart(true);
          }}
        >
          <AiOutlineShopping size={18} />
        </div>
      </nav>

      {showCart && <Cart />}
    </div>
  );
}

export default Header;
