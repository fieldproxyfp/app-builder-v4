import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { CreateAppInput } from '@/features/app/api/create-app';
import { db, persistDb } from '../db';
import {
    networkDelay
} from '../utils';

export const appsHandlers = [
    http.post(`${env.API_URL}/app`, async ({ request }) => {
        await networkDelay();

        try {
            const data = (await request.json()) as CreateAppInput;
            const result = db.app.create(data);
            await persistDb('app');
            return HttpResponse.json(result);
        } catch (error: any) {
            return HttpResponse.json(
                { message: error?.message || 'Server Error' },
                { status: 500 },
            );
        }
    }),

    http.delete(`${env.API_URL}/app/:id`, async ({ params }) => {
        await networkDelay();
        try {
            const deleteAppId = params.id as string;
            const result = db.app.delete({
                where: {
                    id: {
                        equals: deleteAppId,
                    }
                }
            });
            await persistDb('app');
            return HttpResponse.json(result);
        } catch (error: any) {
            return HttpResponse.json(
                { message: error?.message || 'Server Error' },
                { status: 500 }
            );
        }
    }),

    http.get(`${env.API_URL}/app`, async ({ cookies, request }) => {
        await networkDelay();
        try {
            // if (error) {
            //   return HttpResponse.json({ message: error }, { status: 401 });
            // }

            const url = new URL(request.url);

            const page = Number(url.searchParams.get('page') || 1);

            const total = db.app.count();

            const totalPages = Math.ceil(total / 10);

            const result = db.app
                .findMany({
                    take: 10,
                    skip: 10 * (page - 1),
                });
            return HttpResponse.json({
                data: result,
                meta: {
                    page,
                    total,
                    totalPages,
                },
            });
        } catch (error: any) {
            return HttpResponse.json(
                { message: error?.message || 'Server Error' },
                { status: 500 },
            );
        }
    }),

    http.get(`${env.API_URL}/app/:id/meta`, async ({ params }) => {
        await networkDelay();
        try {
            const appId = params.id as string;
            const result = db.app.findFirst({
                where: { id: { equals: appId } },
            });
            return HttpResponse.json(result);
        } catch (error: any) {
            return HttpResponse.json(
                { message: error?.message || 'Server Error' },
                { status: 500 },
            );
        }
    }),
]