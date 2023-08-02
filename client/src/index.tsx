// import './_apis_';
// import './locales/i18n';
// import './utils/highlight';
// import 'simplebar/src/simplebar.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import 'react-image-lightbox/style.css';
// import 'react-quill/dist/quill.snow.css';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import 'lazysizes';
// import 'lazysizes/plugins/attrchange/ls.attrchange';
// import 'lazysizes/plugins/object-fit/ls.object-fit';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { createRoot } from "react-dom/client";
import { RecoilRoot } from 'recoil';
// import { RecoilPersistGate } from './RecoilPersistGate';
import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import { SettingsProvider } from './contexts/SettingsContext';
// import LoadingScreen from './components/LoadingScreen';
// import { AuthProvider } from './contexts/JWTContext';

import App from './app';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
                {/* <AuthProvider> */}
                    <App />
                {/* </AuthProvider> */}
        </BrowserRouter>
        </LocalizationProvider>
    </RecoilRoot>
)