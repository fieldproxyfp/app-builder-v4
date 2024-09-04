import { ContentLayout } from '@/components/layouts';
import { CreateApp } from '@/features/app/components/create-app';
import { useUser } from '@/lib/auth';

export const AppsRoute = () => {
  const user = useUser();

  return (
    <ContentLayout title="Apps">
      <div className="flex justify-end">
        <CreateApp />
      </div>
      <div className="mt-4">
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
