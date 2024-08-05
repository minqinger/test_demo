<template>
  <div class="l-content">
    <div class="cell" style="min-height: 40px">
      <div class="label">会议时间</div>
      <div class="value">{{
        defaultData.kssj && defaultData.jssj ?
          formatDate(defaultData.kssj,'YYYY年MM月DD日 HH时mm分')+ ' 至 ' + formatDate(defaultData.jssj,'YYYY年MM月DD日 HH时mm分')
          : ''
      }}</div>
    </div>
    <div class="cell" style="min-height: 40px">
      <div class="cell-1" style="border-right: 1px solid #000;">
        <div class="label">会议地点</div>
        <div class="value">{{ defaultData.hydd || '暂无' }}</div>
      </div>
      <div class="cell-1 person">
        <div class="label">主持人</div>
        <div class="value">{{ defaultData.zjr || '暂无' }}</div>
      </div>
    </div>
    <div class="cell">
      <div class="cell-1">
        <div class="label">会议名称或主要议题</div>
        <div class="value">{{ defaultData.hyzt }}</div>
      </div>
      <div class="cell-1 person">
        <div class="label">记录人</div>
        <div class="value">{{ defaultData.jlr || '暂无' }}</div>
      </div>
    </div>
    <div class="cell">
      <div class="label">出席人</div>
      <div class="value">本次会议应到{{ defaultData.cyrs }}人，实到{{ defaultData.sdrs }}人，缺席{{ defaultData.qxrs }}人。</div>
    </div>
    <div class="cell">
      <div class="cell-title">会议主要内容记录</div>
    </div>
    <div class="cell">
      <div v-if="!defaultData.bz" class="value">暂无记录</div>
      <el-input
        v-else
        v-model="defaultData.bz"
        class="value"
        type="textarea"
        :disabled="true"
        :autosize="true"
        resize="none"
      />
    </div>
    <div class="cell">
      <div class="cell-title">记录表图像照片</div>
    </div>
    <div class="pic">
      <template v-if="fileObj.record && fileObj.record.length > 0">
        <el-image
          v-for="item in fileObj.record"
          :key="item.xh"
          :src="item.zylj"
          lazy
          :preview-src-list="[item.zylj]"
        />
      </template>
      <div v-else class="value">暂无图片</div>
    </div>
    <div class="cell">
      <div class="cell-title">现场图像照片</div>
    </div>
    <div class="pic">
      <template v-if="fileObj.scene && fileObj.scene.length > 0">
        <el-image
          v-for="item in fileObj.scene"
          :key="item.xh"
          :src="item.zylj"
          lazy
          :preview-src-list="[item.zylj]"
        />
      </template>
      <div v-else class="value">暂无图片</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    xh: {
      type: Number,
      default: null
    },
    defaultData: {
      type: Object,
      default: () => {}
    },
    fileObj: {
      type: Object,
      default: () => {}
    }
  },
  methods:{
    formatDate(val, format = 'YYYY-MM-DD'){
      return dayjs(val).format(format)
    }
  }
}
</script>
<style lang="scss" scoped>
.l-content{
  border: 1px solid #000;
  color: #000;
  font-size: 14px;
  .cell{
    min-height: 60px;
    border-bottom: 1px solid #000;
    display: flex;
    .label{
      line-height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px !important;
      border-right: 1px solid #000;
      background-color: rgb(228, 228, 228);
      font-weight: 600;
      text-align: center;
      padding: 10px;
    }
    .value{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 24px;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .cell-1{
      display: flex;
      flex: 1;
      &:nth-child(1){
        border-right: 1px solid #000;
      }
      .box{
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .box-value{
          flex: 1;
          width: 100%;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .person{
      flex: none;
      width: 170px !important;
      box-sizing: border-box;
      .label{
        width: 70px !important;
      }
    }
    .cell-title{
      width: 100%;
      background-color: rgb(228, 228, 228);
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ::v-deep .el-textarea.is-disabled .el-textarea__inner{
      overflow: hidden;
      border: none;
      color: #000;
      font-size: 14px;
      cursor: default;
      background-color: #fff;
      padding: 5px 0px;
    }
  }
  .pic{
    padding: 10px;
    box-sizing: border-box;
    &:not(:last-child){
      border-bottom: 1px solid #000;
    }
    .value{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-image{
      width: 100%;
    }
  }
}
</style>
