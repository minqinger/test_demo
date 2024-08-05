<template>
  <el-dialog
    title="安全台账详情"
    v-model="dialogVisible"
    width="900px"
    center
    :before-close="handleClose"
  >
    <div class="ledger-detail">
      <div class="left">
        <div class="header">
          <img src="./images/iconPark-excel@3x.png" alt="">
          <span>汇总记录</span>
        </div>
        <div class="l-d-content">
          <div
            v-for="(item, index) in leftData"
            :key="index"
            class="card"
            :class="{'is-active' : searchType === item.id}"
            @click="changeType(item.id)"
          >
            <div class="top">
              <img :src="item.icon" alt="">
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="bottom">
              <div class="num">{{ item.zs }}</div>
              <div class="unit">次</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <div>
            <img src="./images/md.png" alt="">
            <span>时间记录</span>
          </div>
          <el-select v-model="searchDay" size="mini" placeholder="请选择">
            <el-option
              v-for="item in dateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="l-r-content">
          <template v-if="timeLineData && timeLineData.length > 0">
            <div
              v-for="(item, index) in timeLineData"
              :key="index"
              :class="`time-line-item time-line-item-${item.lx}`"
            >
              <div class="line" />
              <div class="time">{{ item.cjsj }}</div>
              <div class="circle">
                <div class="dot" />
              </div>
              <div class="text" @click="openPreview(item)">
                <span class="tag">{{ ledgerCode[item.lx] }}</span>
                <span class="value">{{ item.cjrxm }}新增台账《{{ ledgerNameCode[item.lx] }}》</span>
              </div>
            </div>
          </template>
          <div v-else class="no-data">暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 预览 -->
    <Preview ref="preview" :type="ledgerType" />
      <template #footer>
        <span class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </span>
    </template>
    
  </el-dialog>
</template>

