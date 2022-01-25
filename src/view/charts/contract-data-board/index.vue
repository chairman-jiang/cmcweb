<template>
  <div class="contract-data-board">
    <page-sub-title title="合同数据看板">
      <template #right>
        <div>
          <a-button>导出PDF</a-button>
          <a-button type="primary">打印</a-button>
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
              <img height="10px" src="@/assets/header-arrow@2x.png" />
            </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { findContractBoard } from '@/api/cmc';
import { useDataBoardList } from './common';
import { numberReg } from '@/utils/regexp';
import * as echarts from 'echarts/core';
import { BarChart, PieChart, LineChart } from 'echarts/charts';

const dataBoardList = useDataBoardList();

findContractBoard({ isContract: 1 }).then(res => {
  const convertValue = (val: string) => numberReg.test(val) ? Number(val).toLocaleString() : '';
  const now = new Date();
  dataBoardList.value.forEach(t => {
    t.money = convertValue(res[t.moneyKey]);
    t.subMoney = convertValue(res[t.subMoneyKey]);
    t.historyMoney = convertValue(res[t.historyMoneyKey]);
    t.subTitle = now.getMonth() + 1 + t.subTitle;
  });
});


</script>
<style lang="less" scoped>
.contract-data-board {
  height: 100%;
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
        
        span:first-child {
          color:rgba(255, 255, 255, .7);
        }
        span:last-child {
          color: white;
        }

        img {
          margin-left: .1rem;
        }

      }
  }
}
</style>