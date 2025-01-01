'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { getNavigationItems } from '../lib/navigation';
import '../pages/src/styles/navigation.css';

export default function Navigation() {
  const [navItems, setNavItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const items = await getNavigationItems();
      setNavItems(items);
    }
    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Adds and removes event listeners dynamically when the menu is open or closed.
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside); 
    };
  }, [isMenuOpen]);

  return (
    <nav className="navigation" ref={navRef}>
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.sys.id}>
            <Link href={item.fields?.slug || '/'} onClick={handleLinkClick}>
              {item.fields?.rubric || 'Unnamed'}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Static Site Generation (SSG): Hämta navigeringsdata vid byggtiden och skicka det som props till komponenten.
export async function getStaticProps() {
  const navItems = await getNavigationItems();
  return {
    props: {
      navItems: navItems || [], // Returnera en tom array om inget hittas
    },
  };
}
