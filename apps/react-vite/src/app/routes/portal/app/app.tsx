import { Button } from '@/components/ui/button';
import { ErrorBlock } from '@/components/ui/error-block';
import { Loader } from '@/components/ui/loader/loader';
import { Typography } from '@/components/ui/typography';
import { useAppMeta } from '@/features/app/api/get-app-meta';
import { Screen } from '@/types/screen';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

export const AppRoute = () => {
  const { appId, screenId } = useParams();
  const [screen, setScreen] = useState<Screen>();
  const {
    data: appMeta,
    isLoading,
    isError,
    error,
  } = useAppMeta({ appId: appId ?? '' });

  const intialScreens: Screen[] = [
    {
      screenId: 'screen-1',
      label: 'Screen 1',
      data: {
        sql: 'SELECT * FROM users',
      },
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      ui: [],
    },
    {
      screenId: 'screen-2',
      label: 'Screen 2',
      data: {
        sql: 'SELECT * FROM users',
      },
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      ui: [],
    },
  ];

  useEffect(() => {
    if (screenId) {
      setScreen(intialScreens.find((screen) => screen.screenId === screenId));
    }
  }, [screenId]);

  return (
    <div className="size-full flex flex-col flex-grow ">
      <header className=" h-14 bg-background flex justify-between items-center border-b-[1px] border-border1 px-4">
        <div className="inline-flex items-center h-full gap-2">
          <NavLink
            to="/portal/apps"
            className="flex items-center text-body1 hover:text-accentBlue gap-2"
          >
            <span className="material-icons-round text-xl">apps</span> Apps
          </NavLink>
          <span className="material-icons-round text-xl">chevron_right</span>
          <Typography variant="body">{appMeta?.title}</Typography>
        </div>
        <div className="inline-flex items-center  gap-4">
          <NavLink
            to={`${screen?.screenId}/data`}
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Data
          </NavLink>
          <NavLink
            to={`${screen?.screenId}/design`}
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Design
          </NavLink>
          <NavLink
            to={`${screen?.screenId}/actions`}
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Actions
          </NavLink>
        </div>
        <Button variant="positive">Launch</Button>
      </header>
      <main className="flex flex-col flex-grow p-2">
        {isLoading && (
          <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <Loader
              label="Loading app..."
              description="Please wait while we process your request."
            />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
            <ErrorBlock title={error.message} />
          </div>
        )}
        {appMeta && (
          <div className=" grid grid-cols-12 w-full h-[calc(100vh-6rem)] gap-2 overflow-auto">
            <div className="grid col-span-2">
              <div className="flex flex-col gap-2 p-2 bg-background text-foreground border-[1px] border-border1 rounded-md shadow-sm">
                {intialScreens.map((screen) => (
                  <NavLink
                    to={`${screen.screenId}`}
                    className={({ isActive }) =>
                      isActive ? 'text-blue-500' : ''
                    }
                  >
                    {screen.label}
                  </NavLink>
                ))}
              </div>
            </div>
            {screen ? (
              <Outlet context={screen} />
            ) : (
              <div className="grid col-span-10 h-full bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm">
                <div className="flex justify-center items-center h-full">
                  <Typography variant="body">Select a screen</Typography>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
