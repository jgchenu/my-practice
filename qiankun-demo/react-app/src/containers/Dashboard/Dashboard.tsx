import React, { useCallback, useMemo, Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './style.less';

function Dashboard() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>header</header>
      <section className={styles.content}>
        <main className={styles['sub-content']}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <div className={styles.name}></div>
      </section>
    </section>
  );
}

export default Dashboard;
