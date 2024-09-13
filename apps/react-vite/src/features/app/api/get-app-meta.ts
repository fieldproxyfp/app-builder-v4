import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { AppT } from '@/types/app';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getAppMeta = (appId: string): Promise<AppT> => {
    return api.get(`/app/${appId}/meta`);
};


export const getAppMetaQueryOptions = (appId: string) => {
    return queryOptions({
        queryKey: ['app', appId, 'meta'],
        queryFn: () => getAppMeta(appId),
    });
};

type UseAppMetaOptions = {
    appId: string;
    queryConfig?: QueryConfig<typeof getAppMetaQueryOptions>;
};

export const useAppMeta = ({ appId, queryConfig }: UseAppMetaOptions) => {
    return useQuery({ ...getAppMetaQueryOptions(appId), ...queryConfig });
};