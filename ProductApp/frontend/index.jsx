import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/extensions
import App from './src/App.jsx';
import './src/app.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
