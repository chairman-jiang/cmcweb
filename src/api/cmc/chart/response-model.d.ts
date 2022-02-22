
interface IContractBoardChartListItem {
  areaName: string
  areaOrgId: string | null
  contractNum?: number | null
  money?: number | null
  [index: string]: any
}

declare namespace API {

  type reportFindContractBoardModel = {
    areaContractNumList: IContractBoardChartListItem[]
    areaMoneyList: IContractBoardChartListItem[]
    areaOverdueList: IContractBoardChartListItem[]
    areaReceiptList: IContractBoardChartListItem[]
    firstPartyNatureList: {
      contractNum: number | null
      firstPartyNatureId: number
      firstPartyNatureName: string
      totalMoney: string
    }[]
    historyContractMoney: string
    historyContractNum: number
    historyOverdueMoney: string
    historyReceiptMoney: string
    monthAddContractMoney: string
    monthAddContractNum: string
    monthAddOverdueMoney: string
    monthAddReceiptMoney: string
    monthContractNumList: {
      contractMonth: string
      addNum: number
      addOverdueNum: number
      totalNum: number
      totalOverdueNum: number
    }[]
    monthMoneyList: {
      contractMonth: string
      overdueMoney: string
      receiptMoney: string
      totalMoney: string
    }[]
    totalContractMoney: string
    totalContractNum: string
    totalOverdueMoney: string
    totalReceiptMoney: string
    [index: string]: any
  }

  type reportFindContractSellAnalyzeTotalVo = {
    monthMoney: string
    totalMoney: string
    yearMoney: string
    [index: string]: string
  }

  type reportFindContractDist = {
    areaName: string
    areaOrgId: string
    money: string
    percent: number
    percentStr: string
    moneyToLocal?: string
    [index: string]: any
  }[]

  type reportFindContractDept = {
    areaName: string
    areaOrgId: string
    money: string
    percent: number
    percentStr: string
    proviceName: string
    proviceOrgId: string
    moneyToLocal?: string
    [index: string]: any
  }[]

  type reportFindtAreaDistByAreaOrgId = {
    percentStr: string
    proviceName: string
    money: string
    percent: number
    moneyToLocal?: string
    [index: string]: any
  }[]

  type reportFindContractTrend = {
    month: string
    overdueMoney: string
    receiptMoney: string
    totalMoney: string
    [index: string]: string
  }[]
}