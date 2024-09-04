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
        {/* <DiscussionsList
          onDiscussionPrefetch={(id) => {
            // Prefetch the comments data when the user hovers over the link in the list
            queryClient.prefetchInfiniteQuery(
              getInfiniteCommentsQueryOptions(id),
            );
          }}
        /> */}
      </div>
    </ContentLayout>
  );
};
