import { uniqueId } from 'lodash-es';
import React, { createContext, memo, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

type CachedItem = { uniqueId: string; element: ReactElement };
const KeepItemContext = createContext({});
const KeepAliveItem = memo((props: CachedItem) => {
  return <KeepItemContext.Provider value={props.uniqueId}>{props.element}</KeepItemContext.Provider>;
});

KeepAliveItem.displayName = 'KeepAliveItem';

function KeepAlive() {
  const outlet = useOutlet();
  // const matches = useMatch('/detail/:id');
  // console.log('matches', matches);
  const { pathname } = useLocation();

  const [flag, setFlag] = useState(false);
  const cacheRef = useRef<Map<string, CachedItem>>(new Map());

  const rerender = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  if (!cacheRef.current.get(pathname) && outlet) {
    cacheRef.current.set(pathname, {
      uniqueId: uniqueId(),
      element: React.cloneElement(outlet),
    });
  }

  const cachedEntries = useMemo(() => {
    return Array.from(cacheRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, pathname]);

  console.log(cachedEntries, 'cachedEntries');

  return (
    <div>
      {cachedEntries.map(([key, cachedItem]) => (
        <div key={key} style={{ display: pathname === key ? 'block' : 'none' }}>
          {<KeepAliveItem {...cachedItem} key={cachedItem.uniqueId} />}
        </div>
      ))}
      <button
        onClick={() => {
          const cachedItem = cacheRef.current.get(pathname);
          if (cachedItem) {
            cachedItem.uniqueId = uniqueId();
            rerender();
          }
        }}
      >
        clear cache
      </button>
    </div>
  );
}

export { KeepAlive };
