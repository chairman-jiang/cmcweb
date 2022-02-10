<template>
  <div class="contract-data-board">
    <div class="print-view1">
      <page-sub-title title="合同数据看板">
        <template #right>
          <div v-show="!printFlag">
            <a-button @click="handlePrint('pdf')">导出PDF</a-button>
            <a-button type="primary" @click="handlePrint('print')">打印</a-button>
          </div>
        </template>
      </page-sub-title>
      <div class="data-board-card">
        <div class="board-card-item" v-for="card in dataBoardList" :key="card.id" :style="card.style">
          <div class="board-item-title">{{card.historyTitle}}</div>
            <div class="board-item-money">{{card.historyMoney}} <img height="30px" src="@/assets/header-chart@2x.png" /> </div>
            <div class="board-item-subtitle">
              <span>{{card.title}}</span>
              <span>{{card.money}}</span>
            </div>
            <div class="board-item-subtitle">
              <span>{{card.subTitle}}</span>
              <span>{{card.subMoney}}</span>
              <img style="height: 10px;" src="@/assets/header-arrow@2x.png" />
            </div>
        </div>
      </div>
      <div class="data-board-chart-item pie-line-item" v-for="item in chartList.slice(0, 1)" :key="item.title">
        <div class="chart-title">{{item.title}}</div>
        <div class="chart-view">
          <div class="chart-pie" :id="item.pieId"></div>
          <div class="chart-line" :id="item.lineId"></div>
        </div>
      </div>
    </div>
    
    <div class="print-view2">
      <div class="data-board-chart-item pie-line-item" v-for="item in chartList.slice(1,3)" :key="item.title">
        <div class="chart-title">{{item.title}}</div>
        <div class="chart-view">
          <div class="chart-pie" :id="item.pieId"></div>
          <div class="chart-line" :id="item.lineId"></div>
        </div>
      </div>
    </div>

    <div class="print-view3">
      <div class="data-board-chart-item pie-line-item" v-for="item in chartList.slice(3,4)" :key="item.title">
        <div class="chart-title">{{item.title}}</div>
        <div class="chart-view">
          <div class="chart-pie" :id="item.pieId"></div>
          <div class="chart-line" :id="item.lineId"></div>
        </div>
      </div>
    </div>

    <div class="print-view4">
      <div class="data-board-chart-item">
        <div class="chart-title">本年度趋势展示</div>
        <div class="line-item" id="yearMarketLine"></div>
        <div class="line-item" id="contractCountLine"></div>
      </div>
    </div>

    <div class="print-view5">
      <div class="data-board-chart-item">
        <div class="chart-title">重要信息占比</div>
        <div class="bar-item" id="importantMessageBarChart"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { findContractBoard } from '@/api/cmc';
import { useDataBoardList, useChartList, useInitAreaPieChart, useInitAreaLineChart, useInitMonthSaleLineChart, useInitContractAmountLineChart, useInitImportantMessageBarChart } from './common';
import { IAreaPieChartModel, IAreaLineChartModel, IMonthSaleLine, IMonthContractAmount, IFirstPartyNatureChartModel } from './types';
import { monthList } from '../common';
import { numberReg } from '@/utils/regexp';
import { isArrayHasContents, sort } from '@/utils';
import print, { exportPDF } from '@/helpers/print';
import { ref, nextTick } from 'vue';
import { message } from 'ant-design-vue';

const dataBoardList = useDataBoardList();
const chartList = useChartList();
const printFlag = ref<boolean>(false);

