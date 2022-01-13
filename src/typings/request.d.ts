type Method =
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

type contentType = 'JSON' | 'TEXT' | 'FORM_URLENCODED' | 'FORM_DATA';
interface RequestConfig {
  url: string
  method?: Method
  data: object
  successMsgFlag?: boolean
  errorMsgFlag?: boolean,
  contentType?: contentType
}

interface ResponseData<T> {
  data: T
  msg: string
  code: number
}

interface ResponseList<T> {
  total: number
  list: [Array<T> | null]
}
