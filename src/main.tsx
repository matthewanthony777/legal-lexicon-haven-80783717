
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found! Make sure there is a div with id 'root' in index.html");
  }
  
  createRoot(rootElement).render(<App />);
  
  console.log("Application successfully mounted");
} catch (error) {
  console.error("Failed to render application:", error);
  // Display a fallback UI for critical errors
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Oops! Something went wrong</h2>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 20px; text-align: left; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
}
