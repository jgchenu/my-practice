import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { store } from '$src/redux/store';
import Routes from '$src/routes';

import 'normalize.css';
import 'antd/dist/reset.css';
import './style.less';

function App() {
  return (
    <ConfigProvider theme={{ token: { borderRadius: 16, colorPrimary: '#5263e7' } }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
