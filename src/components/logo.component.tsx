import React from 'react';
import styles from './logo.style.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
        <span>
            <object data="/public/images/logo_ico.svg" type="image/svg+xml">
                <img src="/public/images/logo_ico.png" alt="Logo Icon" />
            </object>
            Leverage
        </span>
        <span>
            <small>AI COACHING</small>
        </span>

    </div>
  );
};

export default Logo;
