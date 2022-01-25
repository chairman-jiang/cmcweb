import { primaryRequest } from "@/utils/request";
import { createCmcUrl } from '../other';

export const findContractBoard = (data: Param.IFindContractBoard) => primaryRequest<API.findContractBoardModel>({
  url: createCmcUrl('/report/findContractBoard'),
  method: 'GET',
  data,
  errorMsgFlag: true
});
