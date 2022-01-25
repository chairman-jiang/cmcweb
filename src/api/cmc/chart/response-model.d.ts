

declare namespace API {

  type findContractBoardModel = {
    areaContractNumList: {
      areaName: string
      contractNum: number | null
    }[]
    areaMoneyList: {
      areaName: string
      money: string | null
    }[]
    areaOverdueList: {
      areaName: string
      money: string | null
    }[]
    areaReceiptList: {
      areaName: string
      money: string | null
    }[]
    firstPartyNatureList: {
      firstPartyNatureName: string
      totalMoney: string | null
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
    }[]
    monthMoneyList: {
      contractMonth: string
    }[]
    totalContractMoney: string
    totalContractNum: string
    totalOverdueMoney: string
    totalReceiptMoney: string
    [index: string]: any
  }
}