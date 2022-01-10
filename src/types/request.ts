export interface RequestConfig {
  url: string
  method?: string
  successMsg?: string
  errorMsg?: string
}

export interface ResponseBody {
  data: any
  msg: [string | null]
  code: [number | null]
}
