import { ErrorBlock } from '@/components/ui/error-block';
import { Loader } from '@/components/ui/loader/loader';
import { Typography } from '@/components/ui/typography';
import { useAppMeta } from '@/features/app/api/get-app-meta';
import { NavLink, Outlet, useParams } from 'react-router-dom';

export const AppRoute = () => {
  const { appId } = useParams();
  const {
    data: appMeta,
    isLoading,
    isError,
    error,
  } = useAppMeta({ appId: appId ?? '' });

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
          {isLoading ? (
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
          ) : (
            <Typography variant="body">
              {appMeta?.raw_data?.title || 'Check'}
            </Typography>
          )}
        </div>
        <div className="inline-flex items-center  gap-4">
          <NavLink
            to={`screens`}
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Screens
          </NavLink>
          <NavLink
            to={`settings`}
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Settings
          </NavLink>
        </div>
        <div />
      </header>

      <main className="  flex-col flex-grow ">
        {isLoading ? (
          <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <Loader
              label="Loading app..."
              description="Please wait while we process your request."
            />
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
            <ErrorBlock title={error.message} />
          </div>
        ) : appId && appMeta ? (
          <Outlet context={appMeta} />
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
            <ErrorBlock title="App not found" />
          </div>
        )}
      </main>
    </div>
  );
};
