import { ref } from 'vue';
import * as echarts from 'echarts';
import { pieColor, chartMax, monthList } from '../common';
import { useRouter } from 'vue-router';
import { ITopDataBoard, IChartItem, IAreaPieChartModel, IAreaLineChartModel, IMonthSaleLine, IMonthContractAmount, IFirstPartyNatureChartModel } from './types';
// import * as echarts from 'echarts/core';
// import { EcOption } from '@/plugin/sl-echarts';

export const useDataBoardList = () => {
  return ref<ITopDataBoard[]>([
    {
      id: 1,
      title: '年度合同总金额（万元）：',
      money: '',
      moneyKey: 'totalContractMoney',
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
export const useChartList = () : IChartItem[] => [
  {
    title: '区域合同信息展示',
    pieText: '年度销售合同各区域占比',
    pieSubText: '',
    pieId: 'areaContractInfoPie',
    isCircle: false,
    lineText: '各区域合同金额对比',
    lineSubText: '',
    lineId: 'areaContractInfoLine',
    lineColor: '#2E5BFF',
    resultKey: 'areaMoneyList',
    labelKey: 'areaName',
    valueKey: 'money'
  },
  {
    title: '区域回款信息展示',
    pieText: '回款金额区域占比',
    pieSubText: '',
    pieId: 'areaReturnMoneyPie',
    isCircle: true,
    lineText: '各区域回款金额对比',
    lineSubText: '',
    lineId: 'areaReturnMoneyLine',
    lineColor: '#00C1D4',
    resultKey: 'areaReceiptList',
    labelKey: 'areaName',
    valueKey: 'money'
  },
  {
    title: '区域逾期信息展示',
    pieText: '逾期金额区域占比',
    pieSubText: '',
    pieId: 'areaOverduePie',
    isCircle: true,
    lineText: '各区域逾期金额对比',
    lineSubText: '',
    lineId: 'areaOverdueLine',
    lineColor: '#F49A3B',
    resultKey: 'areaOverdueList',
    labelKey: 'areaName',
    valueKey: 'money'
  },
  {
    title: '区域合同数量展示',
    pieText: '合同数量区域占比',
    pieSubText: '',
    pieId: 'areaContractCountPie',
    isCircle: true,
    lineText: '各区域合同数量对比',
    lineSubText: '',
    lineId: 'areaContractCountLine',
    lineColor: '#8C54FF',
    resultKey: 'areaContractNumList',
    labelKey: 'areaName',
    valueKey: 'contractNum'
  }
];

export const useInitAreaPieChart = (data: IAreaPieChartModel) => {
  const chart = echarts.init(<HTMLElement>document.getElementById(data.pieId));
  const option = {
    color: pieColor,
    title: {
      text: ['{a|·}', `{b|${data.pieText}}`].join(''),
      subtext: data.pieSubText,
      x: 20,
      y: 7,
      textStyle: {
        fontSize: 30,
        rich: {
          a: {
            color: data.lineColor,
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
        name: "占比",
        type: "pie",
        radius: data.isCircle ? ['35%', '55%'] : "55%",
        center: ["50%", "60%"],
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
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  chart.setOption(option);
};

export const useInitAreaLineChart = () => {
  const router = useRouter();
  return (data: IAreaLineChartModel) => {
    const { max, interval } = chartMax(data.list);
    const chart = echarts.init(<HTMLElement>document.getElementById(data.lineId));
    const option = {
      title: {
        text: ['{a|·}', `{b|${data.lineText}}`].join(''),
        subtext: data.lineSubText,
        x: 20,
        y: 7,
        textStyle: {
          fontSize: 30,
          rich: {
            a: {
              color: data.lineColor,
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
      color: [data.lineColor],
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        show: false,
        data: data.legend
      },
      xAxis: {
        type: 'category',
        data: data.xAxis,
        axisLabel: {
          interval: 0,
          rotate: 40,
          color: '#222222',
          padding: [10, 0, 0, 0]
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
      grid: {
        left: '10%',
        right: '2%',
        bottom:'20%'
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#222222'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#EDEDED'
          },
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
          name: data.legend[0],
          data: data.list,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#222222',
              fontSize: 16
            }
          },
          emphasis: {
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 3, 3],
                // color: '#F79DA5'
              }
            },
          },
          barWidth: '30px',
          type: 'bar'
        }
      ]
    };
    
    chart.on('click', (e) => {
      const areaItem = data.result.find(t => t[data.labelKey] === e.name);
      if (data.lineId === 'areaContractCountLine') {
        const year = new Date().getFullYear();
        router.push({
          name: 'SubIndex',
          query: {
            areaOrgIdList: [areaItem.areaOrgId],
            signStartDate: year + '-01-01',
            signEndDate: year + '-12-31',
            type: 'contrctIndex'
          }
        })
      } else {
        router.push({
          name: data.lineId === 'areaContractInfoLine' ? 'MarketChart' : data.lineId === 'areaReturnMoneyLine' ? 'IncomeStatisticsChart' : 'NewOverdueChart',
          query: {
            area: areaItem.areaOrgId
          }
        })
      }
    })
    chart.setOption(option);
  }
};

export const useInitMonthSaleLineChart = (data: IMonthSaleLine) => {
  let arr = [...data.overdueMoneyList, ...data.receiptMoneyList, ...data.totalMoneyList];
  let { max, interval } = chartMax(arr);
  let chart = echarts.init(<HTMLElement>document.getElementById('yearMarketLine'));
  let option = {
    color: ['#2E5BFF', '#00C1D4', '#F4733B'],
    title: {
      text: ['{a|·}', `{b|${new Date().getFullYear()}年月度销售趋势}`].join(''),
      x: 20,
      y: 7,
      textStyle: {
        fontSize: 30,
        rich: {
          a: {
            color: '#0038F5',
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
      data: ['合同总额', '回款总额', '逾期总额'],
      top: 17,
      // left: 'right',
      right: '3%',
      orient: 'horizontal',
      itemWidth: 16,
      itemHeight: 6,
      itemGap: 20
    },
    grid: {
      y: 100,
      top: '15%',
      left: '3%',
      right: '3%',
    },
    //x轴
    xAxis: {
      // type: 'category',
      data: monthList,
      axisLabel: {
        color: '#222222',
        padding: [10, 0, 0, 0]
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
    //y轴没有显式设置，根据值自动生成y轴
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
        show: false
      },
      axisTick: {
        show: false
      },
      max,
      min: 0,
      interval
    },
    //数据-data是最终要显示的数据
    series: [
      {
        name: '合同总额',
        type: 'line',
        smooth: true,
        label: {
          normal: {
            show: true
          }
        },
        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //       offset: 0,
        //       color: '#0C55F5'
        //   }, {
        //       offset: 1,
        //       color: 'white'
        //   }])
        // },
        areaStyle: {
          color: 'rgba(224, 235, 250, .8)'
        },
        data: data.totalMoneyList,
        symbolSize: 10,
      },
      {
        name: '回款总额',
        type: 'line',
        smooth: true,
        label: {
          normal: {
            show: true
          }
        },
        symbolSize: 10,
        data: data.receiptMoneyList
      },
      {
        name: '逾期总额',
        type: 'line',
        smooth: true,
        // roundCap: true,
        label: {
          normal: {
            show: true
          }
        },
        symbolSize: 10,
        data: data.overdueMoneyList
      }
    ]
  };
  chart.setOption(option);
};

export const useInitContractAmountLineChart = (data: IMonthContractAmount) => {
  let arr = [...data.addNumList, ...data.addOverdueNumList, ...data.totalNumList, ...data.totalOverdueNumList];
  let { max, interval } = chartMax(arr);
  const chart = echarts.init(<HTMLElement>document.getElementById('contractCountLine'));
  const option = {
    title: {
      text: ['{a|·}', `{b|合同数量详情}`].join(''),
      x: 20,
      y: 7,
      textStyle: {
        fontSize: 30,
        rich: {
          a: {
            color: '#0038F5',
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
      data: ['合同总数量', '逾期总数量', '新增合同数量', '新增逾期数量'],
      top: 17,
      right: '3%',
      orient: 'horizontal',
      itemWidth: 16,
      itemHeight: 6,
      itemGap: 20
    },
    grid: {
      y: 100,
      top: '15%',
      left: '3%',
      right: '3%',
    },
    //x轴
    xAxis: {
      data: monthList,
      axisLabel: {
        color: '#222222',
        padding: [10, 0, 0, 0]
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
    //y轴没有显式设置，根据值自动生成y轴
    yAxis: {
      // type: 'value',
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
        show: false
      },
      axisTick: {
        show: false
      },
      max,
      min: 0,
      interval
    },
    //数据-data是最终要显示的数据
    series: [
      {
        name: '新增合同数量',
        type: 'bar',
        color: '#5E86FF',
        label: {
          normal: {
            show: true,
            position: 'top',
            fontSize: 16,
            color: '#222222'
          }
        },
        emphasis: {
          itemStyle: {
            normal: {
              barBorderRadius: [3, 3, 3, 3]
            }
          },
        },
        barWidth: '20px',
        data: data.addNumList
      },
      {
        name: '新增逾期数量',
        type: 'bar',
        color: '#EC5A5A',
        label: {
          normal: {
            show: true,
            position: 'top',
            fontSize: 16,
            color: '#222222'
          }
        },
        emphasis: {
          itemStyle: {
            normal: {
              barBorderRadius: [3, 3, 3, 3],
              // color: '#F79DA5'
            }
          }
        },
        barWidth: '20px',
        data: data.addOverdueNumList
      },
      {
        name: '合同总数量',
        type: 'line',
        color: '#8C54FF',
        symbolSize: 10,
        label: {
          normal: {
            show: false
          }
        },
        data: data.totalNumList
      },
      {
        name: '逾期总数量',
        type: 'line',
        color: '#F49A3B',
        symbolSize: 10,
        label: {
          normal: {
            show: false
          }
        },
        data: data.totalOverdueNumList
      }
    ]
  };
  chart.setOption(option);
};

export const useInitImportantMessageBarChart = (data: IFirstPartyNatureChartModel) => {
  const chart = echarts.init(<HTMLElement>document.getElementById('importantMessageBarChart'));
  const option = {
    color: ['#2E5BFF', '#FFC502', '#5E86FF', '#2BCCB5', '#F4733B'],
    title: {
      text: ['{a|·}', `{b|甲方性质占比}`].join(''),
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
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: data.legend,
      top: 17,
      right: '35',
      orient: 'horizontal',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20
    },
    grid: {
      left: '1%',
      right: '3%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false,
      max: function (value: any) {
        return value.max;
      }
    },
    yAxis: {
      type: 'category',
      data: [' '],
      show: false
    },
    series: data.list.map((t, index) => {
      let reaius = [0,0,0,0];
      switch (index) {
        case 0:
          reaius = [3, 0, 0, 3];
          break;
        case data.list.length - 1:
          reaius = [0, 3, 3, 0];
          break;
      }
      return {
        name: t.name,
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        emphasis: {
          itemStyle: {
            normal: {
              barBorderRadius: reaius,
              // color: '#F79DA5'
            }
          },
        },
        barWidth: '30px',
        data: [t.value]
      }
    })
  };
  chart.setOption(option);
};


// A->销售助理 B->项目专员 C->