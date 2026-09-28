import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { EmailProvider } from './context/EmailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "1016219056281-ohap2pvguddrds0i594mj3ovaulph7aj.apps.googleusercontent.com"; // From your .env

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <EmailProvider>
          <App />
        </EmailProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
