import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, start } from 'qiankun';

import App from './App';
import 'normalize.css';
import './style.less';
import { getMicroApps } from './helpers/micro-app';

ReactDOM.render(<App />, document.getElementById('root'), async () => {
  const apps = await getMicroApps();
  registerMicroApps(apps);
  start();
  runAfterFirstMounted(() => {
    // 主 -> 子 通信
    window.dispatchEvent(new CustomEvent('app', { detail: { a: 1 } }));
  });
});
