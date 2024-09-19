import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/ui/code-editor/codeEditor';
import { useNotifications } from '@/components/ui/notifications';
import { Typography } from '@/components/ui/typography';
import { useUpdateAppMutation } from '@/features/app/api/get-app-meta';
import { AppT } from '@/types/app';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

export const AppSettingsRoute = () => {
  const { appId } = useParams();
  const appMeta = useOutletContext<AppT>();
  const updateAppMutation = useUpdateAppMutation({
    onSuccess: () => {
      addNotification({
        title: 'Success',
        message: 'App Published successfully',
        type: 'success',
        autoDismiss: true,
      });
    },
    onError: (error) => {
      addNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
        autoDismiss: true,
      });
    },
  });
  const [appJsonString, setAppJsonString] = useState(
    JSON.stringify(appMeta?.raw_data),
  );

  const { addNotification } = useNotifications();

  useEffect(() => {
    setAppJsonString(JSON.stringify(appMeta?.raw_data));
  }, [appMeta]);

  return (
    <div className="flex flex-col gap-4 bg-background p-4 rounded-md h-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Typography variant="h2">App Settings</Typography>
          <Typography variant="subHeading">
            Review and Edit App Settings
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            variant="positive"
            icon="rocket"
            isLoading={updateAppMutation.isPending}
            onClick={() => {
              if (appId) {
                try {
                  const appData = JSON.parse(appJsonString);
                  updateAppMutation.mutate({ appId, appData });
                } catch (error) {
                  addNotification({
                    title: 'Error',
                    message: 'Invalid JSON',
                    type: 'error',
                    autoDismiss: true,
                  });
                }
              }
            }}
          >
            Publish
          </Button>
        </div>
      </div>
      <div className=" p-4 flex flex-col gap-2 h-[90vh] bg-gray-200">
        <CodeEditor
          language="json"
          value={appJsonString}
          onChange={(value) => setAppJsonString(value)}
        />
      </div>
    </div>
  );
};
