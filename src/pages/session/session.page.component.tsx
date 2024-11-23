// pages/session/session.page.component.tsx
import React from 'react';
import styles from './session.styles.component.module.scss';
import Timer from '../../components/timer.component';
import Notes from '../../components/notes.component';
import Transcript from '../../components/transcript.component';

const SessionPage: React.FC = () => {
  return (
    <div className={styles.sessionPage}>
      <Timer />
      <Notes />
      <Transcript />
      {/* Other components */}
    </div>
  );
};

export default SessionPage;
