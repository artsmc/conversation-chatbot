import React from 'react';
import styles from './login.image.style.module.scss';

const LoginImage: React.FC = () => {
  return (
    <div className={styles.imageContainer}>
      <h2>Hey, How can we grow today?</h2>
      <div className={styles.imageWrapper}>
        <img src="/path/to/image.jpg" alt="Profile" className={styles.image} />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default LoginImage;
