
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add comprehensive error handling to help with debugging
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  document.documentElement.style.backgroundColor = "black";
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  
  createRoot(rootElement).render(<App />);
  
  console.log("Application successfully rendered");
} catch (error) {
  // Display detailed errors on screen for easier debugging
  const errorElement = document.createElement('div');
  errorElement.style.background = 'black';
  errorElement.style.color = 'white';
  errorElement.style.padding = '20px';
  errorElement.style.margin = '20px';
  errorElement.style.border = '1px solid red';
  errorElement.style.borderRadius = '4px';
  errorElement.style.fontFamily = 'monospace';
  errorElement.style.whiteSpace = 'pre-wrap';
  errorElement.style.overflow = 'auto';
  errorElement.style.maxHeight = '80vh';
  
  const errorDetails = error instanceof Error 
    ? `${error.name}: ${error.message}\n\nStack trace:\n${error.stack}`
    : String(error);
  
  errorElement.innerHTML = `<h1>Error during rendering:</h1><pre>${errorDetails}</pre>`;
  
  document.body.appendChild(errorElement);
  console.error("Rendering error:", error);
}
