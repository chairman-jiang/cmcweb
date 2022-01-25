import { primaryRequest } from '@/utils/request';
export const createCmcUrl = (path: string) : string => `/api/cmc${path}`;

export const getVersion = () => primaryRequest<API.GetVersionModel>({
  url: createCmcUrl('/getVersion'),
  method: 'GET',
  data: {}
})