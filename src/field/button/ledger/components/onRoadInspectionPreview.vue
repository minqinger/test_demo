<template>
  <div class="l-content">
    <div class="cell">
      <div class="cell-1">
        <div class="label">驾驶员</div>
        <div class="value">{{ defaultData.xm }}</div>
      </div>
      <div class="cell-1">
        <div class="label">检查时间</div>
        <div class="value">{{ formatDate(defaultData.ywsj, 'YYYY 年 MM 月 DD 日') }}</div>
      </div>
    </div>
    <div class="cell">
      <div class="label">检查人员</div>
      <div class="value">{{ defaultData.jcrys ? defaultData.jcrys.join('、') : '' }}</div>
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
  computed: {
    jcry() {
      return this.defaultData.jcrys && this.defaultData.jcrys.map(v => v.xm).join('、')
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
    min-height: 40px;
    border-bottom: 1px solid #000;
    display: flex;
    .label{
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      border-right: 1px solid #000;
      background-color: rgb(228, 228, 228);
      font-weight: 600;
    }
    .value{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 30px;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .cell-1{
      display: flex;
      width: 50%;
      &:nth-child(1){
        border-right: 1px solid #000;
      }
    }
    .cell-title{
      line-height: 40px;
      text-align: center;
      width: 100%;
      background-color: rgb(228, 228, 228);
      font-weight: 600;
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
