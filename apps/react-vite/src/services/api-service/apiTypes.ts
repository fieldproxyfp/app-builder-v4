import { AxiosError, AxiosResponse } from 'axios';

export interface ApiResponseI<T> {
	data: T;
	statusKey: boolean;
	message?: string;
	errorCode?: string;
	error?: Record<string, string>;
}

export interface ApiResponseFormatI<T> extends AxiosResponse {
	data: T & {
		statusKey: boolean;
		message: string;
		errorCode: string;
		error: Record<string, string>;
	};
}

export interface ApiErrorI extends AxiosError {
	response: ApiResponseFormatI<unknown>;
}
