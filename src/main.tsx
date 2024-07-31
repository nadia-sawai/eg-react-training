import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from "./router";
import './index.css'
import LoginProvider from './provider/LoginProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
      <Router />
    </LoginProvider>
  </React.StrictMode>,
)
