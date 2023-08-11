import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SettingsProvider } from 'contexts/SettingsContext';
import { AuthProvider } from 'contexts/JWTContext';
import ThemeConfig from 'theme';
import ThemePrimaryColor from 'components/common/ThemePrimaryColor';
import LoadingScreen from 'components/common/LoadingScreen';
import { store, persistor } from '_redux/store';
import App from 'src/app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <HelmetProvider>
      <ThemeConfig>
      <ThemePrimaryColor>
      <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SettingsProvider>
            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </PersistGate>
      </ReduxProvider>
      </ThemePrimaryColor>
      </ThemeConfig>
  </HelmetProvider>
  // </React.StrictMode>,
)
