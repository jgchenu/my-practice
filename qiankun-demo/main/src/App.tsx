import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '$src/redux/store';
import Routes from '$src/routes';

function App() {
  useEffect(() => {
    const handleFromAppToMain = (e: CustomEvent<any>) => {
      console.log('from app to main', e.type, e.detail);
    };

    window.addEventListener('main', handleFromAppToMain);

    return () => {
      window.removeEventListener('main', handleFromAppToMain);
    };
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
