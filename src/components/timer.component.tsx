import React from 'react';
import styles from './timer.style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { updateChat } from '../store/actions/chat.actions';

const Timer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chat = useSelector((state: RootState) => state.chat.chat);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('0:00');

  const calculateTimeRemaining = (startTime: number, duration: number) => {
    const now = new Date().getTime();
    const conversationDuration = duration * 60 * 1000;
    const endTime = startTime + conversationDuration;
    const elapsed = now - startTime;
    const total = endTime - startTime;

    if (elapsed >= total) {
      return {
        progress: 100,
        timeRemaining: '00:00'
      };
    }

    const minutes = Math.floor((total - elapsed) / 60000);
    const seconds = Math.floor((total - elapsed) % 60000 / 1000);
    return {
      progress: Math.floor(Math.min((elapsed / total) * 100, 100)),
      timeRemaining: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };
  };

  useEffect(() => {
    setProgress(0); // Reset progress to 0 when chat changes
    setTimeRemaining('0:00');
    if (chat?.timestarted && chat?.duration > 0) {
      const startTime = new Date(chat.timestarted).getTime();
      const interval = setInterval(() => {
        const { progress, timeRemaining } = calculateTimeRemaining(startTime, chat.duration);
        setProgress(progress);
        setTimeRemaining(timeRemaining);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [chat, dispatch]);

  return (
    <div className={styles.timer}>
      <div className={styles.progressBar}>
        <div className={`${styles.progress} ${progress === 100 ? styles.complete : ''}`} style={{ width: `${progress}%` }}></div>
        <div className={styles.timeRemaining}>
          {timeRemaining}
        </div>
      </div>
    </div>
  );
};

export default Timer;
