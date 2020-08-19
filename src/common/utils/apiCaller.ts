import axios, { AxiosRequestConfig } from 'axios';

interface IAxiosInstance {
  get<R>(path: string, config?: IApiCallerConfig): Promise<R>;
  post<R>(
    path: string,
    payload?: object,
    config?: IApiCallerConfig
  ): Promise<R>;
  put<R>(path: string, payload: object, config?: IApiCallerConfig): Promise<R>;
  delete<R>(path: string, config?: IApiCallerConfig): Promise<R>;
  patch<R>(
    path: string,
    payload: object,
    config?: IApiCallerConfig
  ): Promise<R>;
}

export interface IApiCallerConfig extends AxiosRequestConfig {
  uid?: string;
  withBaseUrl?: boolean;
  loader?: boolean;
  errorToast?: boolean;
  showFullPageError?: boolean;
}

const apiCaller = {
  get: <T>(path: string, config?: IApiCallerConfig) =>
    (axios as IAxiosInstance).get<T>(path, config),
  post: <T>(path: string, payload?: object, config?: IApiCallerConfig) =>
    (axios as IAxiosInstance).post<T>(path, payload, config),
  delete: <T>(path: string, config?: IApiCallerConfig) =>
    (axios as IAxiosInstance).delete<T>(path, config),
  patch: <T>(path: string, payload: object, config?: IApiCallerConfig) =>
    (axios as IAxiosInstance).patch<T>(path, payload, config),
};

export default apiCaller;
