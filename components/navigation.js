'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNavigationItems } from '../lib/navigation';
import '../src/styles/navigation.css';

export default function Navigation() {
  const [navItems, setNavItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const items = await getNavigationItems();
      setNavItems(items);
    }
    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu state:', !isMenuOpen);
  };

  return (
    <nav className="navigation">
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.sys.id}>
            <Link href={item.fields?.slug || '/'}>
              {item.fields?.rubric || 'Unnamed'}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
