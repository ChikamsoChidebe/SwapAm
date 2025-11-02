import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { reportWebVitals } from './utils/reportWebVitals';

// Import global styles
import './index.css';

// Performance monitoring
const sendToAnalytics = (metric: any) => {
  // Send to analytics service
  console.log('Web Vital:', metric);
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
};

// Create root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Start measuring performance
reportWebVitals(sendToAnalytics);

// Register service worker for PWA functionality
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                if (window.confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle app installation prompt
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button or banner
  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00C853 0%, #4CAF50 100%);
      color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 200, 83, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10000;
      font-family: 'Inter', sans-serif;
    ">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">Install Swapam</div>
        <div style="font-size: 14px; opacity: 0.9;">Get the full app experience</div>
      </div>
      <div>
        <button id="install-button" style="
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 8px;
        ">Install</button>
        <button id="dismiss-button" style="
          background: transparent;
          border: none;
          color: white;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          opacity: 0.7;
        ">✕</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(installBanner);
  
  // Handle install button click
  document.getElementById('install-button')?.addEventListener('click', () => {
    installBanner.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
  
  // Handle dismiss button click
  document.getElementById('dismiss-button')?.addEventListener('click', () => {
    installBanner.remove();
  });
});

// Handle successful app installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
});

// Handle network status changes
window.addEventListener('online', () => {
  console.log('App is online');
  // Show online notification
  const event = new CustomEvent('networkStatusChange', { detail: { online: true } });
  window.dispatchEvent(event);
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  // Show offline notification
  const event = new CustomEvent('networkStatusChange', { detail: { online: false } });
  window.dispatchEvent(event);
});

// Handle visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App is hidden');
    // Pause non-critical operations
  } else {
    console.log('App is visible');
    // Resume operations
  }
});

// Handle memory warnings
if ('memory' in performance) {
  const checkMemory = () => {
    const memory = (performance as any).memory;
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
      console.warn('High memory usage detected');
      // Trigger cleanup or show warning
    }
  };
  
  setInterval(checkMemory, 30000); // Check every 30 seconds
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error reporting service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error reporting service
});

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default App;