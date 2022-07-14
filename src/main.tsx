import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.scss';
import ThemeController from './widgets/ThemeController';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeController>
    <App />
  </ThemeController>
);
