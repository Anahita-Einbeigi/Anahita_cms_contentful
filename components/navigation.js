'use client'; 

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNavigationItems } from '../lib/navigation';

export default function Navigation() {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const items = await getNavigationItems();
      setNavItems(items);
    }
    fetchData();
  }, []);

  return (
    <nav>
      <ul className="flex gap-4">
      {navItems && navItems.map((item) => (
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