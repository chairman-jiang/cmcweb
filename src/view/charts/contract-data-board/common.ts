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

/*
  以钱三文, 熏于炉上, 致敬而祝曰(先洗手, 准备三个硬币,心无杂念, 虔诚祝曰)
  铜钱匿于双手内, 双手抬高 高度大于等于头顶
  起下卦前祝曰:
    高仓不言,叩之即应
    列圣有灵,感而自通
    某姓虔诚(自报姓名)
    有事关心(禀名事由和问题)
    狐疑犹豫,不能自决
    吉凶得失,为卦是凭
    仰望圣慈,明彰昭报
  上卦前祝曰:
    某宫二象, 吉凶未判, 再求某象三爻, 已成一卦

  六爻卦构成:
  1.日期与干支历和旬空(在古代用干支历表示年月日, 其中地支作用大一些, 运用地支测出五行生克关系,推出本卦利害福祸关系)
  2.卦名,卦宫和64卦
  3.本卦,变卦(也叫之卦),静卦
  4.64卦配装五行
  5.装世爻和应爻
  6.装六亲
  7.扶神
  8.装六神

  日期生成干支历和旬空
  1.生成干支历, 才能知道一个卦的天时和五行生克关系, 得月支和日支生者, 最为旺. 被月支和日支所克者,最衰
  2.断六爻卦和天干没多大关系, 一般情况下不看日期上和卦里的天干
  3.旬空: 中国古代按一个天干的周期为一个小周期(就像现在按周来安排工作一样),天干有10个, 但是地支有12个,那10天里 肯定有两个生肖值不了班,那值不了班的生肖影响力就可能不存在. 不值班的小动物(生肖, 地支)就叫在本旬内旬空

  世爻和应爻
  本卦中 2爻是世爻, 5爻是应爻
  变卦中 初爻是应爻, 4爻是世爻
*/

export const useInitAreaLineChart = () => {
  const router = useRouter();
  return (data: IAreaLineChartModel) => {
    let { max, interval } = chartMax(data.list);
    let chart = echarts.init(<HTMLElement>document.getElementById(data.lineId));
    let option = {
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
  let chart = echarts.init(<HTMLElement>document.getElementById('importantMessageBarChart'));
  let option = {
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