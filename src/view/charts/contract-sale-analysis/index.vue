<template>
  <div class="contract-sale-analysis">
    <div class="print-view1">
      <page-sub-title title="销售合同分析">
        <template #right>
          <div v-show="!printFlag">
            <a-button @click="handlePrint('pdf', 'name')">导出PDF</a-button>
            <a-button type="primary" @click="handlePrint('print')">打印</a-button>
          </div>
        </template>
      </page-sub-title>
      <div class="data-board-card">
        <div class="board-card-item" v-for="item in dataBoardList" :key="item.key">
          <div class="board-item-title">{{item.title}}</div>
          <div class="board-item-content">
            <span class="item-value">{{item.value}}</span>
            <img style="height: 30px;" src="@/assets/header-chart@2x.png" />
          </div>
        </div>
      </div>
      <div class="tab-view">
        <sl-tabs v-model="tabActive" :out-line="true" :pane-active-mode="'font'" @change="handleTabsChange">
          <sl-tab-pane name="area">区域</sl-tab-pane>
          <sl-tab-pane name="department">部门</sl-tab-pane>
        </sl-tabs>
        <div class="tab-select-view" v-show="tabActive === 'area'">
          <a-select v-model:value="areaId" allowClear placeholder="请输入" style="width: 140px;" @change="handleAreaSelectChange">
            <a-select-option v-for="item in contractDistList" :key="item.areaOrgId" :value="item.areaOrgId">{{item.areaName}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="contract-money-chart">
        <div class="contract-money-chart__header">
          <div class="header-title__left">
            <span class="title-text">合同金额分布情况</span>
            <a-radio-group v-model:value="contractMoneyRadio">
              <a-radio value="year">按年度展示</a-radio>
              <a-radio value="month">按月度展示</a-radio>
            </a-radio-group>
            <a-date-picker v-model:value="yearPickerValue" valueFormat="YY" picker="year" v-if="contractMoneyRadio === 'year'" />
            <a-date-picker v-model:value="monthPickerValue" valueFormat="YY-MM" picker="month" v-else />
          </div>
          <div class="header-tool__right">
            <a-button>导出Excel</a-button>
            <a-button>导出</a-button>
            <a-button type="primary">打印</a-button>
          </div>
        </div>
        <div class="contract-money-chart__content">
          <div class="content-chart" id="saleContractMoneyPie"></div>
          <div class="content-table">
            <a-table :data-source="contractMoneyTableData" :pagination="false" size="middle" :columns="contractMoneyTableColumn">
              <template #summary>
                <a-table-summary-row>
                  <a-table-summary-cell align="center">{{tabActive === 'area' ? `${!areaId || areaId === 'all' ? '区域' : '省'}名称` : '部门名称'}}</a-table-summary-cell>
                  <a-table-summary-cell align="center">{{totals.moneyTotal}}</a-table-summary-cell>
                  <a-table-summary-cell align="center">{{totals.percentageTotal}}</a-table-summary-cell>
                </a-table-summary-row>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { usePrint } from '../common';
import { useDataBoardList } from './common';
import { findReportContractSellAnalyzeTotalVo, findReportContractDist, findReportContractDept, findReportAreaDistByAreaOrgId } from '@/api/cmc';
import { ISaleContractMoneyPieOption, contractMoneyTableDataType, initChartDataLabelType } from './types';
import { numberToLocal } from '@/utils';
import { useInitContractMoneyPieChart, cmTableColumn } from './common';

const { printFlag, handlePrint } = usePrint();
const dataBoardList = useDataBoardList();
const tabActive = ref<'area' | 'department'>('area');
const contractMoneyRadio = ref<'year' | 'month'>('year');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const yearPickerValue = ref<string>(year.toString());
const monthPickerValue = ref<string>(`${year}-${month < 10 ? `0${month}` : month}`);
const areaId = ref<string | null>();
const contractDistList = ref<API.findReportContractDist>();
const contractMoneyTableData = ref<contractMoneyTableDataType>();
// 表格列
const contractMoneyTableColumn = computed(() => {
  if (tabActive.value === 'area') {
    return !areaId.value || areaId.value === 'all' ?
    [{ title: '区域名称', dataIndex: 'areaName', align: 'center' }, ...cmTableColumn] :
    [{ title: '省名称', dataIndex: 'proviceName', align: 'center' }, ...cmTableColumn];
  } else {
    return [{ title: '部门名称', dataIndex: 'departmentName', align: 'center' }, ...cmTableColumn];
  }
});

// footer-total
const totals = computed(() => {
  let moneyTotal: number = 0
  let percentageTotal: number = 0;

  contractMoneyTableData.value?.forEach(t => {
    moneyTotal += Number(t.money);
    percentageTotal += Number(t.percent)
  });

  return {
    moneyTotal: numberToLocal(moneyTotal),
    percentageTotal: Math.floor(percentageTotal * 100) + '%'
  }
});

/**
 * @description tabs的change事件
 */
const handleTabsChange = () => tabActive.value === 'area' ? handleAreaSelectChange() : getReportContractDept();

/**
 * @description 区域select下拉change事件
 */
const handleAreaSelectChange = () => !areaId.value || areaId.value === 'all' ? getReportContractDist() : getReportAreaDistByAreaOrgId();
/**
 * @description 获取头部3卡片数据
*/
findReportContractSellAnalyzeTotalVo().then(res => {
  const keys = Reflect.ownKeys(res);
  dataBoardList.value.forEach(item => {
    const find = keys.find(key => item.key === key);
    find && Reflect.set(item, 'value', `¥${res[<string>find]}元`);
  });
});

/**
  * @description 获取销售合同金额分布-区域
  */
const getReportContractDist = () => {
  findReportContractDist({ date: contractMoneyRadio.value === 'year' ? yearPickerValue.value : monthPickerValue.value }).then(res => {
    contractDistList.value = [{ areaName: '全部', areaOrgId: 'all', money: '', percent: 0, percentStr: '' }, ...res];
    initContractMoneyChartData(res, 'areaName');
  }).catch(() => contractMoneyTableData.value = []);
}

/**
 * @description 获取销售合同金额分布-省份
 */
const getReportAreaDistByAreaOrgId = () => {
  findReportAreaDistByAreaOrgId({ 
    date: contractMoneyRadio.value === 'year' ? yearPickerValue.value : monthPickerValue.value,
    areaOrgId: <string>areaId.value
  }).then(res => {
    initContractMoneyChartData(res, 'proviceName');
  }).catch(() => contractMoneyTableData.value = []);
};

/**
 * @description 部门
 */
const getReportContractDept = () => {
  findReportContractDept({date: contractMoneyRadio.value === 'year' ? yearPickerValue.value : monthPickerValue.value}).then(res => {
    initContractMoneyChartData(res, 'departmentName');
  }).catch(() => contractMoneyTableData.value = []);
}

/**
 * @description 合同金额分布pie点击事件
 */
const handleContractMoneyPieClick = () => {}

/**
 * @description 图表数据初始化
*/
const initContractMoneyChartData = (list: contractMoneyTableDataType, label: initChartDataLabelType) => {
  const saleContractMoneyPieOption: ISaleContractMoneyPieOption = {
    list: [],
    legend: [],
    handleContractMoneyPieClick
  };
  contractMoneyTableData.value = list;
  let _moneyTotal: number = 0;
  let _percentageTotal: number = 0;
  list.forEach(t => {
    Reflect.set(t, 'moneyToLocal', numberToLocal(t.money));
    const name = t[label] || Math.random() * 100 + 'io';
    saleContractMoneyPieOption.list.push({
      name,
      value: t.money
    });
    saleContractMoneyPieOption.legend.push(name);
  });
  useInitContractMoneyPieChart(saleContractMoneyPieOption);
}



onMounted(() => {
  getReportContractDist();
});


</script>
<style lang="less" scoped>
.contract-sale-analysis {
  height: 100%;
  overflow-y: auto;
  .data-board-card {
    .data-board-card-flex();
    .board-card-item {
      background: #3461f6;
      height: 1.16rem;
      width: calc(33% - 15px);
      .board-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-value {
          position: relative;
          font-size: .32rem;
          font-family: FZZDHJW--GB1-0,FZZDHJW--GB1;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
  .tab-view {
    position: relative;
    margin-top: .15rem;
    .tab-select-view {
      position: absolute;
      top: 0px;
      // transform: translateY(-50%);
      left: 160px;
    }
  }

  .contract-money-chart {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.25rem 0px;
      .title-text {
        font-size: .18rem;
        font-weight: bold;
        margin-right: 0.2rem;
      }
    }
    &__content {
      display: flex;
      .content-chart {
        height: 575px;
        width: 5.02rem;
        background: white;
        border-radius: .04rem;
      }
      .content-table {
        width: calc(100% - 5.3rem);
        margin-left: 0.28rem;
        border-radius: 0.04rem;
        overflow: hidden;
      }
    }
  }
}
</style>