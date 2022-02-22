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

export type contractMoneyTableDataType = API.reportFindContractDist | API.reportFindtAreaDistByAreaOrgId | API.reportFindContractDept;

export type initChartDataLabelType = 'areaName' | 'proviceName' | 'departmentName';

export interface IContractMoneyTrendLineOption {
  legend: string[]
  xAxis: string[],
  totalMoney: number[],
  receiptMoney: number[],
  overdueMoney: number[],
  [index: string]: any
}
