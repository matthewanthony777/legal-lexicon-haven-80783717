
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error handling to help with debugging
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  createRoot(rootElement).render(<App />);
} catch (error) {
  // Display errors on screen for easier debugging
  const errorElement = document.createElement('div');
  errorElement.style.background = 'black';
  errorElement.style.color = 'white';
  errorElement.style.padding = '20px';
  errorElement.style.margin = '20px';
  errorElement.style.border = '1px solid red';
  errorElement.style.borderRadius = '4px';
  errorElement.innerHTML = `<h1>Error during rendering:</h1><pre>${error instanceof Error ? error.message : String(error)}</pre>`;
  
  document.body.appendChild(errorElement);
  console.error("Rendering error:", error);
}
