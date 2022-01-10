import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { AccessTokenKey } from '@/helpers/enums';
import { RequestConfig, ResponseBody } from '@/types/request';

const instance: AxiosInstance = axios.create({
  timeout: 18e4 // 3分钟
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers && Reflect.set(config.headers, AccessTokenKey, '');
  return config;
}, (error: AxiosError) => {
  Promise.reject(error);
})

instance.interceptors.response.use((response: AxiosResponse<ResponseBody>) => {
  // do something if like 401 error catch
  return response;
}, (error: AxiosError) => {
  Promise.reject(error);
});

function requestBaseSetting() {}

function request(config: RequestConfig) {

}
