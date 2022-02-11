import { ref } from "vue";
import { ITopDataBoard } from './types'
;
export const useDataBoardList = () => {
  return ref<ITopDataBoard[]>([
    { title: '合同总额', value: '', key: 'totalMoney' },
    { title: '本年度合同总额', value: '', key: 'yearMoney' },
    { title: '本月份合同总额', value: '', key: 'monthMoney' }
  ])
};