import { AxiosResponse } from "axios";

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

export type contentType = 'JSON' | 'TEXT' | 'FORM_URLENCODED' | 'FORM_DATA';
export interface RequestConfig {
  url: string
  method?: Method
  data: object
  successMsgFlag?: boolean
  errorMsgFlag?: boolean,
  contentType?: contentType
}

export interface ResponseData<T> {
  data: T
  msg: string
  code: number
  url?: string
}

export interface ResponseList<T> {
  total: number
  list: [Array<T> | null]
}
