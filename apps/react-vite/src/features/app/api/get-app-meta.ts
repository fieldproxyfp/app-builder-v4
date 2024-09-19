import API_END_POINTS from '@/constants/apiEndPoints';
import { MutationConfig, QueryConfig } from '@/lib/react-query';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { AppT } from '@/types/app';
import { ViewI } from '@/types/view';
import { isValidArray } from '@/utils/format';
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

type UseScreenUpdateMutationOptions = {
    mutationConfig?: MutationConfig<typeof updateScreen>;
    appId: string;
    onSuccess?: (viewId: string) => void;
    onError?: (error: Error) => void;
};

const updateScreen = (appId: string, screen: ViewI) => {
    return BackEndRequest.Post(API_END_POINTS.APPS.SET_APP, {
        app_id: appId,
        view_id: screen.view_id,
        compiled_json: {},
        raw_json: screen,
    }).then((res) => res.data).then((response) => {
        if (!response.error) {
            return screen.view_id
        } else {
            throw new Error(response.message);
        }
    })
}

export const useUpdateScreenMutation = ({ appId, onSuccess, onError }: UseScreenUpdateMutationOptions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (screen: ViewI) => updateScreen(appId, screen),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: getAppMetaQueryOptions(appId).queryKey,
            });
            onSuccess?.(data);
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });
};


export const getScreen = (appId: string, view_id: string) => {
    const queryParams = new URLSearchParams({
        app_id: appId,
        view_id: view_id,
    });
    type ScreenResponseT = {
        raw_data: ViewI,
        compiled_data: ViewI,
    }
    return BackEndRequest.Get<ScreenResponseT>(`${API_END_POINTS.APPS.GET_APPS}?${queryParams}`)
        .then((res) => res.data).then((response) => {
            if (!response.error) {
                return response.data.raw_data
            } else {
                throw new Error(response.message);
            }
        })
}

export const getScreenQueryOptions = (appId: string, view_id: string) => {
    return queryOptions({
        queryKey: ['app', appId, 'screen', view_id],
        queryFn: () => getScreen(appId, view_id),
    });
};

type UseScreenOptions = {
    appId: string;
    view_id: string;
    queryConfig?: QueryConfig<typeof getScreenQueryOptions>;
};

export const useScreen = ({ appId, view_id, queryConfig }: UseScreenOptions) => {
    return useQuery({ ...getScreenQueryOptions(appId, view_id), ...queryConfig });
};


