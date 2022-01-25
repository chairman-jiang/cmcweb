import { ref } from 'vue';

interface ITopDataBoardItem {
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

export const useDataBoardList = () => {
  return ref<ITopDataBoardItem[]>([
    {
      id: 1,
      title: '年度合同总金额（万元）：',
      money: 'totalContractMoney',
      moneyKey: '',
      subTitle: '月新增（万元）：',
      subMoney: '',
      subMoneyKey: 'monthAddContractMoney',
      style: { backgroundColor: '#2E5BFF'},
      historyTitle: '合同总额(万元)',
      historyMoney: '',
      historyMoneyKey: 'historyContractMoney'
    },
    {
      id: 2,
      title: '年度回款总金额（万元）：',
      money: '',
      moneyKey: 'totalReceiptMoney',
      subTitle: '月新增（万元）：',
      subMoney: '',
      subMoneyKey: 'monthAddReceiptMoney',
      style: { backgroundColor: '#00C1D4'},
      historyTitle: '回款总金额(万元)',
      historyMoney: '',
      historyMoneyKey: 'historyReceiptMoney'
    },
    {
      id: 3,
      title: '年度逾期总金额（万元）：',
      money: '',
      moneyKey: 'totalOverdueMoney',
      subTitle: '月新增（万元）：',
      subMoney: '',
      subMoneyKey: 'monthAddOverdueMoney',
      style: { backgroundColor: '#F49A3B'},
      historyTitle: '逾期总金额(万元)',
      historyMoney: '',
      historyMoneyKey: 'historyOverdueMoney'
    },
    {
      id: 4,
      title: '年度合同总数（份）：',
      money: '',
      moneyKey: 'totalContractNum',
      subTitle: '月新增（份）：',
      subMoney: '',
      subMoneyKey: 'monthAddContractNum',
      style: { backgroundColor: '#8C54FF'},
      historyTitle: '合同总数(份)',
      historyMoney: '',
      historyMoneyKey: 'historyContractNum'
    }
  ]);
}