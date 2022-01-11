import axios, { AxiosRequestConfig, AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AccessTokenKey, PromiseStatus, ContentTypeEnum } from '@/helpers/enums';
import { RequestConfig, ResponseData } from '@/types/request';
import { isObject } from './index';
import { message } from 'ant-design-vue';
import qs from 'qs';
const instance: AxiosInstance = axios.create({
  timeout: 18e4 // 3分钟
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers && Reflect.set(config.headers, AccessTokenKey, '');
  return config;
}, (error: AxiosError) => {
  Promise.reject(error);
})

instance.interceptors.response.use((response: AxiosResponse) => {
  // do something if like 401 error catch
  return response;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

export async function primaryRequest<T = any>(config: RequestConfig) : Promise<ResponseData<T>> {
  const { url, method, data, contentType, successMsgFlag, errorMsgFlag } = config;
  const isGetMethod = 'get' === method?.toLocaleLowerCase();
  let promiseStatus = PromiseStatus.PENDING;
  let promiseResult: AxiosResponse | any
  // let executorResolve;
  const c: AxiosRequestConfig = {
    url,
    method,
    [isGetMethod ? 'params' : 'data']: !isGetMethod ? qs.stringify(data) : data,
    // cancelToken: new axios.CancelToken((resolve) => {
    //   executorResolve = resolve
    // })
  };
  if (contentType) {
    Reflect.set(c, 'headers', {
      contentType: ContentTypeEnum[contentType]
    });
  }
  try {
    const res: AxiosResponse = await instance(c);
    promiseResult = res;

    const result: ResponseData<T> = isObject(res.data)
    ? { ...res.data, url: res.config.url }
    : { code: 200, msg: '成功', data: res.data, url: res.config.url };

    const isSucceed: boolean = result.code === 200;
    promiseStatus = isSucceed ? PromiseStatus.FULFILLED : PromiseStatus.REJECTED;
    !result.msg && (result.msg = isSucceed ? '成功' : '失败');
    return isSucceed ? result : Promise.reject(new Error(result.msg));
  } catch (error: any) {
    promiseStatus = PromiseStatus.REJECTED;
    promiseResult = error;
    return Promise.reject(error);
  } finally {
    if (successMsgFlag || errorMsgFlag) {
      const isFulfilled = promiseStatus === PromiseStatus.FULFILLED;
      const defaultMsg = isFulfilled ? '成功' : '失败';
      const msg = isFulfilled ? (promiseResult as AxiosResponse).data?.msg : (promiseResult as AxiosError)?.message;
      message[isFulfilled ? 'success' : 'error'](msg || defaultMsg);
    }
  }
}
