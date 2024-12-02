// components/modal.component.tsx
import React, { useState } from 'react';
import styles from './modal.style.module.scss';
import { Avatar } from '../interfaces/avatar.interface';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

interface ModalProps {
  avatar: Avatar;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ avatar, onClose }) => {
  const [sessionName, setSessionName] = useState<string>('');
  const [duration, setDuration] = useState<number>(10); // Default to 10 minutes
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.post(`/chat/${avatar._id}/create`, {
        session_name:sessionName,
        duration,
      });

      const chat = response.data;

      // Store chat object in state or context if needed

      navigate(`/${chat._id}/session`, { state: { chat } });
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'An error occurred';
      toastr.error(`Unable to start session: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Generate options for the duration select
  const durationOptions = [10, 15, 20, 25, 30];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Start Session with {avatar.clean_name}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label><strong>Session Name</strong></label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label><strong>Duration (minutes)</strong></label>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
              {durationOptions.map((option) => (
                <option key={option} value={option}>
                  {option} minutes
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? <div className={styles.loader}></div> : 'Start Session'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
