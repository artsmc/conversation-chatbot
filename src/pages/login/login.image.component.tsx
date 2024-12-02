import React from 'react';
import styles from './login.image.style.module.scss';

const LoginImage: React.FC = () => {
  return (
    <div className={styles.imageContainer}>
      <h2>Hey, How can we grow today?</h2>
      <div className={styles.imageWrapper}>
        <img src="https://res.cloudinary.com/artsmc/image/upload/f_auto,q_auto/v1/coach/eof9l9wtt6crrd6hlor7" alt="Profile" className={styles.image} />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
};

export default LoginImage;
