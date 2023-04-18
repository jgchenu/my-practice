import React from 'react';
import { useRoutes } from 'react-router-dom';

import Dashboard from '$src/containers/Dashboard';
import DashboardMessages from '$src/containers/DashboardMessages';
import DashboardTasks from '$src/containers/DashboardTasks';
import Demo from '$src/containers/Demo';
import ReduxDemo from '$src/containers/ReduxDemo';
import MacroApp from '$src/containers/MacroApp';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: 'not matched' },
      {
        path: 'demo',
        element: <Demo />,
      },
      { path: 'redux-demo', element: <ReduxDemo /> },
      {
        path: 'messages',
        element: <DashboardMessages />,
      },
      { path: 'tasks', element: <DashboardTasks /> },
      {
        path: 'react-app/*',
        element: <MacroApp />,
      },
      {
        path: 'react-app2/*',
        element: <MacroApp />,
      },
      {
        path: 'react-app3/*',
        element: <MacroApp />,
      },
    ],
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
