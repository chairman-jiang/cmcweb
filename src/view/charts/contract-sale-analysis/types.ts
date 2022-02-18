export interface ITopDataBoard {
  title: string
  value: string | number
  key: string
}

export interface ISaleContractMoneyPieOption {
  list: { name: string; value: number }[]
  legend: string[]
  handleContractMoneyPieClick: () => void
}

