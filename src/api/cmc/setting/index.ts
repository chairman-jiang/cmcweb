import { primaryRequest } from '@/utils/request';
import { createCmcUrl } from '../other';

export const orgsetFindAllArea = () => primaryRequest<API.orgsetFindAllArea>({
  url: createCmcUrl('/orgset/findAllArea'),
  method: 'GET',
  data: {}
});
