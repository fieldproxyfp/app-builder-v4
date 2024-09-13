import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteApp } from '../api/delete-app';

type DeleteAppProps = {
  id: string;
};

export const DeleteApp = ({ id }: DeleteAppProps) => {
  const { addNotification } = useNotifications();
  const deleteAppMutation = useDeleteApp({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'App Deleted',
        });
      },
    },
  });

  return (
    <ConfirmationDialog
      isDone={deleteAppMutation.isSuccess}
      icon="danger"
      title="Delete App"
      body="Are you sure you want to delete this App?"
      triggerButton={
        <Button variant="destructive" size="sm" icon="delete">
          Delete
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteAppMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteAppMutation.mutate({ id })}
        >
          Delete App
        </Button>
      }
    />
  );
};
