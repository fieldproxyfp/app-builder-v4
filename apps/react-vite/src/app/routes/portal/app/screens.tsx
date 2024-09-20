import logo from '@/assets/logo.svg';
import { Typography } from '@/components/ui/typography';
import { CreateScreen } from '@/features/screen/components/create-screen';
import { AppT } from '@/types/app';
import { isValidArray } from '@/utils/format';
import { useEffect, useMemo } from 'react';
import {
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
          navigate(`${firstScreen}?tab=data`);
        }
      }
    }
  }, [view_id, screens, app?.app_id, appId]);

  return (
    <div className="flex flex-col gap-2 w-full">
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
                Create a screen to get started.
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
