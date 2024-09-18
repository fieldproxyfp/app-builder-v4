import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';

import API_END_POINTS from '@/constants/apiEndPoints';
import { appService } from '@/services/appService';
import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async () => {
  const user = ((await appService.getUserFromStorage()) as User) ?? null;
  return Promise.resolve(user);
};

const logout = (): Promise<void> => {
  return Promise.resolve(appService.clear());
};

export const loginInputSchema = z.object({
  emailId: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = async (
  data: LoginInput,
): Promise<AuthResponse | null> => {
  try {
    const response = await api.post(API_END_POINTS.AUTH.LOGIN, data);
    if (response.status) {
      const { token, refreshToken, profileData } = response.data;
      appService.storeToken(token, refreshToken);
      appService.storeUser(profileData);
      return {
        jwt: token,
        user: profileData,
      };
    } else {
      return null;
    }
  } catch (err) {
    Promise.reject(err);
    return null;
  }
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'RSequired'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response?.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};

export const UnProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();

  if (user.data && user.data.accountId) {
    return <Navigate to={`/portal`} replace />;
  }

  return children;
};
