import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { CreateScreen } from '@/features/screen/components/create-screen';
import { AppT } from '@/types/app';
import { isValidArray } from '@/utils/format';
import { useEffect, useMemo } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';

export const AppScreensRoute = () => {
  const { appId, view_id } = useParams();
  const app = useOutletContext<AppT>();
  const navigate = useNavigate();

  const screens = useMemo(
    () =>
      Object.values(app?.raw_data?.views || []).map((d) => ({
        label: d.label,
        value: d.view_id,
      })),
    [app?.raw_data?.views],
  );

  useEffect(() => {
    if (app.app_id === appId) {
      if (isValidArray(screens) && !view_id) {
        const firstScreen = screens[0].value;
        if (firstScreen) {
          navigate(`${firstScreen}/data`);
        }
      }
    }
  }, [view_id, screens, app?.app_id, appId]);

  const selectedScreen = useMemo(() => {
    if (view_id) {
      return screens.find((screen) => screen.value === view_id);
    }
    return null;
  }, [view_id, screens]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {screens.length > 0 && (
        <header className=" h-14 bg-background flex justify-between items-center border-b-[1px] border-border1 px-4">
          <div className="inline-flex items-center h-full gap-2">
            <Typography variant="large"> Screens</Typography>
            <span className="material-icons-round text-xl">chevron_right</span>
            <Typography variant="large">{selectedScreen?.label}</Typography>
          </div>
          <div className="flex items-center h-full gap-4">
            <NavLink
              to={`${view_id}/data`}
              className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
            >
              Data
            </NavLink>
            <NavLink
              to={`${view_id}/design`}
              className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
            >
              Design
            </NavLink>
            <NavLink
              to={`${view_id}/actions`}
              className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
            >
              Actions
            </NavLink>
          </div>
          <Button variant="secondary" size="sm">
            Save
          </Button>
        </header>
      )}
      {!screens.length ? (
        <div className="flex justify-center items-center h-full">
          <div className="relative w-[350px] h-[760px] bg-white rounded-[50px] mt-8 shadow-xl border-[12px] border-gray-800 overflow-hidden">
            {/* iPhone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[144px] h-[30px] bg-black rounded-b-3xl"></div>

            {/* Screen content */}
            <div className="w-full h-full  pb-[7px] px-[7px] flex flex-col gap-4 items-center justify-center">
              <img
                src={logo}
                alt={app?.raw_data?.title}
                className="w-24 h-24 animate-spin"
              />
              <Typography variant="h3">
                Welcome to {app?.raw_data?.title}
              </Typography>
              <Typography variant="body">
                Create your first screen to get started.
              </Typography>
              <CreateScreen appId={appId as string} size="lg" />
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[4px] bg-gray-800 rounded-full"></div>
          </div>
        </div>
      ) : (
        <Outlet context={screens} />
      )}
    </div>
  );
};
