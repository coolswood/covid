import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './app';
import './index.scss';
import ThemeController from './widgets/ThemeController';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeController>
      <App />
    </ThemeController>
  </QueryClientProvider>
);
