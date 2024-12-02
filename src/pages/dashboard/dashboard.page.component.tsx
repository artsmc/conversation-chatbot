// pages/dashboard/dashboard.page.component.tsx
import React, { useState } from 'react';
import styles from './dashboard.styles.component.module.scss';
import Nav from '../../components/nav.component';
import Avatars from '../../components/avatars.component';
import Notes from '../../components/notes.component';
import Modal from '../../components/modal.component';
import { Avatar } from '../../interfaces/avatar.interface';

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  // Function to handle avatar click
  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAvatar(null);
  };

  return (
    <div className={styles.dashboardPage}>
      <Nav />
      <Avatars onAvatarClick={handleAvatarClick} />
      <Notes />
      {isModalOpen && selectedAvatar && (
        <Modal avatar={selectedAvatar} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DashboardPage;
