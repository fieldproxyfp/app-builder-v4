import API_END_POINTS from '@/constants/apiEndPoints';
import { QueryConfig } from '@/lib/react-query';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { AppT } from '@/types/app';
import { isValidArray } from '@/utils/format';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getAppMeta = (appId: string): Promise<AppT> => {
    const queryParams = new URLSearchParams({
        app_id: appId,
    });
    return BackEndRequest.Get<{ data: AppT[] }>(`${API_END_POINTS.APPS.GET_APPS}?${queryParams}`).then((res) => res.data).then((response) => {
        if (!response.error) {
            if (isValidArray(response.data.data)) {
                return response.data.data?.[0]
            } else {
                throw new Error('App not found');
            }
        } else {
            throw new Error(response.message);
        }
    })

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