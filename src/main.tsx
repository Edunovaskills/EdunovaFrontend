import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/App'
import './index.css'

// Ensure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create root and render with error handling
const root = ReactDOM.createRoot(rootElement)

// Wrap in try-catch to handle any initialization errors
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('Failed to render app:', error)
  // Fallback rendering
  root.render(
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>Please refresh the page to try again.</p>
      <button onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
