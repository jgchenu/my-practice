import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'normalize.css';
import './style.less';

type MicroAppProps = {
  container?: HTMLElement;
  basename?: string;
  dispatchEvent?: (event: string, data?: any) => void;
  onGlobalStateChange?: (...args: any[]) => void;
  setGlobalState?: (...args: any[]) => void;
};

function getSubRootContainer(container?: HTMLElement) {
  return container ? container.querySelector('#react-app-root') : document.querySelector('#react-app-root');
}

function render(props: MicroAppProps) {
  ReactDOM.render(<App basename={props.basename} />, getSubRootContainer(props.container));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
