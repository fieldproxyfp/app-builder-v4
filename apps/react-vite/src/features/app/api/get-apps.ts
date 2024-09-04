import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Meta } from '@/types/api';
import { AppT } from '@/types/app';

export const getApps = (
    page = 1,
): Promise<{
    data: AppT[];
    meta: Meta;
}> => {
    return api.get(`/app`, {
        params: {
            page,
        },
    });
};

export const getAppsQueryOptions = ({
    page,
}: { page?: number } = {}) => {
    return queryOptions({
        queryKey: page ? ['apps', { page }] : ['apps'],
        queryFn: () => getApps(page),
    });
};

type UseAppsOptions = {
    page?: number;
    queryConfig?: QueryConfig<typeof getAppsQueryOptions>;
};

export const useApps = ({
    queryConfig,
    page,
}: UseAppsOptions) => {
    return useQuery({
        ...getAppsQueryOptions({ page }),
        ...queryConfig,
    });
};
