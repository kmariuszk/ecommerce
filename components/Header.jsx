import React from 'react'
import Link from 'next/link'
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import { useState, useEffect } from 'react'

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
];

function Header() {
  const [isShrunk, setShrunk] = useState(false);

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
        <FaSearch />
        <Link className='Header--shopping-bag' href='/basket'>
          <FaShoppingBag />
        </Link>
      </nav>
    </div >
  )
}

export default Header