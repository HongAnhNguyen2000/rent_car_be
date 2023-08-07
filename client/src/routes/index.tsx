import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from 'layouts/main';
import DashboardLayout from 'layouts/dashboard';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
// guards
import GuestGuard from 'guards/GuestGuard';
import AuthGuard from 'guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from 'components/common/LoadingScreen';


const Loadable = (Component: any) => (props: any) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
      ]
    },

    // Main Routes
    // {
    //   path: '*',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" replace /> }
    //   ]
    // },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: 
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      ]
    },
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('pages/authentication/Login')));
// Main
const LandingPage = Loadable(lazy(() => import('pages/common/LandingPage')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('pages/dashboard/GeneralApp')));