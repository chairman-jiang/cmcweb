import * as echarts from 'echarts';
import { ref } from 'vue';
import { ITopDataBoard, ISaleContractMoneyPieOption, IContractMoneyTrendLineOption } from './types';
import { pieColor, chartMax, monthNumberList } from '../common';

export const useDataBoardList = () => {
  return ref<ITopDataBoard[]>([
    { title: '合同总额', value: '', key: 'totalMoney' },
    { title: '本年度合同总额', value: '', key: 'yearMoney' },
    { title: '本月份合同总额', value: '', key: 'monthMoney' }
  ]);
};

export const useInitContractMoneyPieChart = (data: ISaleContractMoneyPieOption) => {
  const chart = echarts.init(<HTMLElement>document.getElementById('saleContractMoneyPie'));
  const option = {
    color: pieColor,
    title: {
      text: ['{a|·}', `{b|年度销售合同各区域占比}`].join(''),
      x: 20,
      y: 7,
      textStyle: {
        fontSize: 30,
        rich: {
          a: {
            color: '#3461F6',
            fontSize: 30,
          },
          b: {
            fontSize: 16,
            fontWeight: 400,
            color: '#4C5967'
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      show: false,
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 120,
      bottom: 15,
      itemWidth: 9,
      itemHeight: 9,
      itemGap: 15,
      data: data.legend
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: data.list,
        labelLine: {
          lineStyle: {
            color: '#A4B1BD'
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option);
  chart.on('click', data.handleContractMoneyPieClick.bind(this, data));
};

export const cmTableColumn = [
  {
    title: '合同金额',
    dataIndex: 'moneyToLocal',
    align: 'center'
  },
  {
    title: '所占比例',
    dataIndex: 'percentStr',
    align: 'center'
  }
];

export const useInitContractMoneyLineChart = (data: IContractMoneyTrendLineOption) => {
  const arr = [...data.totalMoney, ...data.receiptMoney, ...data.overdueMoney];
  let { max, interval } = chartMax(arr);
  const chart = echarts.init(<HTMLElement>document.getElementById('contractMoneyTrendLine'));
  const options = {
    color: ['#2E5BFF', '#00C1D4', '#F4733B'],
    title: {
      text: ['{a|·}', `{b|${new Date().getFullYear()}年月度销售趋势}`].join(''),
      x: 20,
      y: 7,
      textStyle: {
        fontSize: 30,
        rich: {
          a: {
            color: '#3461F6',
            fontSize: 30,
          },
          b: {
            fontSize: 16,
            fontWeight: 400,
            color: '#4C5967'
          }
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: data.legend,
      top: 17,
      right: '3%',
      orient: 'horizontal',
      itemWidth: 16,
      itemHeight: 6,
      itemGap: 20
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      data: data.xAxis,
      // boundaryGap: ['20%', '20%'],
      axisLabel: {
        color: '#222222',
        lineHeight: 56,        
        // padding: [10, 0, 0, 0]
      },
      axisLine: {
        lineStyle: {
          color: '#EDEDED'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      splitNumber: 5, 
      axisLine: {
        show: false,
        lineStyle: {
          color: '#EDEDED'
        },
        // symbolSize: [30, 15]
        //  symbolOffset: [10]
      },
      axisLabel: {
        show: true,
        color: '#222222'
      },
      axisTick: {
        show: false
      },
      max,
      min: 0,
      interval
    },
    series: [
      {
        name: '合同总额',
        type: 'line',
        smooth: true,
        symbolSize: 10,
        data: data.totalMoney,
        areaStyle: {
          color: 'rgba(224, 235, 250, .8)'
        }
      },
      {
        name: '收款总额',
        type:'line',
        smooth: true,
        symbolSize: 10,
        data: data.receiptMoney,
        label: {
          normal: {
            show: false,
            position: 'bottom',
            formatter: '{c}',
            color: ['black']
          }
        }
      },
      {
        name: '逾期总额',
        type:'line',
        smooth: true,
        symbolSize: 10,
        data: data.overdueMoney,
        label: {
          normal: {
            show: false,
            position: 'bottom',
            formatter: '{c}',
            color: ['black']
          }
        }
      }
    ]
  };
  chart.setOption(options);
};

export const contractMoneyTrendTableColumn = monthNumberList.map(t => ({ title: `${t}月`, dataIndex: `${t}Text` }));
