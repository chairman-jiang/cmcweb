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
          <div class="header-tool__right"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePrint } from '../common';
import { useDataBoardList } from './common';
import { findReportContractSellAnalyzeTotalVo, findReportContractDist } from '@/api/cmc';
const { printFlag, handlePrint } = usePrint();
const dataBoardList = useDataBoardList();
const contractMoneyRadio = ref<'year' | 'month'>('year');
const date = new Date();
const yearPickerValue = ref<string>(date.getFullYear().toString());
const monthPickerValue = ref<string>(`${date.getFullYear()}-${date.getMonth() + 1}`);
const contractDistValue = ref<string>();
const contractDistList = ref<API.findReportContractDist>();
const tabActive = ref<string>('area');


findReportContractSellAnalyzeTotalVo().then(res => {
  const keys = Reflect.ownKeys(res);
  dataBoardList.value.forEach(item => {
    const find = keys.find(key => item.key === key);
    find && Reflect.set(item, 'value', `¥${res[<string>find]}元`);
  });
});



findReportContractDist({ date: contractMoneyRadio.value === 'year' ? yearPickerValue.value : monthPickerValue.value }).then(res => {
  console.log(res, 'res')
  contractDistList.value = [{ areaName: '全部', areaOrgId: 'all' }, ...res];
});

</script>
<style lang="less" scoped>
.contract-sale-analysis {
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
    margin: 0.25rem 0px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-text {
        font-size: .18rem;
        font-weight: bold;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>