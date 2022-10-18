import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '$src/redux/store';
import Routes from '$src/routes';

type AppProps = {
  basename?: string;
};
function App(props: AppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter basename={props.basename}>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
