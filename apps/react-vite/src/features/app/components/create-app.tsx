import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import FpRadioGroup, { OptionT } from '@/components/ui/radio-group/RadioGroup';
import {
  CreateAppInput,
  createAppInputSchema,
  useCreateApp,
} from '../api/create-app';

export const CreateApp = () => {
  const defaultValues: CreateAppInput = {
    title: '',
    description: '',
    type: 'web',
  };

  const { addNotification } = useNotifications();
  const createAppMutation = useCreateApp({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Created',
        });
      },
    },
  });

  const appTypeOptions: OptionT[] = [
    {
      label: 'Web',
      value: 'web',
    },
    {
      label: 'Mobile',
      value: 'mobile',
    },
  ];

  return (
    // <Authorization allowedRoles={[ROLES.USER]}>
    <FormDrawer
      isDone={createAppMutation.isSuccess}
      triggerButton={
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create App
        </Button>
      }
      title="Create App"
      submitButton={
        <Button
          form="create-app"
          type="submit"
          size="sm"
          isLoading={createAppMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="create-app"
        onSubmit={(values) => {
          console.log({ values });
          createAppMutation.mutate({ data: values });
        }}
        options={{ defaultValues }}
        schema={createAppInputSchema}
      >
        {({ register, formState, setValue }) => (
          <>
            <Input
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />

            <Textarea
              label="Description"
              error={formState.errors['description']}
              registration={register('description')}
            />
            <FpRadioGroup
              position="Row"
              label="Application Type"
              options={appTypeOptions}
              defaultValue={'web'}
              registration={register('type')}
              error={formState.errors['type']}
              onValueChange={(value) => {
                setValue('type', value, { shouldValidate: true });
              }}
            />
          </>
        )}
      </Form>
    </FormDrawer>
    // </Authorization>
  );
};
