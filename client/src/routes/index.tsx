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
      element: <MainLayout />,
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
        { path: '', element: <GeneralApp /> },
        {
          path: 'car',
          children: [
            { path: '', element: <Navigate to="/dashboard/car/list" replace /> },
            // { path: 'list', element: <Navigate to="/dashboard/car" replace /> },
            { path: 'list', element: <CarList /> },
            { path: 'new', element: <CarCreate /> },
            { path: 'detail/:id', element: <CarDetail /> },
          ]
        },
        {
          path: 'booking',
          children: [
            { path: '', element: <Navigate to="/dashboard/booking/list" replace /> },
            { path: 'list', element: <BookingList /> },
            { path: 'detail/:id', element: <CarDetail /> },
          ]
        },
        {
          path: 'contract',
          children: [
            { path: '', element: <Navigate to="/dashboard/contract/list" replace /> },
            { path: 'list', element: <CarList /> },
            { path: 'new', element: <CarCreate /> },
            { path: 'detail/:id', element: <CarDetail /> },
          ]
        },
        {
          path: 'insurance',
          children: [
            { path: '', element: <Navigate to="/dashboard/insurance/list" replace /> },
            { path: 'list', element: <CarList /> },
            { path: 'new', element: <CarCreate /> },
            { path: 'detail/:id', element: <CarDetail /> },
          ]
        },
        {
          path: 'addon',
          children: [
            { path: '', element: <Navigate to="/dashboard/addon/list" replace /> },
            { path: 'list', element: <CarList /> },
            { path: 'new', element: <CarCreate /> },
            { path: 'detail/:id', element: <CarDetail /> },
          ]
        },
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
        // { path: '', element: 
        //   <AuthGuard>
        //     <DashboardLayout />
        //   </AuthGuard>
        // },
        { path: '', element: <Navigate to="/dashboard" replace /> },
        { path: '/', element: <Navigate to="/dashboard" replace /> },
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
const CarList = Loadable(lazy(() => import('pages/dashboard/car/CarList')));
const CarCreate = Loadable(lazy(() => import('pages/dashboard/car/CarCreate')));
const CarDetail = Loadable(lazy(() => import('pages/dashboard/car/CarDetail')));
const BookingList = Loadable(lazy(() => import('pages/dashboard/booking/BookingList')));
