import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '@/types';

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';
const TIMEOUT_MS = 15_000;
const AUTH_TOKEN_KEY = 'vms_auth_token';

// ─── Axios Instance ───────────────────────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attaches JWT bearer token to every outgoing request

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Centralised error normalisation; TanStack Query handles retry logic

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.replace('/login');
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }

    if (status === 403) {
      return Promise.reject(
        new Error('You do not have permission to perform this action.'),
      );
    }

    if (status === 404) {
      return Promise.reject(new Error('The requested resource was not found.'));
    }

    if (status !== undefined && status >= 500) {
      return Promise.reject(
        new Error('A server error occurred. Please try again later.'),
      );
    }

    const message =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred.';

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
