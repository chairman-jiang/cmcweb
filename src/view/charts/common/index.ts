export const pieColor = ['#3B6AF6', '#5E86FF', '#8F63E9', '#8453E9', '#E139A3', '#F06161', '#F47E4B', '#F49A3B', '#FFC737', '#FFE377', '#24CCDD', '#4DEED7'];

export const monthList: string[] = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

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