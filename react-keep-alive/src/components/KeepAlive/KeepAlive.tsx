import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

function KeepAlive() {
  const element = useOutlet();
  const { pathname } = useLocation();
  const [cache, setCache] = useState<Record<string, ReactElement | null>>({});
  const cacheRef = useRef(cache);
  cacheRef.current = cache;

  useEffect(() => {
    if (!cacheRef.current[pathname]) {
      setCache((prev) => ({ ...prev, [pathname]: element }));
    }
  }, [element, pathname]);

  return (
    <div>
      {Object.entries(cache).map(([key, component]) => (
        <div key={key} style={{ display: pathname === key ? 'block' : 'none' }}>
          {component}
        </div>
      ))}
    </div>
  );
}

export { KeepAlive };
