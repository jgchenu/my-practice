import React from 'react';
import ReactDOM from 'react-dom';
import { loadMicroApp, prefetchApps, registerMicroApps, runAfterFirstMounted, start } from 'qiankun';

import App from './App';
import 'normalize.css';
import './style.less';
import { getMicroApps } from './helpers/micro-app';

const appCache = {} as any;
const prefetchedAppCache = {} as any;
ReactDOM.render(<App />, document.getElementById('root'), async () => {
  const apps = await getMicroApps();
  const getActiveApp = () => {
    const pathname = window.location.pathname;
    return apps.find((app) => pathname.startsWith(app.activeRule + '/'));
  };
  const loadApp = () => {
    const pathname = window.location.pathname;
    const activeApp = getActiveApp();
    console.log('pathname', pathname, 'activeApp', activeApp);
    if (!activeApp) {
      return;
    }
    const appName = activeApp.name;
    if (appCache[appName]) {
      return;
    }
    appCache[appName] = activeApp;
    loadMicroApp(activeApp);
  };

  const firstApp = getActiveApp();
  firstApp && prefetchApps([firstApp]);
  // setTimeout(() => {
  loadApp();
  // }, 3000);
  // registerMicroApps([]);
  start({ sandbox: { experimentalStyleIsolation: true }, singular: false });
  runAfterFirstMounted(async () => {
    const activeApp = getActiveApp();
    if (!activeApp) {
      return;
    }
    const unActiveApps = apps.filter((app) => app.name !== activeApp.name && !prefetchedAppCache[app.name]);
    console.log('unActiveApps to prefetch', unActiveApps);
    if (!unActiveApps.length) {
      return;
    }
    prefetchApps(unActiveApps);
    unActiveApps.forEach((app) => {
      prefetchedAppCache[app.name] = true;
    });
    // prefetchApps([loadApp]);
    // 主 -> 子 通信
    // window.dispatchEvent(new CustomEvent('app', { detail: { a: 1 } }));
  });
  window.addEventListener('popstate', () => {
    console.log('popstate', window.location.pathname);
    loadApp();
  });
});
