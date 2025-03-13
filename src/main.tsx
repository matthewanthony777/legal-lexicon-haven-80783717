
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Playfair Display font link to the document head
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
document.head.appendChild(linkElement);

createRoot(document.getElementById("root")!).render(<App />);
