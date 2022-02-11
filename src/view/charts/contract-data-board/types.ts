export interface ITopDataBoard {
  id: number
  title: string
  money: string | number
  moneyKey: string
  subTitle: string
  subMoney: string | number
  subMoneyKey: string
  style: object
  historyTitle: string
  historyMoney: string | number
  historyMoneyKey: string
}

export interface IChartItem {
  title: string
  pieText: string
  pieSubText: string
  pieId: string
  isCircle: boolean
  lineText: string
  lineSubText: string
  lineId: string
  lineColor: string
  resultKey: string
  labelKey: string
  valueKey: string
}

export interface IAreaPieChartModel extends IChartItem {
  legend: string[]
  list: {name: string, value: number, areaOrgId: string}[]
}

export interface IAreaLineChartModel extends IChartItem {
  result: any[]
  legend: number[]
  xAxis: string[]
  list: number[]
}

export interface IMonthSaleLine {
  totalMoneyList: number[]
  receiptMoneyList: number[]
  overdueMoneyList: number[]
};

export interface IMonthContractAmount {
  addNumList: number[]
  addOverdueNumList: number[]
  totalNumList: number[]
  totalOverdueNumList: number[]
}

export interface IFirstPartyNatureChartModel {
  legend: string[],
  list: {
    name: string
    value: number
  }[]
}
