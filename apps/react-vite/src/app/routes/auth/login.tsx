import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import { UnProtectedRoute, useUser } from '@/lib/auth';
import { useEffect } from 'react';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <UnProtectedRoute>
      <Layout title="Log in to your account">
        <LoginForm
          onSuccess={() => {
            navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
              replace: true,
            });
          }}
        />
      </Layout>
    </UnProtectedRoute>
  );
};
