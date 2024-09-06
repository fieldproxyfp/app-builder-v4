import { useSearchParams } from 'react-router-dom';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { Fragment } from 'react/jsx-runtime';
import { useDeleteApp } from '../api/delete-app';
import { useApps } from '../api/get-apps';
import { DeleteApp } from './delete-app';

export const AppsList = () => {
  const [searchParams] = useSearchParams();
  const { mutate: deleteApp, isPending } = useDeleteApp();

  const appsQuery = useApps({
    page: +(searchParams.get('page') || 1),
  });

  if (appsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (appsQuery.isError) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <div className="text-destructive text-lg">
          An error occurred while fetching apps. Please try again later.
        </div>
      </div>
    )
  }

  const apps = appsQuery.data?.data;
  const meta = appsQuery.data?.meta;

  if (!apps) return null;

  return (
    <Table
      data={apps}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link to={`./${id}`}>View</Link>;
          },
        },
        {
          title: "Actions",
          field: 'id',
          Cell({ entry: { id } }) {
            return (
              <Fragment>
                <DeleteApp id={id} />

              </Fragment>
            );
          },
        },
      ]}
      pagination={
        meta && {
          totalPages: meta.totalPages,
          currentPage: meta.page,
          rootUrl: '',
        }
      }
    />
  );
};
