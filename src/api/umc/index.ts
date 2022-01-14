import { primaryRequest } from '@/utils/request';
import { menuId } from '@/helpers';
const createUmcUrl = (path: string) : string => `/api/umc${path}`;

export const getMyMenuPermissionByMenuId = () => primaryRequest<API.MyMenuPermissionModel>({
  url: createUmcUrl('/menu/findMyMenuPermissionByMenuId'),
  method: 'GET',
  data: { menuId }
});

export const signlogin = (data: Param.ISignlogin) => primaryRequest<API.SignloginModel>({
  url: createUmcUrl('/signlogin'),
  method: 'POST',
  data,
  errorMsgFlag: true
})
