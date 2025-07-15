'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags: string[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleItemClick = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag === 'All' ? 'All' : tag}`}
                className={css.menuLink}
                onClick={handleItemClick}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
