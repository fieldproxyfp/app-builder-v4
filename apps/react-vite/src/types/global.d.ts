/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { AppActions } from './common/actions';
import { AppEnvironmentT } from './environment';

declare global {
	var ENV: AppEnvironmentT;
	var TOKEN: string;
	var REFRESH_TOKEN: string;
	var PUBLIC_ID: string;
	var IS_PRIVATE_LOGGED_IN: boolean | null;
	var PUBLIC_TOKEN: string | null;
	var PUBLIC_REFRESH_TOKEN: string | null;
	var ORGANIZATION_ID: string | null;
	var NETWORK_REQUESTS: unknown;
	var ACTIONS: AppActions;
	var TIMEZONE: string;
}

export {};
