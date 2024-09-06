import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getAppsQueryOptions } from './get-apps';

export const deleteApp = ({ id }: { id: string }): Promise<void> => {
    return api.delete(`/app/${id}`);
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
