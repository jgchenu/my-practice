import React from 'react';
import { useRoutes } from 'react-router-dom';

import Dashboard from '$src/containers/Dashboard';
import DashboardMessages from '$src/containers/DashboardMessages';
import DashboardTasks from '$src/containers/DashboardTasks';
import Demo from '$src/containers/Demo';
import ReduxDemo from '$src/containers/ReduxDemo';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: 'not matched' },
      {
        path: 'one',
        element: <Demo />,
      },
      { path: 'two', element: <ReduxDemo /> },
      {
        path: 'three',
        element: <DashboardMessages />,
      },
      { path: 'four', element: <DashboardTasks /> },
    ],
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
