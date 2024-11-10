import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute/ProtectedRoute';
import { VerifyEmail } from './components/VerifyEmail/VerifyEmail';
import { MainLayout } from './layout/MainLayout';
import AccountsPage from './pages/AccountsPage';
import { Dashboard } from './pages/Dashboard';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import { SignupPage } from './pages/SignupPage';
import TransactionsPage from './pages/TransactionsPage';
import TransferFundsPage from './pages/TransferFundsPage';
import UserProfilePage from './pages/UserProfilePage';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <MainLayout>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
  {
    path: '/accounts',
    element: (
      <MainLayout>
        <ProtectedRoute>
          <AccountsPage />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
  {
    path: '/transactions',
    element: (
      <MainLayout>
        <ProtectedRoute>
          <TransactionsPage />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
  {
    path: '/transfer-funds',
    element: (
      <MainLayout>
        <ProtectedRoute>
          <TransferFundsPage />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <MainLayout>
        <ProtectedRoute>
          <UserProfilePage />
        </ProtectedRoute>
      </MainLayout>
    ),
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/not-authorized',
    element: <NotAuthorizedPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
