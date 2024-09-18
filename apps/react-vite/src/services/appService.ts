/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import API_END_POINTS from '@/constants/apiEndPoints';
import CONSTANTS from '@/constants/constants';
import { User } from '@/types/api';
import axios from 'axios';
import { AuthToken } from './api-service/authToken';

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
        return !new AuthToken(token).isExpired;
    }

    clear(noRedirect: boolean = false): void {
        this.clearLocalStorage();
        if (!noRedirect) {
            this.redirectToLogin();
        }
    }

    private clearLocalStorage(): void {
        [CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, CONSTANTS.STORAGE_KEYS.USER].forEach(key =>
            localStorage.removeItem(key)
        );
    }

    private redirectToLogin(): void {
        setTimeout(() => window.location.replace('/auth/login'), 2000);
    }

    onAccessTokenFetched(accessToken: string): void {
        this.authTokenGenerationQueue.forEach(callback => callback(accessToken));
        this.authTokenGenerationQueue = [];
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
        try {
            const response = await axios.get<refreshTokenRespT>(API_END_POINTS.AUTH.GET_AUTH_TOKEN, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });

            if (response.status) {
                const { access_token, refresh_token } = response.data;
                return { token: access_token, refreshToken: refresh_token, error: null };
            }
            return { token: null, refreshToken: null, error: 'INVALID_TOKEN' };
        } catch (e) {
            return { token: null, refreshToken: null, error: 'INVALID_TOKEN' };
        }
    }

    async getUpdatedToken(): Promise<string> {
        try {
            const { accessToken, refreshToken } = this.getTokensFromStorage() || {};

            if (accessToken && this.validateToken(accessToken)) {
                return accessToken;
            }

            if (refreshToken && this.validateToken(refreshToken)) {
                return this.handleRefreshToken(refreshToken);
            }

            throw new Error('Invalid or expired tokens');
        } catch (e) {
            this.clear();
            return Promise.reject('Failed to get updated token');
        }
    }

    private async handleRefreshToken(refreshToken: string): Promise<string> {
        if (!this.isFetchingToken) {
            return this.fetchNewToken(refreshToken);
        }
        return this.waitForNewToken();
    }

    private async fetchNewToken(refreshToken: string): Promise<string> {
        this.isFetchingToken = true;
        const { token: newToken, refreshToken: updatedRefreshToken } = await this.getTokenFromRefreshToken(refreshToken);

        if (newToken && updatedRefreshToken) {
            this.isFetchingToken = false;
            this.onAccessTokenFetched(newToken);
            await this.storeToken(newToken, updatedRefreshToken);
            return newToken;
        }

        throw new Error('Failed to fetch new token');
    }

    private waitForNewToken(): Promise<string> {
        return new Promise((resolve) => {
            this.pushToAuthTokenQueue(resolve);
        });
    }
}

export const appService = new AppService();
