import { primaryRequest } from "@/utils/request";
import { createCmcUrl } from '../other';

export const reportFindContractBoard = (data: Param.IFindContractBoard) => primaryRequest<API.reportFindContractBoardModel>({
  url: createCmcUrl('/report/findContractBoard'),
  method: 'GET',
  data,
  errorMsgFlag: true
});

export const reportFindContractSellAnalyzeTotalVo = () => primaryRequest<API.reportFindContractSellAnalyzeTotalVo>({
  url: createCmcUrl('/report/findContractSellAnalyzeTotalVo'),
  method: 'GET',
  data: {},
  errorMsgFlag: true
});

export const reportFindContractDist = (data: Param.IReportFindContractDist) => primaryRequest<API.reportFindContractDist>({
  url: createCmcUrl('/report/findContractDist'),
  method: 'GET',
  data
});

export const reportFindContractDept = (data: Param.IReportFindContractDept) => primaryRequest<API.reportFindContractDept>({
  url: createCmcUrl('/report/findContractDept'),
  method: 'GET',
  data
});

export const reportFindAreaDistByAreaOrgId = (data: Param.IReportFindAreaDistByAreaOrgId) => primaryRequest<API.reportFindtAreaDistByAreaOrgId>({
  url: createCmcUrl('/report/findAreaDistByAreaOrgId'),
  method: 'GET',
  data
});

export const reportFindContractTrend = (data: Param.IReportFindContractTrend) => primaryRequest<API.reportFindContractTrend>({
  url: createCmcUrl('/report/findContractTrend'),
  method: 'GET',
  data
});

export const reportFindSellContractProvinceTop = (data: Param.IReportFindSellContractProvinceTop) => primaryRequest<API.reportFindSellContractProvinceTop>({
  url: createCmcUrl('/report/findSellContractProvinceTop'),
  method: 'GET',
  data
});
