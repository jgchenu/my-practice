import React, { useCallback, useMemo, Suspense, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import styles from './style.less';

const defaultLinks: LinkItem[] = [
  { to: '/messages', label: 'Messages' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/demo', label: 'Demo' },
  { to: '/redux-demo', label: 'Tasks' },
  { to: '/react-app', label: 'Sub React App' },
  { to: '/react-app2', label: 'Sub React App2' },
  { to: '/react-app3', label: 'Sub React App3' },
];

type LinkItem = {
  to: string;
  label: string;
  children?: LinkItem[];
};

function Dashboard() {
  const [links, setLinks] = useState(defaultLinks);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('links', (e: CustomEvent<{ activeRule: string; links: LinkItem[] }>) => {
      // console.log(e.detail);
      const data = e.detail;
      setLinks((prev) =>
        prev.map((item) => {
          if (item.to !== data.activeRule) {
            return item;
          }
          return {
            ...item,
            children: data.links,
          };
        }),
      );
    });
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>header</header>
      <section className={styles.content}>
        <aside className={styles.aside}>
          <ul>
            {links.map((item) => (
              <li key={item.to}>
                <span
                  onClick={(e) => {
                    navigate(item.to);
                  }}
                >
                  {item.label}
                </span>
                <ul>
                  {item.children &&
                    item.children.map((subItem) => (
                      <li
                        key={subItem.to}
                        onClick={(e) => {
                          navigate(subItem.to);
                        }}
                      >
                        {subItem.label}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>
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
