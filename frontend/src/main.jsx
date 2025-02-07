import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from '@/App';
import '@/assets/css/style.css';

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
