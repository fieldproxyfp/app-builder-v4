import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './routes/portal/app/root';
import { PortalRoot } from './routes/portal/root';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./routes/landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./routes/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: ':appId',
          lazy: async () => {
            const { AppRoute } = await import('./routes/portal/app');
            return { Component: AppRoute };
          },
          children: [
            {
              path: '',
              loader: async () => {
                return redirect(`screens`);
              },
            },
            {
              path: 'settings',
              lazy: async () => {
                const { AppSettingsRoute } = await import(
                  './routes/portal/app/settings'
                );
                return { Component: AppSettingsRoute };
              },
            },
            {
              path: 'screens',
              lazy: async () => {
                const { AppScreensRoute } = await import(
                  './routes/portal/app/screens'
                );
                return { Component: AppScreensRoute };
              },
              children: [
                {
                  path: ':view_id',
                  lazy: async () => {
                    const { ScreenRoute } = await import(
                      './routes/portal/app/screen'
                    );
                    return { Component: ScreenRoute };
                  },
                  children: [
                    {
                      path: 'actions',
                      lazy: async () => {
                        const { PageActions: AppSettingsRoute } = await import(
                          './routes/portal/app/screen/actions'
                        );
                        return { Component: AppSettingsRoute };
                      },
                    },
                    {
                      path: 'data',
                      lazy: async () => {
                        const { AppDataRoute } = await import(
                          './routes/portal/app/screen/data'
                        );
                        return { Component: AppDataRoute };
                      },
                    },
                    {
                      path: 'design',
                      lazy: async () => {
                        const { AppDesignRoute } = await import(
                          './routes/portal/app/screen/design'
                        );
                        return { Component: AppDesignRoute };
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/portal',
      element: (
        <ProtectedRoute>
          <PortalRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import(
              './routes/portal/dashboard'
            );
            return { Component: DashboardRoute };
          },
        },

        {
          path: 'apps',
          lazy: async () => {
            const { AppsRoute } = await import('./routes/portal/apps');
            return { Component: AppsRoute };
          },
        },
        {
          path: 'discussions',
          lazy: async () => {
            const { DiscussionsRoute } = await import(
              './routes/portal/discussions/discussions'
            );
            return { Component: DiscussionsRoute };
          },
          loader: async (args: LoaderFunctionArgs) => {
            const { discussionsLoader } = await import(
              './routes/portal/discussions/discussions'
            );
            return discussionsLoader(queryClient)(args);
          },
        },
        {
          path: 'discussions/:discussionId',
          lazy: async () => {
            const { DiscussionRoute } = await import(
              './routes/portal/discussions/discussion'
            );
            return { Component: DiscussionRoute };
          },

          loader: async (args: LoaderFunctionArgs) => {
            const { discussionLoader } = await import(
              './routes/portal/discussions/discussion'
            );
            return discussionLoader(queryClient)(args);
          },
        },
        {
          path: 'users',
          lazy: async () => {
            const { UsersRoute } = await import('./routes/portal/users');
            return { Component: UsersRoute };
          },

          loader: async () => {
            const { usersLoader } = await import('./routes/portal/users');
            return usersLoader(queryClient)();
          },
        },
        {
          path: 'profile',
          lazy: async () => {
            const { ProfileRoute } = await import('./routes/portal/profile');
            return { Component: ProfileRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
