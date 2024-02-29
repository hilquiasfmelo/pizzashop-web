import './global.css'

// import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider storageKey="pizzashop-theme" defaultTheme="system">
    <App />
  </ThemeProvider>,

  // </React.StrictMode>,
)
