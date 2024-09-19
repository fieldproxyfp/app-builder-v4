import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';

import API_END_POINTS from '@/constants/apiEndPoints';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { getAppsQueryOptions } from './get-apps';

export const deleteApp = ({ id }: { id: string }): Promise<string> => {
    return BackEndRequest.Delete(
        `${API_END_POINTS.APPS.REMOVE_APP}`,
        { app_id: id }
    ).then((res) => res.data).then((response) => {
        if (!response.error) {
            return id;
        } else {
            throw new Error(response.message);
        }
    });
};

type UseDeleteAppOptions = {
    mutationConfig?: MutationConfig<typeof deleteApp>;
};

export const useDeleteApp = ({
    mutationConfig,
}: UseDeleteAppOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getAppsQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: deleteApp,
    });
};
