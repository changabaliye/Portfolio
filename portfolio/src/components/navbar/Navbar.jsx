import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { getImageUrl } from '../../utils'
// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, fas, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);



export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }


  const closeMenuOnScroll = () => {
    setMenuOpen(false); // Close the menu
  };

  useEffect(() => {
    // Attach scroll event listener to the window
    window.addEventListener("scroll", closeMenuOnScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href='/'>Chandransu</a>
      <div className={styles.menu}>
        <div className={styles.icons} >
          <FontAwesomeIcon className={styles.icon} onClick={() => toggleTheme()}
            style={{ display: `${theme == 'light' ? 'block' : 'none'}` }}
            icon={faMoon} size='2x' color='black' />
          <FontAwesomeIcon className={styles.icon} onClick={() => toggleTheme()}
            style={{ display: `${theme == 'dark' ? 'block' : 'none'}` }}
            icon={faSun} size='2x' color='rgb(255,197,2)' />
        </div>

        <img className={styles.menuBtn} src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")} alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)} />

        <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(!menuOpen)}

        >
          <li><a href="#about">About</a></li>
          <li><a href="#expirence">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

      </div>
    </nav>
  )
}
