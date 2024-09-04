import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { AppT } from '@/types/app';

import { getAppsQueryOptions } from './get-apps';

export const createAppInputSchema = z.object({
    title: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
    type: z.string().min(1, 'Required'),
});

export type CreateAppInput = z.infer<typeof createAppInputSchema>;

export const createApp = ({
    data,
}: {
    data: CreateAppInput;
}): Promise<AppT> => {
    return api.post(`/app`, data);
};

type UseCreateAppOptions = {
    mutationConfig?: MutationConfig<typeof createApp>;
};

export const useCreateApp = ({
    mutationConfig,
}: UseCreateAppOptions = {}) => {
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
        mutationFn: createApp,
    });
};
