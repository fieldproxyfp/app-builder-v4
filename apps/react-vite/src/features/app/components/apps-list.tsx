import { useSearchParams } from 'react-router-dom';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useApps } from '../api/get-apps';
import { DeleteApp } from './delete-app';

export const AppsList = () => {
  const [searchParams] = useSearchParams();

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
          {appsQuery.error.message ||
            'An error occurred while fetching apps. Please try again later.'}
        </div>
      </div>
    );
  }

  const apps = appsQuery.data;

  if (!apps) return null;

  return (
    <Table
      data={apps}
      columns={[
        {
          title: 'Title',
          field: 'raw_data',
          Cell({ entry: { raw_data } }) {
            return <span>{raw_data.title}</span>;
          },
        },
        {
          title: 'Description',
          field: 'raw_data',
          Cell({ entry: { raw_data } }) {
            return <span>{raw_data.description}</span>;
          },
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: 'Actions',
          field: 'app_id',
          Cell({ entry: { app_id } }) {
            return (
              <div className="flex items-center gap-4">
                <Link to={`/app/${app_id}`}>View</Link>
                <DeleteApp id={app_id} />
              </div>
            );
          },
        },
      ]}
      // pagination={
      //   meta && {
      //     totalPages: meta.totalPages,
      //     currentPage: meta.page,
      //     rootUrl: '',
      //   }
      // }
    />
  );
};
