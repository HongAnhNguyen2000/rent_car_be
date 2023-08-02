import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// import MainLayout from 'layouts/main';
import DashboardLayout from 'layouts/dashboard';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
import GuestGuard from 'guards/GuestGuard';
import AuthGuard from 'guards/AuthGuard';
import LoadingScreen from 'components/common/LoadingScreen';


const Loadable = (Component: any) => (props: any) => {
    console.log(Loadable);

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
            { path: '/', element: <Navigate to="/dashboard/app" replace /> },
            // {
            //   path: 'user',
            //   children: [
            //     { path: 'profile', element: <UserProfile /> },
            //   ]
            // },
        ]
    },

    // Main Routes
    {
        path: '*',
        element: <LogoOnlyLayout />,
        children: [
            // { path: '500', element: <Page500 /> },
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" replace /> }
        ]
    },
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [
    //     { path: '/', element: <LandingPage /> },
    //     { path: 'about-us', element: <About /> },
    //     { path: 'contact-us', element: <Contact /> },
    //     {
    //       path: 'components',
    //       children: [
    //         { path: '/', element: <ComponentsOverview /> },
    //         { path: 'list', element: <List /> },
    //       ]
    //     }
    //   ]
    // },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// Components
const Login = Loadable(lazy(() => import('pages/authentication/Login')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('pages/common/Page404')));
