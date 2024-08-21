/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { AuthToken } from './api-service/authToken';
import { User } from '@/types/api';
import API_END_POINTS from '@/constants/apiEndPoints';
import CONSTANTS from '@/constants/constants';

type callbackType = (token: string) => void;
type getTokenFromRefreshTokenReturnT = {
    token: null | string;
    refreshToken: null | string;
    error: null | 'INVALID_TOKEN';
};

type refreshTokenRespT = {
    access_token: string;
    refresh_token: string;
};

class AppService {
    private authTokenGenerationQueue: callbackType[] = []; // waiting for refreshed auth token acts as an queue

    isFetchingToken: boolean = false;

    getTokensFromStorage(): { accessToken: string | null; refreshToken: string | null } | null {
        try {
            const accessToken = localStorage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
            const refreshToken = localStorage.getItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
            return {
                accessToken,
                refreshToken
            };
        } catch {
            return null;
        }
    }

    getAccessToken() {
        return localStorage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    }

    getUserFromStorage() {
        const userData = localStorage.getItem(CONSTANTS.STORAGE_KEYS.USER);
        if (userData) {
            return JSON.parse(userData)
        }
        return null;
    }

    validateToken(token: string): boolean {
        const authToken = new AuthToken(token);
        return !authToken.isExpired;
    }

    clear(noRedirect?: boolean): void {
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(CONSTANTS.STORAGE_KEYS.USER);
        if (!noRedirect) {
            setTimeout(() => {
                window.location.replace('/auth/login');
            }, 2000);
        }
    }

    onAccessTokenFetched(accessToken: string): void {
        this.authTokenGenerationQueue.map((callback: callbackType) => callback(accessToken));
    }

    pushToAuthTokenQueue(callback: callbackType): void {
        this.authTokenGenerationQueue.push(callback);
    }

    async storeToken(accessToken: string, refreshToken: string): Promise<void> {
        localStorage.setItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        global.TOKEN = accessToken;
        global.REFRESH_TOKEN = refreshToken;
    }

    async storeUser(user: User): Promise<void> {
        localStorage.setItem(CONSTANTS.STORAGE_KEYS.USER, JSON.stringify(user));
    }

    async getTokenFromRefreshToken(refreshToken: string): Promise<getTokenFromRefreshTokenReturnT> {
        const data: getTokenFromRefreshTokenReturnT = { token: null, refreshToken: null, error: null };
        try {
            const response = await axios.get<refreshTokenRespT>(API_END_POINTS.AUTH.GET_AUTH_TOKEN, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            if (response.status) {
                const { access_token, refresh_token } = response.data;
                data.token = access_token;
                data.refreshToken = refresh_token;
            } else {
                data.error = 'INVALID_TOKEN';
            }
            return data;
        } catch (e) {
            data.error = 'INVALID_TOKEN';
            return data;
        }
    }

    async getUpdatedToken(): Promise<string | Promise<string>> {
        try {
            const { accessToken, refreshToken } = this.getTokensFromStorage() || {};
            if (accessToken) {
                const isValidAccessToken = this.validateToken(accessToken);
                if (isValidAccessToken) {
                    this.authTokenGenerationQueue = [];
                    return accessToken;
                }

                // token is expired,get RefreshToken and update token
                if (refreshToken) {
                    const isValidRefreshToken = this.validateToken(refreshToken);
                    if (isValidRefreshToken) {
                        if (!this.isFetchingToken) {
                            this.isFetchingToken = true;
                            const { token: newToken, refreshToken: updatedRefreshToken } =
                                await this.getTokenFromRefreshToken(refreshToken);
                            if (newToken && updatedRefreshToken) {
                                this.isFetchingToken = false;
                                this.onAccessTokenFetched(newToken);
                                await this.storeToken(newToken, updatedRefreshToken);
                                return newToken;
                            }
                            this.clear();
                        }
                        const tokenFromQueue: Promise<string> = new Promise((resolve) => {
                            this.pushToAuthTokenQueue((authToken) => {
                                resolve(authToken);
                            });
                        });
                        return tokenFromQueue;
                    } else {
                        alert('Session Expired! Login Again.');
                        this.clear();
                    }
                } else {
                    this.clear();
                }
            } else {
                this.clear();
            }
        } catch (e) {
            this.clear();
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Failed to get updated token'); // Indicate failure with a rejected promise
    }
}

export const appService = new AppService();
