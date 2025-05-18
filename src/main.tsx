import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './utils/socket.ts';

createRoot(document.getElementById('root')!).render(<App />);
