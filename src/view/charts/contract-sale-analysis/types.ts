export interface ITopDataBoard {
  title: string
  value: string | number
  key: string
}

export interface ISaleContractMoneyPieOption {
  list: { name: string; value: number | string }[]
  legend: string[]
  handleContractMoneyPieClick: () => void
}

export type contractMoneyTableDataType = API.findReportContractDist | API.findReportAreaDistByAreaOrgId | API.findReportContractDept;

export type initChartDataLabelType = 'areaName' | 'proviceName' | 'departmentName';
