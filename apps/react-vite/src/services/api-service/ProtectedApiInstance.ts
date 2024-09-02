import axios, { CancelTokenSource } from 'axios';
import { appService } from '../appService';
import { ApiResponseI } from './apiTypes';
import { env } from '@/config/env';

export type ErrorHandler<T> = (response: ApiResponseI<T>) => T | undefined;

export interface ResponseErrorHandler<T> {
	[key: string]: ErrorHandler<T> | undefined;
}

export interface ResponseHandlerOptions<T> {
	handleError?: ResponseErrorHandler<T>;
	noAlert?: boolean;
	refreshToken?: string;
	token?: string;
	cancelToken?: CancelTokenSource['token'];
	signal?: AbortController['signal'];
}

export const AxiosInstance = axios.create({
	baseURL: env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		Pragma: 'no-cache',
		Expires: '0'
	},
	validateStatus: () => true,
	withCredentials: false
});

AxiosInstance.interceptors.response.use((res) => {
	if (res.status === 401) {
		appService.clear();
	}
	return res;
});

export const DownloadAxiosInstance = axios.create({
	baseURL: env.API_URL,
	headers: {
		// 'Content-Type': 'application/pdf',
	},
	validateStatus: () => true,
	responseType: 'blob',
	withCredentials: false
});

export const UploadAxiosInstance = axios.create({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	baseURL: env.API_URL,
	headers: {
		'Content-Type': 'multipart/form-data'
	},
	withCredentials: false
});

const X_SERVICE_NAME = 'x-service-name';

export const getRequestDetails = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const token = options?.token;

	if (token) {
		const headers = {
			[X_SERVICE_NAME]: service,
			Authorization: `Bearer ${token}`,
			'x-access-token': token
		};
		return { body, headers };
	}
	const result: string = await appService.getUpdatedToken();
	console.log({ result })
	const headers = {
		[X_SERVICE_NAME]: service,
		Authorization: `Bearer ${result}`,
		'x-access-token': result
	};
	return { body, headers };
};

const Get = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const details = await getRequestDetails(service, body, options);
	const response = AxiosInstance.get<ApiResponseI<T>>(service, {
		data: details.body,
		headers: details.headers,
		cancelToken: options?.cancelToken,
		signal: options?.signal
	});
	return response;
};

const Post = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const details = await getRequestDetails(service, body, options);
	const response = AxiosInstance.post<ApiResponseI<T>>(service, details.body, {
		headers: details.headers || {},
		cancelToken: options?.cancelToken,
		signal: options?.signal
	});
	return response;
};

const Put = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const details = await getRequestDetails(service, body, options);
	const response = AxiosInstance.put<ApiResponseI<T>>(service, details.body, { headers: details.headers });
	return response;
};

const DownloadGet = async <T>(service: string, fromAws?: boolean) => {
	const details = await getRequestDetails(service);
	const response = DownloadAxiosInstance.get<ApiResponseI<T>>(service, {
		headers: !fromAws ? details.headers : {}
	});
	return response;
};

const DownloadPost = async <T>(service: string, body?: object) => {
	const details = await getRequestDetails(service, body);
	const response = DownloadAxiosInstance.post<ApiResponseI<T>>(service, details.body, {
		headers: details.headers
	});
	return response;
};

const Delete = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const details = await getRequestDetails(service, body, options);
	const response = AxiosInstance.delete<ApiResponseI<T>>(service, {
		headers: details.headers,
		data: details.body
	});
	return response;
};

const UploadPost = async <T>(service: string, body?: object) => {
	const details = await getRequestDetails(service, body);
	const response = UploadAxiosInstance.post<ApiResponseI<T>>(service, details.body, { headers: details.headers });
	return response;
};

const UploadPut = async <T>(service: string, body?: object) => {
	const details = await getRequestDetails(service, body);
	const response = UploadAxiosInstance.put<ApiResponseI<T>>(service, details.body, { headers: details.headers });
	return response;
};



const Patch = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
	const details = await getRequestDetails(service, body, options);
	const response = AxiosInstance.patch<ApiResponseI<T>>(service, details.body, { headers: details.headers });
	return response;
};

export const BackEndRequest = {
	Get,
	Post,
	Put,
	Patch,
	Delete,
	DownloadGet,
	UploadPost,
	UploadPut,
	DownloadPost
};
