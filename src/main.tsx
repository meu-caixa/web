import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@hooks/AuthProvider'
import AppRoutes from '@routes/index'
import { worker } from './test/mocks/browser'

if (import.meta.env.MODE === 'development') {
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>,
)
