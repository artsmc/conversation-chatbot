// pages/dashboard/dashboard.page.component.tsx
import React from 'react';
import styles from './dashboard.styles.component.module.scss';
import Nav from '../../components/nav.component';
import Avatars from '../../components/avatars.component';

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardPage}>
      <Nav />
      <Avatars />
      {/* Other components */}
    </div>
  );
};

export default DashboardPage;
