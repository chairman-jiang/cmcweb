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
        <sl-tabs v-model="tabActive" :spacing="5" :out-line="true" :pane-active-mode="'font'">
          <sl-tab-pane name="area">区域</sl-tab-pane>
          <sl-tab-pane name="province">省份</sl-tab-pane>
        </sl-tabs>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePrint } from '../common';
import { useDataBoardList } from './common';
import { findReportContractSellAnalyzeTotalVo } from '@/api/cmc';
const { printFlag, handlePrint } = usePrint();
const dataBoardList = useDataBoardList();

const tabActive = ref<string>('area');

findReportContractSellAnalyzeTotalVo().then(res => {
  const keys = Reflect.ownKeys(res);
  dataBoardList.value.forEach(item => {
    const find = keys.find(key => item.key === key);
    find && Reflect.set(item, 'value', `¥${res[<string>find]}元`);
  });
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
    margin-top: .15rem;
    .tab-items {
      display: flex;
      .tab-item {
        margin-right: .3rem;
        font-size: 16px;
      }
    }
  }
}
</style>