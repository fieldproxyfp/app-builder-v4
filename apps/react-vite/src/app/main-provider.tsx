import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';
import { AuthLoader } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { LoginForm } from '@/features/auth/components/login-form';
import { LoginRoute } from './routes/auth/login';
import { createPublicRouter } from './routes';
import { RouterProvider } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const PublicRouter = () => {
  const router = React.useMemo(() => createPublicRouter(), []);
  return <RouterProvider router={router} />;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <Notifications />
            <AuthLoader
              renderUnauthenticated={() => <PublicRouter />}
              renderError={(error) => <pre>{JSON.stringify(error)}</pre>}
              renderLoading={() => (
                <div className="flex h-screen w-screen items-center justify-center">
                  <Spinner size="xl" />
                </div>
              )}
            >
              {children}
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
