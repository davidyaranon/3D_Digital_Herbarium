/**
 * @file main.tsx
 * @fileoverview This file contains the entry point for the app.
 * It contains the context provider, which allows the app to use global variables.
 * It also contains the root render, which renders the app.
 * DO NOT EDIT [ unless you know what you're doing ;) ]
 */

import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './my-context';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);