import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import useConfigureStore from './useConfigureStore';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

const {store, persistor} = useConfigureStore();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 2,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer position="bottom-right" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
