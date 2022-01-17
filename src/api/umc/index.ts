import { primaryRequest } from '@/utils/request';
import { menuId } from '@/helpers';
const createUmcUrl = (path: string) : string => `/api/umc${path}`;

export const getMyMenuPermissionByMenuId = () => primaryRequest<API.MyMenuPermissionModel>({
  url: createUmcUrl('/menu/findMyMenuPermissionByMenuId'),
  method: 'GET',
  data: { menuId }
});

export const signlogin = (data: Param.ISignlogin) => primaryRequest<API.UserInfo>({
  url: createUmcUrl('/signlogin'),
  method: 'POST',
  data,
  errorMsgFlag: true
});

export const findUserByUserId = (data: Param.IFindUserByUserId) => primaryRequest<API.UserInfo>({
  url: createUmcUrl('/user/findUserByUserId'),
  method: 'POST',
  data,
  errorMsgFlag: true
});


