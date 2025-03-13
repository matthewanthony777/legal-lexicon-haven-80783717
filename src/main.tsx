
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global error handler to catch any unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Display error on screen for easier debugging on deployed sites
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif; color: #333; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Application Error</h2>
        <p>An error occurred while loading the application:</p>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; text-align: left; overflow: auto; max-width: 100%;">${event.error?.stack || event.error?.message || 'Unknown error'}</pre>
        <p style="margin-top: 20px;">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    `;
  }
});

try {
  console.log("Initializing application...");
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found! Make sure there is a div with id 'root' in index.html");
  }
  
  // Log any props on window that might be helpful for debugging
  console.log("Window environment:", {
    location: window.location.toString(),
    pathname: window.location.pathname,
    baseURI: document.baseURI,
  });
  
  createRoot(rootElement).render(<App />);
  
  console.log("Application successfully mounted");
} catch (error) {
  console.error("Failed to render application:", error);
  // Display a fallback UI for critical errors
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif; color: #333; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Oops! Something went wrong</h2>
        <p>The application failed to initialize properly.</p>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 20px; text-align: left; overflow: auto; max-width: 100%;">${error instanceof Error ? error.stack || error.message : String(error)}</pre>
        <p style="margin-top: 20px;">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    `;
  }
}
