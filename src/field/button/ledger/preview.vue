<template>
  <el-dialog
    title="台账预览"
    v-model="centerDialogVisible"
    width="800px"
    :append-to-body="true"
    center
    :before-close="handleClose"
  >
    <div class="ledger-preview">
      <div class="ledger-container">
        <div class="header">
          <div class="title">{{ title }}</div>
          <div class="time">{{ formatDay() }}</div>
        </div>
        <template v-if="type === 'interview'">
          <InterviewPreview ref="interview" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'onRoadInspection'">
          <OnRoadInspectionPreview ref="onRoadInspection" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'homeVisit'">
          <HomeVisitPreview ref="homeVisit" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'securityConference'">
          <SecurityConferencePreview ref="securityConference" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'securityPropaganda'">
          <SecurityPropagandaPreview ref="securityPropaganda" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'talk'">
          <TalkPreview ref="talk" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'monitor'">
          <MonitorPreview ref="monitor" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <template v-if="type === 'safetyInstructions'">
          <SafetyInstructionsPreview ref="safetyInstructions" :default-data="defaultData" :file-obj="fileObj" />
        </template>
        <div v-loading="loading" class="suspension" @click="exportLedger">
          <img src="./images/down.png" alt="">
          <span>下载</span>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </span>
    </template>
    
  </el-dialog>
</template>

