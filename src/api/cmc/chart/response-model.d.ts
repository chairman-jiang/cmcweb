
interface IContractBoardChartListItem {
  areaName: string
  areaOrgId: string | null
  contractNum?: number | null
  money?: number | null
  [index: string]: any
}

declare namespace API {

  type findContractBoardModel = {
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
}