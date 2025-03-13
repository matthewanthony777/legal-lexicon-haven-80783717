
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Application starting...");

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  console.log("Rendering App...");
  createRoot(rootElement).render(<App />);
  console.log("App rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
}
