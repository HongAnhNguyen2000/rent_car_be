import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SettingsProvider } from 'contexts/SettingsContext';
import { AuthProvider } from 'contexts/JWTContext';
import App from 'src/app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SettingsProvider>
            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>
          </SettingsProvider>
        </LocalizationProvider>
  </HelmetProvider>
  </React.StrictMode>,
)
