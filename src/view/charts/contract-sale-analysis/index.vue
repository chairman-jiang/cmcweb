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
        <sl-tabs v-model="tabActive" :out-line="true" :pane-active-mode="'font'">
          <sl-tab-pane name="area">区域</sl-tab-pane>
          <sl-tab-pane name="province">省份</sl-tab-pane>
        </sl-tabs>
        <div class="tab-select-view">
          <a-select v-model:value="contractDistValue" allowClear placeholder="请输入" style="width: 140px;">
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
            <!-- <a-table :dataSource="saleContractMoneyList"></a-table> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePrint } from '../common';
import { useDataBoardList } from './common';
import { findReportContractSellAnalyzeTotalVo, findReportContractDist } from '@/api/cmc';
import { ISaleContractMoneyPieOption } from './types';
import { numberToLocal } from '@/utils';
import { useInitContractMoneyPieChart } from './common';

const { printFlag, handlePrint } = usePrint();
const dataBoardList = useDataBoardList();
const contractMoneyRadio = ref<'year' | 'month'>('year');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const yearPickerValue = ref<string>(year.toString());
const monthPickerValue = ref<string>(`${year}-${month < 10 ? `0${month}` : month}`);
const contractDistValue = ref<string>();
const contractDistList = ref<API.findReportContractDist>();
const saleContractMoneyList = computed<API.findReportContractDist>(() => contractDistList.value?.slice(1) || []);
const tabActive = ref<string>('area');

/**
 * @description 合同金额分布pie点击事件
 */
const handleContractMoneyPieClick = () => {}

findReportContractSellAnalyzeTotalVo().then(res => {
  const keys = Reflect.ownKeys(res);
  dataBoardList.value.forEach(item => {
    const find = keys.find(key => item.key === key);
    find && Reflect.set(item, 'value', `¥${res[<string>find]}元`);
  });
});

findReportContractDist({ date: contractMoneyRadio.value === 'year' ? yearPickerValue.value : monthPickerValue.value }).then(res => {
  contractDistList.value = [{ areaName: '全部', areaOrgId: 'all', money: 0 }, ...res];
  const saleContractMoneyPieOption: ISaleContractMoneyPieOption = {
    list: [],
    legend: [],
    handleContractMoneyPieClick
  };
  res.forEach(t => {
    Reflect.set(t, 'moneyToLocal', numberToLocal(t.money));
    const name = t.areaName || Math.random() * 100 + 'io';
    saleContractMoneyPieOption.list.push({
      name,
      value: t.money
    });
    saleContractMoneyPieOption.legend.push(name);
  });
  useInitContractMoneyPieChart(saleContractMoneyPieOption);
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