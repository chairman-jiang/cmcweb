import axios, { AxiosRequestConfig, AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AccessTokenKey, PromiseStatus, ContentTypeEnum } from '@/helpers/enums';
import { isObject } from './index';
import { message } from 'ant-design-vue';
import qs from 'qs';
import cookies from 'js-cookie';
const instance: AxiosInstance = axios.create({
  timeout: 18e4 // 3分钟
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers && Reflect.set(config.headers, AccessTokenKey, cookies.get(AccessTokenKey));
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

export async function primaryRequest<T = any>(config: RequestConfig) : Promise<T> {
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
    const res: AxiosResponse<ResponseData<T> | any> = await instance(c);
    promiseResult = res;
    const result: ResponseData<T> = isObject(res.data) ? res.data : { code: res.status, msg: res.statusText, data: res.data }
    const isSucceed: boolean = result.code === 200;
    promiseStatus = isSucceed ? PromiseStatus.FULFILLED : PromiseStatus.REJECTED;
    !result.msg && (result.msg = isSucceed ? '成功' : '失败');
    return isSucceed ? result.data : Promise.reject(new Error(result.msg));
  } catch (error: any) {
    promiseStatus = PromiseStatus.REJECTED;
    promiseResult = error;
    return Promise.reject(error);
  } finally {
    const isFulfilled = promiseStatus === PromiseStatus.FULFILLED;
    const defaultMsg = isFulfilled ? '成功' : '失败';
    const msg = isFulfilled ? (promiseResult as AxiosResponse).data?.msg : (promiseResult as AxiosError)?.message;
    successMsgFlag && isFulfilled && message.success(msg || defaultMsg);
    errorMsgFlag && !isFulfilled && message.error(msg || defaultMsg);
  }
}
