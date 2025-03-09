import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';
import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

if (!publicKey) {
  console.error('EmailJS public key is missing');
} else {
  init(publicKey);
}

// Remove lazy loading for the main App component to ensure content appears
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);