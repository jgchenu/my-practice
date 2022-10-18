import axios from 'axios';
import { initGlobalState, MicroAppStateActions, registerMicroApps } from 'qiankun';

enum MicroApp {
  ReactApp = '/react-app',
}

const dispatchEvent = (event: string, data: any) => {
  window.dispatchEvent(
    new CustomEvent(event, {
      detail: data,
    }),
  );
};

const dispatchMainEvent = (data: any) => {
  dispatchEvent('main', data);
};

const microApps = [
  {
    name: 'react app', // app name registered
    entry: process.env.reactAppEntry || `${MicroApp.ReactApp}-entry`,
    container: '#subapp-viewport',
    activeRule: MicroApp.ReactApp,
    props: {
      basename: MicroApp.ReactApp,
      dispatchEvent: dispatchMainEvent,
      addEventListener: window.addEventListener,
      removeEventListener: window.removeEventListener,
    },
  },
  // {
  //   name: 'vue app',
  //   entry: { scripts: ['//localhost:7100/main.js'] },
  //   container: '#yourContainer2',
  //   activeRule: '/yourActiveRule2',
  // },
];

const globalState = {
  user: {},
};

// 初始化 state
const microAppStore: MicroAppStateActions = initGlobalState(globalState);

microAppStore.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('main store change:', state, prev);
});

microAppStore.setGlobalState(globalState);
microAppStore.offGlobalStateChange();

async function getMicroApps() {
  const appConfigsRest = await Promise.all(
    microApps.map((item) => axios.get<{ sidebar: [] }>(`${item.entry}/config.json`)),
  );

  return appConfigsRest.map((configRes, index) => {
    const config = configRes.data;
    dispatchEvent('links', {
      activeRule: microApps[index].activeRule,
      links: config.sidebar,
    });
    return {
      ...microApps[index],
      props: {
        config,
        ...microApps[index].props,
      },
    };
  });
}

export { getMicroApps, microAppStore };
