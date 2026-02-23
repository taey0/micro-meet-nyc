import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initViewport } from './utils/viewport'

// Run BEFORE React mounts so --app-height is set from the very first render.
// This prevents any flash of wrong-height layout on load.
initViewport()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