findContractBoard({ isContract: 1 }).then(res => {
  // 顶部4条看板
  const convertValue = (val: string) : string => numberReg.test(val) ? Number(val).toLocaleString() : '';
  const now = new Date();
  dataBoardList.value.forEach(t => {
    t.money = convertValue(res[t.moneyKey]);
    t.subMoney = convertValue(res[t.subMoneyKey]);
    t.historyMoney = convertValue(res[t.historyMoneyKey]);
    t.subTitle = now.getMonth() + 1 + t.subTitle;
  });
  // 获取区域柱状图渲染函数, 在这里初始化是避免此函数内部循环useRouter
  const initLineChart = useInitAreaLineChart();
  // 区域图表部分
  chartList.forEach(t => {
    // 饼状图数据
    const pieData : IAreaPieChartModel = {
      ...t,
      legend: [],
      list: []
    };
    // 柱状图数据
    const lineData: IAreaLineChartModel = {
      ...t,
      result: res[t.resultKey],
      legend: [],
      xAxis: [],
      list: []
    };
    if (isArrayHasContents(res[t.resultKey])) {
      const resultList: IContractBoardChartListItem[] = sort(res[t.resultKey], t.valueKey);
      resultList.forEach(sub => {
        pieData.legend.push(sub[t.labelKey]);
        pieData.list.push({
          name: sub[t.labelKey],
          value: sub[t.valueKey],
          areaOrgId: sub?.areaOrgId || ''
        })
        lineData.xAxis.push(sub[t.labelKey]);
        lineData.list.push(sub[t.valueKey]);
      });
      useInitAreaPieChart(pieData);
      initLineChart(lineData);
    }
  });

  // 本年度趋势图表数据
  const monthSaleLine: IMonthSaleLine = {
    totalMoneyList: [],
    receiptMoneyList: [],
    overdueMoneyList: []
  };

  const monthContractAmountLine: IMonthContractAmount = {
    addNumList: [],
    addOverdueNumList: [],
    totalNumList: [],
    totalOverdueNumList: []
  };
  monthList.forEach((item, index) => {
    let find = isArrayHasContents(res.monthMoneyList) ? res.monthMoneyList.find(sub => {
      let month = sub.contractMonth.split('-')[1];
      let item = index + 1;
      return item === Number(month);
    }) : null;
    monthSaleLine.totalMoneyList.push(find ? Number(find.totalMoney) : 0);
    monthSaleLine.receiptMoneyList.push(find ? Number(find.receiptMoney) : 0);
    monthSaleLine.overdueMoneyList.push(find ? Number(find.overdueMoney) : 0);

    let secondFind = isArrayHasContents(res.monthContractNumList) ? res.monthContractNumList.find(sub => {
      let month = sub.contractMonth.split('-')[1];
      let item = index + 1;
      return item === Number(month);
    }) : null;
    monthContractAmountLine.addNumList.push(secondFind?.addNum || 0);
    monthContractAmountLine.addOverdueNumList.push(secondFind?.addOverdueNum || 0);
    monthContractAmountLine.totalNumList.push(secondFind?.totalNum || 0);
    monthContractAmountLine.totalOverdueNumList.push(secondFind?.totalOverdueNum || 0);
  });
  useInitMonthSaleLineChart(monthSaleLine);
  useInitContractAmountLineChart(monthContractAmountLine);

  // 重要信息占比数据
  const firstPartyNature: IFirstPartyNatureChartModel = {
    legend: [],
    list: []
  };
  res.firstPartyNatureList.forEach(t => {
    firstPartyNature.legend.push(t.firstPartyNatureName);
    firstPartyNature.list.push({
      name: t.firstPartyNatureName,
      value: t.totalMoney ? Number(t.totalMoney) : 0
    });
  });

  useInitImportantMessageBarChart(firstPartyNature);
});

/**
 * @param type
 * @description 打印事件
 */
const handlePrint = (type: 'pdf' | 'print' = 'print') => {
  message.loading({content: '正在加载...'});
  printFlag.value = true;
  const domList: HTMLElement[] = Array(5).fill(0).map((_, index) => {
    return <HTMLElement>document.querySelector(`.print-view${index + 1}`);
  });

  nextTick(() => {
    if (type === 'print') {
      print(domList).finally(() => {
        printFlag.value = false;
        message.destroy();
      });
    } else {
      exportPDF(domList, '收入确认分析统计(财务)').finally(() => {
        printFlag.value = false;
        message.destroy();
      });
    }
  });
}

</script>
<style lang="less" scoped>
.contract-data-board {
  height: 100%;
  overflow-y: auto;
  .data-board-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 15px;
    .board-card-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(25% - 15px);
      height: 1.77rem;
      border-radius: 5px;
      padding: .2rem .17rem;
      cursor: pointer;
      &+& {
        margin-left: 15px;
      }
    }
    .board-item-title {
      position: relative;
      font-size: .16rem;
      font-family: PingFangSC-Regular,PingFang SC;
      font-weight: 400;
      color:rgba(255, 255, 255, .7);
      padding-left: .10rem;
      &::before {
        content: "";
        position: absolute;
        height: .05rem;
        width: .05rem;
        border-radius: 50%;
        background: white;
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
      }
    }
    .board-item-money {
      position: relative;
      font-size: .32rem;
      font-family: FZZDHJW--GB1-0,FZZDHJW--GB1;
      font-weight: 500;
      color:rgba(255,255,255,1);
      img {
        position: absolute;
        right: .03rem;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: rgba(238, 241, 248, .3);
        margin-top: .1rem;
      }
    }
    .board-item-subtitle {
      font-size: .14rem;
      span:nth-child(1) {
        color:rgba(255, 255, 255, .7);
      }
      span:nth-child(2) {
        color: white;
      }
      img {
        margin-left: .1rem;
      }
    }
  }

  .data-board-chart-item {
    .chart-title {
      position: relative;
      font-size: .16rem;
      height: 0.2rem;
      width: 100%;
      margin: 0.35rem 0 0.1rem;
      font-weight: 600;
    }
    .line-item {
      height: 4rem;
      margin-top: .2rem;
      background: white;
      border-radius: .05rem;
    }
    .bar-item {
      height: 1.5rem;
      background: white;
      border-radius: .05rem;
    }
  }
  .pie-line-item {
    .chart-view {
      display: flex;
      height: 412px;
      width: 100%;
      .chart-pie {
        width: 35%;
        height: 100%;
        background: #fff;
        border-radius: 0.05rem;
      }
      .chart-line {
        width: calc(65% - 0.28rem);
        height: 100%;
        border-radius: 0.05rem;
        background: #fff;
        margin-left: 0.28rem;
      }
    }
  }
}
</style>