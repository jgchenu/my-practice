import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';

import Dashboard from '$src/containers/Dashboard';
import Detail from '$src/containers/Detail/Detail';
// import { KeepAlive } from '$src/components/KeepAlive';
import Demo from '$src/containers/Demo';
import { KeepAlive } from '$src/components/KeepAlive';

const routes: RouteObject[] = [
  {
    path: 'detail/:id',
    element: <Detail />,
  },
  {
    path: 'demo',
    element: <Demo />,
  },
];

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="*" element={<KeepAlive />}>
          {routes.map((item) => (
            <Route key={item.path} path={item.path} element={item.element}></Route>
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default Routers;
