import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from 'qiankun';

import App from './App';
import 'normalize.css';
import './style.less';

enum MacroApp {
  ReactApp = '/react-app',
}

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: process.env.reactAppEntry || `${MacroApp.ReactApp}-entry`,
    container: '#subapp-viewport',
    activeRule: MacroApp.ReactApp,
    props: {
      basename: MacroApp.ReactApp,
    },
  },
  // {
  //   name: 'vue app',
  //   entry: { scripts: ['//localhost:7100/main.js'] },
  //   container: '#yourContainer2',
  //   activeRule: '/yourActiveRule2',
  // },
]);

ReactDOM.render(<App />, document.getElementById('root'), () => start());
