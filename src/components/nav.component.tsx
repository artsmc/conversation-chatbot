import React from 'react';
import styles from './nav.style.module.scss';
import Logo from './logo.component';

const Nav: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Logo />
      </div>
    </nav>
  );
};

export default Nav;
