import { useAppStore } from '@/app/routes/portal/app/app-store';
import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import API_END_POINTS from '@/constants/apiEndPoints';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { networkDelay } from '@/testing/mocks/utils';
import { ViewI } from '@/types/view';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import { z } from 'zod';

export const createScreenInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  route: z.string().min(1, 'Required'),
});

export type CreateScreenInput = z.infer<typeof createScreenInputSchema>;

export const CreateScreen = ({
  appId,
  size,
}: {
  appId: string;
  size: 'sm' | 'lg';
}) => {
  const [submitState, setSubmitState] = useState<{
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
  }>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const defaultValues: CreateScreenInput = {
    title: '',
    route: '',
  };

  const { addNotification } = useNotifications();

  const { addScreen } = useAppStore();

  const createScreen = async (values: CreateScreenInput) => {
    // setSubmitState({ ...submitState, isLoading: true });
    try {
      networkDelay();
      const newScreen: ViewI = {
        view_id: nanoid(),
        route: values.route,
        label: values.title,
        data: {},
        margin: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        ui: [],
      };

      const response = await BackEndRequest.Post(API_END_POINTS.APPS.SET_APP, {
        app_id: appId,
        view_id: newScreen.view_id,
        compiled_json: {},
        raw_json: newScreen,
      });
      if (response.status === 200) {
        addScreen(newScreen);
        setSubmitState({ ...submitState, isSuccess: true, isLoading: false });
        addNotification({
          title: 'Screen created',
          message: 'Screen created successfully',
          type: 'success',
        });
      } else {
        setSubmitState({
          ...submitState,
          isLoading: false,
          error: 'Failed to create screen',
        });
        addNotification({
          title: 'Error',
          message: 'Failed to create screen',
          type: 'error',
        });
      }
    } catch (error: any) {
      setSubmitState({
        ...submitState,
        isLoading: false,
        error: error?.message,
      });
      addNotification({
        title: 'Error',
        message: error?.message,
        type: 'error',
      });
    }
  };

  return (
    <FormDrawer
      isDone={submitState.isSuccess}
      triggerButton={
        size === 'lg' ? (
          <Button size="lg">Create Screen</Button>
        ) : (
          <Button size="icon" icon="add"></Button>
        )
      }
      title="Create Screen"
      submitButton={
        <Button
          form="create-screen"
          type="submit"
          size="sm"
          isLoading={submitState.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="create-screen"
        onSubmit={(values) => {
          createScreen(values);
        }}
        options={{ defaultValues }}
        schema={createScreenInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />

            <Textarea
              label="Route"
              error={formState.errors['route']}
              registration={register('route')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
