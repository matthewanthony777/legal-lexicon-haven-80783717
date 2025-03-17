
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster.tsx';
import { initializeArticleData } from './utils/initialize-article-data.ts';

// Initialize fallback article data
initializeArticleData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
      <Toaster />
    </Router>
  </React.StrictMode>,
)
