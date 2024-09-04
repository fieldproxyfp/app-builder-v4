import { useSearchParams } from 'react-router-dom';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useApps } from '../api/get-apps';

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
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return (
              <span className="material-icons-outlined text-destructive cursor-pointer">
                delete
              </span>
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
