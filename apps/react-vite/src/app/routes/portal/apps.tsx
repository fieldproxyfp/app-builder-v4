import { ContentLayout } from '@/components/layouts';
import { AppsList } from '@/features/app/components/apps-list';
import { CreateApp } from '@/features/app/components/create-app';

export const AppsRoute = () => {
  return (
    <ContentLayout title="Apps">
      <div className="flex justify-end">
        <CreateApp />
      </div>
      <div className="mt-4">
        <AppsList />
      </div>
    </ContentLayout>
  );
};
