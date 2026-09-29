import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { EmailProvider } from './context/EmailContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EmailProvider>
        <App />
      </EmailProvider>
    </AuthProvider>
  </StrictMode>,
)