<script>
import Preview from './preview.vue'
import dayjs from 'dayjs'
// import { getLedgerRecord, getLedgerAbout } from '@/api/safetyLedger/index.js'
import _ from 'lodash'
export default {
  components: {
    Preview
  },
  data() {
    return {
      dialogVisible: false,
      searchDay: 30,
      searchType: '0',
      dateOptions: [
        {
          label: '近一个月',
          value: 30
        },
        {
          label: '近三个月',
          value: 90
        },
        {
          label: '近半年',
          value: 180
        },
        {
          label: '全部',
          value: 0
        }
      ],
      leftData: [
        {
          icon: require('./images/all.png'),
          title: '全部',
          id: '0',
          zs: 0
        },
        {
          icon: require('./images/talk.png'),
          title: '约谈',
          id: '1',
          zs: 0
        },
        {
          icon: require('./images/home.png'),
          title: '家访',
          id: '2',
          zs: 0
        },
        {
          icon: require('./images/book.png'),
          title: '安全会议',
          id: '3',
          zs: 0
        },

        {
          icon: require('./images/smile.png'),
          title: '谈心谈话',
          id: '4',
          zs: 0
        },
        {
          icon: require('./images/shield.png'),
          title: '安全嘱托',
          id: '5',
          zs: 0
        },
        {
          icon: require('./images/road.png'),
          title: '上路检查',
          id: '6',
          zs: 0
        },
        {
          icon: require('./images/camera.png'),
          title: '监控',
          id: '7',
          zs: 0
        },
        {
          icon: require('./images/book2.png'),
          title: '安全宣教',
          id: '8',
          zs: 0
        }
      ],
      timeLineData: [],
      yhdh: '',
      ledgerCode: {
        '1': '约谈',
        '2': '家访',
        '3': '安全会议',
        '4': '谈心谈话',
        '5': '安全嘱托',
        '6': '上路检查',
        '7': '监控',
        '8': '安全宣教'
      },
      ledgerNameCode: {
        '1': '安全宣传教育培训活动记录',
        '2': '驾驶员家访台账',
        '3': '安全会议台账',
        '4': '驾驶员谈心记录卡',
        '5': '安全嘱托记录表',
        '6': '上路检查台账',
        '7': '驾驶员监控台账',
        '8': '安全宣教活动台账'
      },
      ledgerTypeCode: {
        '1': 'interview',
        '2': 'homeVisit',
        '3': 'securityConference',
        '4': 'talk',
        '5': 'safetyInstructions',
        '6': 'onRoadInspection',
        '7': 'monitor',
        '8': 'securityPropaganda'
      },
      ledgerType: ''
    }
  },
  watch: {
    searchDay(val) {
      this.handleSearch()
    },
    searchType(val) {
      this.handleSearch()
    }
  },
  methods: {
    handleClose() {
      this.leftData = [
        {
          icon: require('./images/all.png'),
          title: '全部',
          id: '0',
          zs: 0
        },
        {
          icon: require('./images/talk.png'),
          title: '约谈',
          id: '1',
          zs: 0
        },
        {
          icon: require('./images/home.png'),
          title: '家访',
          id: '2',
          zs: 0
        },
        {
          icon: require('./images/book.png'),
          title: '安全会议',
          id: '3',
          zs: 0
        },

        {
          icon: require('./images/smile.png'),
          title: '谈心谈话',
          id: '4',
          zs: 0
        },
        {
          icon: require('./images/shield.png'),
          title: '安全嘱托',
          id: '5',
          zs: 0
        },
        {
          icon: require('./images/road.png'),
          title: '上路检查',
          id: '6',
          zs: 0
        },
        {
          icon: require('./images/camera.png'),
          title: '监控',
          id: '7',
          zs: 0
        },
        {
          icon: require('./images/book2.png'),
          title: '安全宣教',
          id: '8',
          zs: 0
        }
      ]
      this.searchType = '0'
      this.timeLineData = []
      this.dialogVisible = false
    },
    open(data) {
      this.yhdh = data.yhdh
      // this.getLedgerAbout()
      this.handleSearch()
      this.dialogVisible = true
    },
    handleSearch: _.throttle(async function() {
      const cjjssj = dayjs().format('YYYY-MM-DD 23:59:59')
      const cjkssj = dayjs().subtract(this.searchDay - 1, 'day').format('YYYY-MM-DD 00:00:00')
      const obj = {
        pageSize: 1000,
        pageNum: 1,
        yhdh: this.yhdh,
        cjjssj: this.searchDay ? cjjssj : '',
        cjkssj: this.searchDay ? cjkssj : '',
        lx: this.searchType === '0' ? '' : this.searchType
      }
      // const deptInfo = await getLedgerRecord(obj)
      // this.timeLineData = deptInfo.data?.rows || []
      this.timeLineData = [
  {
    "xh": 4452,
    "bh": "em-sl-20240805-395656-39978ff6-8390-45bd-88da-b2a5ddd9e939",
    "cjrxm": "王丽锋",
    "cjsj": "2024-08-05 16:11:28",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240805-395656-0203bc89-8da0-4406-8723-a8206f373c1b",
    "aqtzxh": 3128,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4439,
    "bh": "em-sl-20240805-395656-45dcca79-72a0-4311-a482-d0b2ab5c3da8",
    "cjrxm": "王丽锋",
    "cjsj": "2024-08-05 15:54:34",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240805-395656-23f0f679-520e-4396-a549-41bc1767cdee",
    "aqtzxh": 3115,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4428,
    "bh": "em-sl-20240805-395656-a8f08407-6fbc-4b27-8b37-3bb008584fa5",
    "cjrxm": "王丽锋",
    "cjsj": "2024-08-05 15:34:12",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240805-395656-c3ffa304-b193-42f1-bb3a-60d875eb1c91",
    "aqtzxh": 3104,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4411,
    "bh": "em-sl-20240805-395656-5e1266a2-8cf5-4b8d-93ef-5d5b9c09fa71",
    "cjrxm": "王丽锋",
    "cjsj": "2024-08-05 14:55:11",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240805-395656-29ad4f04-b2fc-4a6a-9d51-116fbce9a30b",
    "aqtzxh": 3087,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4357,
    "bh": "em-sl-20240702-395656-e217c840-5670-4e36-8767-3bd31a7d3322",
    "cjrxm": "王丽锋",
    "cjsj": "2024-07-02 15:34:32",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240702-395656-3902e2bf-d3d4-41e1-9bc0-a3ae97137df0",
    "aqtzxh": 3077,
    "lx": "7",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4350,
    "bh": "em-sl-20240702-395656-b6d98633-2a01-421b-ba06-05eb4a31468c",
    "cjrxm": "王丽锋",
    "cjsj": "2024-07-02 15:23:12",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240702-395656-d9a70d95-0abd-48d3-8329-5820ddbf4cf7",
    "aqtzxh": 3070,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4305,
    "bh": "em-sl-20240626-395656-62fb9145-e63a-4071-8d4a-b54df9429c15",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-26 16:10:23",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240626-395656-30481fe1-5598-46cb-9ac9-50b3147e623e",
    "aqtzxh": 3060,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4302,
    "bh": "em-sl-20240626-395656-0c0723c6-5305-4e16-ba6e-7756f7a3e978",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-26 16:08:04",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240626-395656-44453fbc-79b3-47f2-bd35-5931d8ada813",
    "aqtzxh": 3057,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4287,
    "bh": "em-sl-20240626-395656-dd9d93b0-47a7-4162-adac-39f7114f7af7",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-26 15:45:33",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240626-395656-85df16ea-42b0-48d3-bea0-11a8390d5b92",
    "aqtzxh": 3042,
    "lx": "2",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4286,
    "bh": "em-sl-20240626-395656-21369c53-f6b3-44e2-9cea-c61206e2e4bd",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-26 10:34:07",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240626-395656-4c7bb385-58ed-42fa-85fb-decf5d5dd8c6",
    "aqtzxh": 3041,
    "lx": "1",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4271,
    "bh": "em-sl-20240621-395656-18624a09-2d3a-478b-bf6d-d7af54d7fb8c",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-21 09:44:01",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240621-395656-e32404f7-ffc6-40cf-8010-d4496a1f42df",
    "aqtzxh": 3026,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4256,
    "bh": "em-sl-20240621-395656-bf0bc052-2691-48a5-8c54-7dea91a85723",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-21 09:25:11",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240621-395656-c520985e-e301-4581-928d-487a17f6e9e2",
    "aqtzxh": 3011,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4252,
    "bh": "em-sl-20240621-395656-907f7112-34ed-4044-a147-52ab9b0a1e23",
    "cjrxm": "王丽锋",
    "cjsj": "2024-06-21 09:18:41",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240621-395656-a4477cf4-16da-4cd3-81c6-05e21b681399",
    "aqtzxh": 3007,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4041,
    "bh": "em-sl-20240521-395656-014e61c1-c422-4013-b0e2-b572b393ee25",
    "cjrxm": "王丽锋",
    "cjsj": "2024-05-21 15:59:31",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240521-395656-b4c5a0c6-6534-48d9-9f96-95a1fc6b622f",
    "aqtzxh": 2860,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4024,
    "bh": "em-sl-20240521-395656-6b5f5de2-c98b-444a-bcc4-8a87505baf64",
    "cjrxm": "王丽锋",
    "cjsj": "2024-05-21 15:33:30",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240521-395656-fb534f82-b8d2-4d8a-88ee-c208402c5e53",
    "aqtzxh": 2843,
    "lx": "5",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  },
  {
    "xh": 4021,
    "bh": "em-sl-20240521-395656-539fa2e2-1e9a-4fdf-a776-e41f4cd39391",
    "cjrxm": "王丽锋",
    "cjsj": "2024-05-21 15:27:24",
    "yhdh": "13675736521",
    "dwdm": "396416",
    "qydm": "395656",
    "aqtzbh": "ent-sl-20240521-395656-e5ec2be4-69a5-4eb4-9f8d-bbf7d6e91b0d",
    "aqtzxh": 2840,
    "lx": "2",
    "yhlx": "2",
    "zt": "0",
    "fmzylj": null
  }
]
    }, 500),
    changeType(id) {
      this.searchType = id
    },
    openPreview(item) {
      this.ledgerType = this.ledgerTypeCode[item.lx]
      this.$nextTick(() => {
        const obj = {
          xh: item.xh,
          aqtzbh: item.aqtzbh
        }
        if (item.lx === '3' || item.lx === '8') {
          obj.xh = item.aqtzxh
        }
        this.$refs.preview.open(obj)
      })
    },
    async getLedgerAbout() {
      const { data } = await getLedgerAbout({ yhdh: this.yhdh })
      this.leftData[0].zs = 0
      data.forEach(v => {
        this.leftData[0].zs += v.zs
        this.leftData[+v.lx].zs = v.zs
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ledger-detail{
  height: 50vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  .left{
    width: 370px;
    border-right: 1px solid #bbb;
    .header{
      height: 30px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 900;
      color: #000;
      img{
        height: 20px;
        width: auto;
        margin-right: 10px;
      }
    }
    .l-d-content{
      height: calc(100% - 30px);
      display: flex;
      flex-wrap: wrap;
      .card{
        width: 110px;
        height: calc(33.3% - 10px);
        margin: 5px;
        border-radius: 10px;
        border: 1px solid rgba(187, 187, 187, 0.31);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #000;
        .top{
          width: 100%;
          display:flex;
          align-items: flex-end;
          justify-content: center;
          font-size: 12px;
          img{
            height: 50px;
            width: auto;
            margin-right: 5px;
          }
          .title{
            padding-bottom: 5px;
          }
        }
        .bottom{
          display: flex;
          align-items: baseline;
          justify-content: center;
          font-weight: 900;
          .num{
            font-size: 20px;
          }
          .unit{
            font-size: 14px;
          }
        }
        &:hover{
          cursor: pointer;
          border-color: #1a7ceb;
          transform: scale(1.05);
        }
      }
      .is-active{
        box-shadow: 0 0 5px 1px rgb(212, 212, 212);
        background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
      }
    }
  }
  .right{
    flex: 1;
    box-sizing: border-box;
    padding-left: 20px;
    .header{
      height: 30px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 900;
      color: #000;
      justify-content: space-between;
      img{
        height: 20px;
        width: auto;
        margin-right: 10px;
      }
      >div{
        display: flex;
        align-items: center;
      }
    }
    .l-r-content{
      height: calc(100% - 30px);
      width: 100%;
      overflow: auto;
      color: #000;
      padding: 10px 0;
      .time-line-item{
        padding-bottom: 40px;
        display: flex;
        position: relative;
        font-size: 12px;
        .time{
          width: 120px;
          line-height: 15px;
        }
        .circle{
          width: 20px;
          display: flex;
          justify-content: center;
          position: relative;
          .dot{
            height: 15px;
            width: 15px;
            border-radius: 50%;
          }
        }
        .line{
          position: absolute;
          height: 100%;
          width: 2px;
          top: 0;
          background-color: rgb(220, 220, 220);
          left: 129px;
        }
        .text{
          flex: 1;
          padding-left: 10px ;
          box-sizing: border-box;
          &:hover{
            cursor: pointer;
            .value{
              text-decoration: underline;
              color: #1a7ceb;
            }
          }
          .tag{
            width: auto;
            padding: 0px 10px;
            border-radius: 3px;
            border: 1px solid;
            margin-right: 10px;
          }
        }
        &:last-child{
          padding-bottom: 10px;
          .line{
            visibility: hidden;
          }
        }
      }
      .time-line-item-7{
        .circle{
          .dot{
            background-color: #fd0808;
          }
        }
        .text{
          .tag{
            border-color:#fd0808;
            color:#fd0808;
          }
        }
      }
      .time-line-item-3{
        .circle{
          .dot{
            background-color: #252525;
          }
        }
        .text{
          .tag{
            border-color:#252525;
            color: #252525;
          }
        }
      }
      .time-line-item-1{
        .circle{
          .dot{
            background-color: #ebdb63;
          }
        }
        .text{
          .tag{
            border-color:#ebdb63;
            color: #ebdb63;
          }
        }
      }
      .time-line-item-2{
        .circle{
          .dot{
            background-color: #1a7ceb;
          }
        }
        .text{
          .tag{
            border-color:#1a7ceb;
            color: #1a7ceb;
          }
        }
      }
      .time-line-item-4{
        .circle{
          .dot{
            background-color: #faa73f;
          }
        }
        .text{
          .tag{
            border-color:#faa73f;
            color: #faa73f;
          }
        }
      }
      .time-line-item-5{
        .circle{
          .dot{
            background-color: #3fcd5d;
          }
        }
        .text{
          .tag{
            border-color:#3fcd5d;
            color: #3fcd5d;
          }
        }
      }
      .time-line-item-6{
        .circle{
          .dot{
            background-color: #db2bc3;
          }
        }
        .text{
          .tag{
            border-color:#db2bc3;
            color: #db2bc3;
          }
        }
      }
      .time-line-item-8{
        .circle{
          .dot{
            background-color: #9500ff;
          }
        }
        .text{
          .tag{
            border-color:#9500ff;
            color: #9500ff;
          }
        }
      }
    }
  }
}
</style>
