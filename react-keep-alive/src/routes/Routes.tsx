import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import Dashboard from '$src/containers/Dashboard';
import Detail from '$src/containers/Detail/Detail';
import { KeepAlive } from '$src/components/KeepAlive';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: <Navigate to="/detail/1?session=1001" /> },
      {
        path: '/detail',
        element: <KeepAlive />,
        children: [
          {
            path: ':id',
            element: <Detail />,
          },
        ],
      },
    ],
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
