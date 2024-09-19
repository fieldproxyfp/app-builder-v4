import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUpdateScreenMutation } from '@/features/app/api/get-app-meta';
import { nanoid } from 'nanoid';

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
  const { addNotification } = useNotifications();

  const updateScreenMutation = useUpdateScreenMutation({
    appId,
    onSuccess: (viewId) => {
      console.log('viewId', viewId);
      addNotification({
        title: 'Screen Created',
        message: 'Screen created successfully',
        type: 'success',
      });
    },
  });

  const defaultValues: CreateScreenInput = {
    title: '',
    route: '',
  };

  const createScreen = (values: CreateScreenInput) => {
    updateScreenMutation.mutate({
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
    });
  };

  return (
    <FormDrawer
      isDone={updateScreenMutation.isSuccess}
      triggerButton={
        size === 'lg' ? (
          <Button size="lg">Create Screen</Button>
        ) : (
          <Button size="icon" icon="add" variant="outline">
            {' '}
            Create Screen
          </Button>
        )
      }
      title="Create Screen"
      submitButton={
        <Button
          form="create-screen"
          type="submit"
          size="sm"
          isLoading={updateScreenMutation.isPending}
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
