import React, { useState } from 'react';
import styles from './avatar.style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AvatarProps {
  startCall: () => Promise<void>;
  endCall: () => void;
  connected: boolean;
  connecting: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ startCall, endCall, connected, connecting }) => {
  const [inCall, setInCall] = useState(false);
  const chat = useSelector((state: RootState) => state.chat.chat);
  const conversation = useSelector((state: RootState) => state.chat.conversation);

  const handleCall = async () => {
    if (inCall) {
      endCall();
    } else {
      await startCall();
    }
    setInCall(!inCall);
  };

  const getImageUrl = () => {
    return `https://res.cloudinary.com/artsmc/image/upload/f_auto,q_auto/v1/${chat.avatar.imageID}`;
  };

  return (
    <div className={styles.avatar} onClick={handleCall}>
      <div className={styles.status}>
        <div className={styles.text}>{connected ? 'Connected' : connecting ? 'Connecting' : 'Disconnected'}</div>
        <div className={styles.indicator} style={{ backgroundColor: connected ? 'transparent' : connecting ? 'orange' : 'transparent' }}></div>
      </div>
      <img
        src={getImageUrl()}
        alt="Profile"
        className={styles.image}
        style={{
          boxShadow: `0 0 20px 20px rgba(19, 222, 212, ${conversation.volumeLevel === 0 ? 0.2 : conversation.volumeLevel + .1})`
        }}
      />
    </div>
  );
};

export default Avatar;
