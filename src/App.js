import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';

import SHAOYEROUTER from './router'
import configureStore from 'store/config'
import AxiosInterceptors from 'utils/axios-interceptors'

import './stylesheets/base.scss'

const store = configureStore();
const persistor = persistStore( store );
toast.configure()

const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <HashRouter>
          <SHAOYEROUTER/>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