<script>
import dayjs from 'dayjs'
import InterviewPreview from './components/interviewPreview.vue'
import HomeVisitPreview from './components/homeVisitPreview.vue'
import TalkPreview from './components/talkPreview.vue'
import MonitorPreview from './components/monitorPreview.vue'
import SafetyInstructionsPreview from './components/safetyInstructionsPreview'
import OnRoadInspectionPreview from './components/onRoadInspectionPreview.vue'
import SecurityConferencePreview from './components/securityConferencePreview.vue'
import SecurityPropagandaPreview from './components/securityPropagandaPreview.vue'
// import { getEntUserDetail } from '@/api/safetyLedger/index.js'
// import { getDetail as interviewDetail, exportLoad as interviewExportLoad } from '@/api/safetyLedger/interview.js'
// import { getDetail as homeVisitDetail, exportLoad as homeVisitExportLoad } from '@/api/safetyLedger/home-visit.js'
// import { getDetail as securityConferenceDetail, exportLoad as securityConferenceExportLoad } from '@/api/safetyLedger/security-conference.js'
// import { getDetail as securityPropagandaDetail, exportLoad as securityPropagandaExportLoad } from '@/api/safetyLedger/security-propaganda.js'
// import { getDetail as talkDetail, exportLoad as talkExportLoad } from '@/api/safetyLedger/talk.js'
// import { getDetail as safetyInstructionsDetail, exportLoad as safetyInstructionsExportLoad } from '@/api/safetyLedger/safety-instructions.js'
// import { getDetail as onRoadInspectionDetail, exportLoad as onRoadInspectionExportLoad } from '@/api/safetyLedger/road-inspection.js'
// import { getDetail as monitorDetail, exportLoad as monitorExportLoad } from '@/api/safetyLedger/monitor.js'
export default {
  components: {
    InterviewPreview,
    OnRoadInspectionPreview,
    HomeVisitPreview,
    TalkPreview,
    MonitorPreview,
    SecurityConferencePreview,
    SecurityPropagandaPreview,
    SafetyInstructionsPreview
  },
  props: {
    type: {
      type: String,
      default: 'interview'
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      xh: '',
      defaultData: {},
      fileList: [],
      title: '',
      loading: false,
      fileObj: {
        record: [],
        scene: []
      },
      downloadXh: ''
    }
  },
  methods: {
    open(data) {
      this.xh = data.aqtzbh
      this.downloadXh = data.xh
      this.init(this.xh)
      this.centerDialogVisible = true
    },
    handleClose() {
      this.xh = ''
      this.defaultData = {}
      this.fileList = []
      this.title = ''
      this.centerDialogVisible = false
    },
    async init(xh) {
      // let getDetail = interviewDetail
      // this.title = '安全宣传教育培训活动记录'
      // switch (this.type) {
      //   case 'homeVisit':
      //     getDetail = homeVisitDetail
      //     this.title = '驾驶员家访台账'
      //     break
      //   case 'securityConference':
      //     getDetail = securityConferenceDetail
      //     this.title = '会议记录'
      //     break
      //   case 'securityPropaganda':
      //     getDetail = securityPropagandaDetail
      //     this.title = '安全宣传教育培训活动记录'
      //     break
      //   case 'talk':
      //     getDetail = talkDetail
      //     this.title = '驾驶员谈心记录卡'
      //     break
      //   case 'safetyInstructions':
      //     getDetail = safetyInstructionsDetail
      //     this.title = '安全嘱托记录表'
      //     break
      //   case 'onRoadInspection':
      //     getDetail = onRoadInspectionDetail
      //     this.title = '上路检查台账'
      //     break
      //   case 'monitor':
      //     getDetail = monitorDetail
      //     this.title = '驾驶员监控台账'
      //     break
      //   default:
      //     break
      // }
      // const { data } = await getDetail(xh)
      // this.defaultData = data
      // await this.getEntUserDetail(data.bh)
      // this.fileObj = {
      //   record: data.aqtzzys?.record || [],
      //   scene: data.aqtzzys?.scene || []
      // }
    },
    async getEntUserDetail(aqtzbh) {
      const { data } = await getEntUserDetail({ aqtzbh })
      if (this.type !== 'securityConference' && this.type !== 'securityPropaganda') {
        this.defaultData.xm = data[0].xm
      }
    },
    async exportLedger() {
      if (this.loading) {
        return
      }
      let exportLoad = interviewExportLoad
      switch (this.type) {
        case 'homeVisit':
          exportLoad = homeVisitExportLoad
          break
        case 'securityConference':
          exportLoad = securityConferenceExportLoad
          break
        case 'securityPropaganda':
          exportLoad = securityPropagandaExportLoad
          break
        case 'talk':
          exportLoad = talkExportLoad
          break
        case 'safetyInstructions':
          exportLoad = safetyInstructionsExportLoad
          break
        case 'onRoadInspection':
          exportLoad = onRoadInspectionExportLoad
          break
        case 'monitor':
          exportLoad = monitorExportLoad
          break
        default:
          break
      }
      this.loading = true
      exportLoad(this.downloadXh).then(res => {
        this.loading = false
      })
    },
    formatDay() {
      if (this.type === 'securityConference' || this.type === 'securityPropaganda') {
        return dayjs(this.defaultData.ywsj).format('YYYY年MM月DD日')
      }
      return dayjs().format('YYYY年MM月DD日')
    }
  }
}
</script>
<style lang="scss" scoped>
.ledger-preview{
  position: relative;
  .ledger-container{
    height: 50vh;
    width: calc(100% - 20px);
    overflow: auto;
    box-sizing: border-box;
    box-shadow: 0 0 5px 1px #e0e0e0;
    margin: 0 10px;
    padding: 10px;
    font-size: 16px;
    .suspension{
      position: absolute;
      height: 40px;
      width: 140px;
      bottom: 10px;
      left: calc(50% - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 900;
      color: #fff;
      border-radius: 100px;
      background-color: #BDBBBE;
      box-shadow: 0 0 5px 1px #d3d3d3;
      img{
        height: 30px;
        width: auto;
        margin-right: 10px;
      }
      &:hover{
        cursor: pointer;
      }
      ::v-deep .el-loading-mask{
        border-radius: 100px;
      }
    }
    .header{
      height: 60px;
      color: #000;
      font-weight: normal;
      margin-bottom: 10px;
      .title{
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        letter-spacing: 5px;
      }
      .time{
        text-align: right;
        line-height: 20px;
      }
    }
  }
}
</style>
