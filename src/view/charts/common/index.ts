import print, { exportPDF } from "@/helpers/print";
import { message } from "ant-design-vue";
import { ref, nextTick } from "vue";

export const pieColor = ['#3B6AF6', '#5E86FF', '#8F63E9', '#8453E9', '#E139A3', '#F06161', '#F47E4B', '#F49A3B', '#FFC737', '#FFE377', '#24CCDD', '#4DEED7'];

export const monthList: string[] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export const monthNumberList:  number[] = Array(12).fill(0).map((_, index) => index + 1);

/**
 * @param list 
 * @returns max: 最大数 interval: 图表背景线数量
 * @description 用于echarts option
 */
export const chartMax = (list: number[]) => {
  let max = 0, interval = 0;
  list.forEach(t => {
    if (Number(t) >= max) {
      max = Number(t);
    }
  })
  if (max < 5) {
    max = 5;
    interval = 1;
  } else {
    interval = Math.ceil(max / 5);
    max += interval / 2;
    interval = Math.ceil(max / 5);
  }
  
  return {
    max: Math.ceil(max),
    interval
  }
}

/**
 * @param allClassList
 * @returns printFlag: boolean; handlePrint :() => void
 * @description 打印和导出pdf
 */
export const usePrint = (allClassList?: string[]) => {
  const printFlag = ref<boolean>(false);

  const handlePrint = (type: 'pdf' | 'print' = 'print', fileName?: string, singleClassList?: string[]) => {
    message.loading({content: '正在加载...'});
    printFlag.value = true;
    const domList: HTMLElement[] = (allClassList || singleClassList)?.map(className => {
      return <HTMLElement>document.querySelector(className);
    }) || [];

    nextTick(() => {
      if (type === 'print') {
        print(domList).finally(() => {
          printFlag.value = false;
          message.destroy();
        });
      } else {
        exportPDF(domList, fileName).finally(() => {
          printFlag.value = false;
          message.destroy();
        });
      }
    });
  }
  
  return {
    printFlag,

    handlePrint
  }
}
