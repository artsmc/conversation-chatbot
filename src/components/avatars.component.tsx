// components/avatars.component.tsx
import React, { useEffect, useState } from 'react';
import styles from './avatars.style.module.scss';
import api from '../services/api';
import { Avatar } from '../interfaces/avatar.interface';
import 'animate.css';

interface AvatarsProps {
  onAvatarClick: (avatar: Avatar) => void;
}

const Avatars: React.FC<AvatarsProps> = ({ onAvatarClick }) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        setLoading(true);
        const response = await api.get('/avatar/all');
        setAvatars(response.data);
      } catch (err) {
        setError('Failed to load avatars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.avatarsGrid}>
      {avatars.map((avatar) => (
        <div
          key={avatar._id}
          className={`${styles.card} animate__animated animate__fadeInUp`}
          onClick={() => onAvatarClick(avatar)}
        >
          <img src={getImageUrl(avatar.imageID)} alt={avatar.clean_name} className={styles.image} />
          <div className={styles.desc}>
            <h3>{avatar.clean_name}</h3>
            <p>{avatar.skills?.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
//src='https://res.cloudinary.com/artsmc/image/upload/f_auto,q_auto/v1/{{avatar.imageID}}' alt="{{avatar.clean_name}}"
// Helper function to construct the image URL
const getImageUrl = (imageID: string) => {
  return `https://res.cloudinary.com/artsmc/image/upload/f_auto,q_auto/v1/${imageID}`; // Adjust the path according to your setup
};

export default Avatars;
