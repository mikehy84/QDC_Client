import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/main/Main';
import './shared/style/css/index.css'
import './shared/style/css/about.css'
import './shared/style/css/service.css'
import './shared/style/css/contact.css'
import './shared/style/css/team.css'
import './shared/style/css/portfolio.css'
import './shared/style/css/admin.css'
import './shared/style/css/login.css'
import './shared/style/css/register.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <ToastContainer />
        <Main />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
