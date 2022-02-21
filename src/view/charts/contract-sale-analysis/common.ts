import * as echarts from 'echarts';
import { ref } from 'vue';
import { ITopDataBoard, ISaleContractMoneyPieOption } from './types';
import { pieColor } from '../common';

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

export const areaTypeCMTableColumnFooter = [

];

export const departmentTypeCMTableColumnFooter = [

]
