import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { AppT } from '@/types/app';

import API_END_POINTS from '@/constants/apiEndPoints';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';
import { nanoid } from 'nanoid';
import { getAppsQueryOptions } from './get-apps';

export const createAppInputSchema = z.object({
    title: z.string().min(1, 'Required'),
    description: z.string().min(1, 'Required'),
    type: z.string().min(1, 'Required'),
});

export type CreateAppInput = z.infer<typeof createAppInputSchema>;


export const createApp = async ({
    data,
}: {
    data: CreateAppInput;
}): Promise<AppT> => {
    const app_id = nanoid();
    const app: Partial<AppT> = {
        app_id,
        compiled_data: null,
        raw_data: {
            title: data.title,
            description: data.description,
            metadata: {
                version: '1.0.0',
                lastModified: new Date().toISOString()
            },
            views: {},
            app_id,
            createdAt: new Date().getTime()
        }
    };
    const res = await BackEndRequest.Post<AppT>(API_END_POINTS.APPS.ADD_APP, {
        ...app
    });
    const data_1 = res.data;
    if (!data_1.error) {
        return data_1.data;
    } else {
        throw new Error(data_1.message);
    }
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
