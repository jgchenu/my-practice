import React, { useCallback, useMemo, Suspense, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import styles from './style.less';

const defaultLinks: LinkItem[] = [
  { to: '/messages', text: 'Messages' },
  { to: '/tasks', text: 'Tasks' },
  { to: '/demo', text: 'Demo' },
  { to: '/redux-demo', text: 'Tasks' },
  { to: '/react-app', text: 'Sub React App' },
];

type LinkItem = {
  to: string;
  text: string;
  children?: LinkItem[];
};

function Dashboard() {
  const [links, setLinks] = useState(defaultLinks);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('links', (e: CustomEvent<{ activeRule: string; links: LinkItem[] }>) => {
      console.log(e.detail);
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
                  {item.text}
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
                        {subItem.text}
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
