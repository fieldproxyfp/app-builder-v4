import { queryOptions, useQuery } from '@tanstack/react-query';

import API_END_POINTS from '@/constants/apiEndPoints';
import { QueryConfig } from '@/lib/react-query';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { AppT } from '@/types/app';

export const getApps = async (
    page = 1,
): Promise<
    AppT[]
> => {
    return BackEndRequest.Get<
        { data: AppT[] }
    >(API_END_POINTS.APPS.GET_APPS, {
        params: {
            page,
        },
    }).then((res) => res.data).then((response) => {
        if (!response.error) {
            return response.data.data
        } else {
            throw new Error(response.message);
        }
    })
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
