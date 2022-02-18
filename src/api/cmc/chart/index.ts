import { primaryRequest } from "@/utils/request";
import { createCmcUrl } from '../other';

export const findReportContractBoard = (data: Param.IFindContractBoard) => primaryRequest<API.findReportContractBoardModel>({
  url: createCmcUrl('/report/findContractBoard'),
  method: 'GET',
  data,
  errorMsgFlag: true
});

export const findReportContractSellAnalyzeTotalVo = () => primaryRequest<API.findReportContractSellAnalyzeTotalVo>({
  url: createCmcUrl('/report/findContractSellAnalyzeTotalVo'),
  method: 'GET',
  data: {},
  errorMsgFlag: true
});

export const findReportContractDist = (data: Param.IFindReportContractDist) => primaryRequest<API.findReportContractDist>({
  url: createCmcUrl('/report/findContractDist'),
  method: 'GET',
  data
});
