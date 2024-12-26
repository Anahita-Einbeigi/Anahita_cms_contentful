'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { getNavigationItems } from '../lib/navigation';
import '../src/styles/navigation.css';

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
