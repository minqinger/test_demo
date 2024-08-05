<template>
  <div class="person-dialog">
    <div class="card">
      <div class="header">
        <span>{{ title }}</span>
        <close-circle-outlined class="hover" @click="close"/>
      </div>
      <div class="container">
        <div class="left">
          <div class="top center">
            <a-input v-model:value="inputValue" allow-clear placeholder="输入姓名、岗位或部门筛选已选择的人员" />
            <a-button shape="circle" @click="clearAll" />
          </div>
          <div class="list">
            <div class="flex" style="flex-wrap: wrap;">
              <a-tag v-for="(item) in searchSelectList" :key="item.yhdh" closable @close="deletePerson(item)">{{ item.xm }}({{ item.dwjc }})</a-tag>
            </div>
          </div>
          <div class="bottom flex aic">
            <a-button type="primary" @click="submit">确 定（{{ selectPersonList.length }}）</a-button>
            <a-button @click="close">取 消</a-button>
          </div>
        </div>
        <div class="right">
          <div class="top center">
            <span>{{ depTreeCode[qydm] }}</span>
          </div>
          <div class="list">
            <a-collapse v-model:activeKey="activeName" ghost>
              <a-collapse-panel header="按部门选择" key="1">
                <div class="collapse-div">
                  <TreeWithSearch
                    ref="tree"
                    :show-checkbox="true"
                    :required-parent="false"
                    :data="depTreeList"
                  />
                </div>
              </a-collapse-panel>
              <a-collapse-panel header="按岗位选择" key="2">
                <div class="collapse-div">
                  <ul v-if="postList && postList.length > 0">
                    <li v-for="(item, index) in postList" :key="index">
                      <a-checkbox v-model:checked="item.check" @change="(value) => change(item, value)" />
                      <span>{{ item.mc }}</span>
                    </li>
                  </ul>
                  <div v-else class="no-data">暂无岗位数据</div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel header="按人员选择" key="3">
                <div class="collapse-div">
                  <a-input v-model="searchValue" allow-clear style="margin-bottom: 5px;" placeholder="请输入姓名检索" />
                  <ul v-if="personList && personList.length > 0">
                    <li v-for="(item, index) in personList" :key="index">
                      <a-checkbox v-model:checked="item.check" @change="(value) => changePerson(item, value)" />
                      <span>{{ item.xm }}({{ item.dwjc }})</span>
                    </li>
                  </ul>
                  <div v-else class="no-data">暂无人员数据</div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
          <div class="bottom flex aic">
            <a-button type="primary" @click="addPerson">添 加</a-button>
            <a-button @click="reset">重 置</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeWithSearch from './index.vue'
import _ from 'lodash'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    TreeWithSearch,
    CloseCircleOutlined
  },
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '选择台账对象'
    },
    type: {
      type: String,
      default: 'all'
    },
    currentQydm: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: '',
      depTreeCode: {},
      activeName: '',
      depTreeList: [],
      postList: [],
      searchValue: '',
      personList: [],
      selectPostList: [],
      selectDeptList: [],
      selectPersonList: [],
      searchSelectList: [],
      qydm: ''
    }
  },
  watch: {
    searchValue(val) {
      this.searchPerson(val)
    },
    selectPersonList: {
      handler(val) {
        this.personList.forEach(v => {
          const index = _.findIndex(val, o => o.yhdh === v.yhdh)
          if (index !== -1) {
            v.check = true
          } else {
            v.check = false
          }
        })
        this.setSearchSelectList()
      },
      deep: true,
      immediate: true
    },
    inputValue() {
      this.setSearchSelectList()
    },
    selected: {
      handler(val) {
        this.selectPersonList = [...val]
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.depTreeCode = {
      "404670": "换库-测试企业1",
      "404671": "运安部",
      "404672": "出租公司",
      "404673": "旅游公司简称",
      "404674": "运安部下属1",
      "404675": "运安部下属2",
      "404676": "集散中心",
      "404677": "一车队",
      "404678": "二车队",
      "404679": "出租公司一车队",
      "404680": "出租公司二车队",
      "404681": "出租公司三车队",
      "404683": "研发企业",
      "404685": "交投汽修"
    }
    this.init()
  },
  methods: {
    async init() {
      this.qydm = '404670'
      this.getDeptTreeList(this.qydm)
      this.getPostList(this.qydm)
    },
    async getDeptTreeList() {
      this.depTreeList = []
      // const { data } = await getEnterpriseDeptTree({ qydm: val })
      this.depTreeList = [
        {
          "value": "404670",
          "parentId": "1",
          "label": "换库-测试企业1",
          "weight": 6,
          "dwjb": "1",
          "dwmc": "换库-测试企业1全称",
          "children": [
            {
              "value": "404671",
              "parentId": "404670",
              "label": "运安部",
              "weight": 7,
              "dwjb": "2",
              "dwmc": "运安部",
              "children": [
                {
                  "value": "404674",
                  "parentId": "404671",
                  "label": "运安部下属1",
                  "weight": 10,
                  "dwjb": "3",
                  "dwmc": "运安部下属1"
                },
                {
                  "value": "404675",
                  "parentId": "404671",
                  "label": "运安部下属2",
                  "weight": 11,
                  "dwjb": "3",
                  "dwmc": "运安部下属2"
                }
              ]
            },
            {
              "value": "404672",
              "parentId": "404670",
              "label": "出租公司",
              "weight": 8,
              "dwjb": "2",
              "dwmc": "出租公司",
              "children": [
                {
                  "value": "404679",
                  "parentId": "404672",
                  "label": "出租公司一车队",
                  "weight": 15,
                  "dwjb": "3",
                  "dwmc": "出租公司一车队"
                },
                {
                  "value": "404680",
                  "parentId": "404672",
                  "label": "出租公司二车队",
                  "weight": 16,
                  "dwjb": "3",
                  "dwmc": "出租公司二车队"
                },
                {
                  "value": "404681",
                  "parentId": "404672",
                  "label": "出租公司三车队",
                  "weight": 17,
                  "dwjb": "3",
                  "dwmc": "出租公司三车队"
                }
              ]
            },
            {
              "value": "404673",
              "parentId": "404670",
              "label": "旅游公司简称",
              "weight": 9,
              "dwjb": "2",
              "dwmc": "旅游公司全称",
              "children": [
                {
                  "value": "404676",
                  "parentId": "404673",
                  "label": "集散中心",
                  "weight": 12,
                  "dwjb": "3",
                  "dwmc": "集散中心",
                  "children": [
                    {
                      "value": "404677",
                      "parentId": "404676",
                      "label": "一车队",
                      "weight": 13,
                      "dwjb": "4",
                      "dwmc": "一车队"
                    },
                    {
                      "value": "404678",
                      "parentId": "404676",
                      "label": "二车队",
                      "weight": 14,
                      "dwjb": "4",
                      "dwmc": "二车队"
                    }
                  ]
                }
              ]
            },
            {
              "value": "404683",
              "parentId": "404670",
              "label": "研发企业",
              "weight": 19,
              "dwjb": "2",
              "dwmc": "研发测试企业"
            },
            {
              "value": "404685",
              "parentId": "404670",
              "label": "交投汽修",
              "weight": 21,
              "dwjb": "2",
              "dwmc": "交投汽修"
            }
          ]
        }
      ]
      // this.depTreeList = data
    },
    async getPostList(val) {
      const  data  = [
        {
          "xh": 3,
          "bh": "ep-20240730-1-8a0f99bb-2ef9-426e-b328-054aaae0a085",
          "mc": "普通员工",
          "ms": "",
          "qydm": "404670",
          "sfmr": "1",
          "plsx": null,
          "sfsy": "1",
          "zt": "0"
        },
        {
          "xh": 4,
          "bh": "ep-20240730-1-8cbb1fd3-a52c-477b-bb59-09674f4429ce",
          "mc": "驾驶员",
          "ms": "",
          "qydm": "404670",
          "sfmr": "0",
          "plsx": null,
          "sfsy": "0",
          "zt": "0"
        },
        {
          "xh": 5,
          "bh": "ep-20240730-1-29c7532c-ff76-4092-baf4-aee6f0bc8e96",
          "mc": "安全员",
          "ms": "",
          "qydm": "404670",
          "sfmr": "1",
          "plsx": null,
          "sfsy": "0",
          "zt": "0"
        },
        {
          "xh": 6,
          "bh": "ep-20240730-1-bd939091-7223-4b18-b334-7e33db602674",
          "mc": "部门负责人",
          "ms": "",
          "qydm": "404670",
          "sfmr": "1",
          "plsx": null,
          "sfsy": "0",
          "zt": "0"
        }
      ]
      // const { data } = await getAllDetailList({ qydm: val })
      this.postList = data.map(v => {
        return {
          ...v,
          check: false
        }
      })
    },
    close() {
      this.$emit('closeSelection')
    },
    async searchPerson(val) {
      // let API = null
      // if (this.type === 'noWhitePerson') {
      //   API = getEnableAppointUserPage
      // } else if (this.type === 'preJobTraining') {
      //   API = getPreJobTrainingUser
      // } else {
      //   API = getEnterpriseCurrenUsers
      // }
      // const { data } = await API({ xm: val, qydm: this.currentQydm, pageNum: 1, pageSize: 20 })
      const data = {
        "total": 30,
        "size": 20,
        "pages": 2,
        "current": 1,
        "pageNum": 1,
        "pageSize": 20,
        "rows": [
          {
            "yhdh": "15333520001",
            "xm": "万欣欣1",
            "dwdm": "404670",
            "yhlb": null,
            "sfzmhm": "1501********260001",
            "sjhm": "153****0001",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "换库-测试企业1",
            "dwmc": "换库-测试企业1全称",
            "zrrmc": null
          },
          {
            "yhdh": "15333520002",
            "xm": "万欣欣2",
            "dwdm": "404670",
            "yhlb": null,
            "sfzmhm": "1501********260002",
            "sjhm": "153****0002",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "换库-测试企业1",
            "dwmc": "换库-测试企业1全称",
            "zrrmc": null
          },
          {
            "yhdh": "15333520003",
            "xm": "万欣欣3",
            "dwdm": "404671",
            "yhlb": null,
            "sfzmhm": "1501********260003",
            "sjhm": "153****0003",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "运安部",
            "dwmc": "运安部",
            "zrrmc": null
          },
          {
            "yhdh": "15333520004",
            "xm": "万欣欣4",
            "dwdm": "404672",
            "yhlb": null,
            "sfzmhm": "1501********260004",
            "sjhm": "153****0004",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "出租公司",
            "dwmc": "出租公司",
            "zrrmc": null
          },
          {
            "yhdh": "15333520005",
            "xm": "万欣欣5",
            "dwdm": "404672",
            "yhlb": null,
            "sfzmhm": "1501********260005",
            "sjhm": "153****0005",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "出租公司",
            "dwmc": "出租公司",
            "zrrmc": null
          },
          {
            "yhdh": "15333520006",
            "xm": "万欣欣6",
            "dwdm": "404672",
            "yhlb": null,
            "sfzmhm": "1501********260006",
            "sjhm": "153****0006",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "出租公司",
            "dwmc": "出租公司",
            "zrrmc": null
          },
          {
            "yhdh": "15333520007",
            "xm": "万欣欣7",
            "dwdm": "404674",
            "yhlb": null,
            "sfzmhm": "1501********260007",
            "sjhm": "153****0007",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "运安部下属1",
            "dwmc": "运安部下属1",
            "zrrmc": null
          },
          {
            "yhdh": "15333520008",
            "xm": "万欣欣8",
            "dwdm": "404673",
            "yhlb": null,
            "sfzmhm": "1501********260008",
            "sjhm": "153****0008",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "旅游公司简称",
            "dwmc": "旅游公司全称",
            "zrrmc": null
          },
          {
            "yhdh": "15333520009",
            "xm": "万欣欣9",
            "dwdm": "404676",
            "yhlb": null,
            "sfzmhm": "1501********260009",
            "sjhm": "153****0009",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "集散中心",
            "dwmc": "集散中心",
            "zrrmc": null
          },
          {
            "yhdh": "15333520010",
            "xm": "万欣欣10",
            "dwdm": "404673",
            "yhlb": null,
            "sfzmhm": "1501********260010",
            "sjhm": "153****0010",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "旅游公司简称",
            "dwmc": "旅游公司全称",
            "zrrmc": null
          },
          {
            "yhdh": "15333520011",
            "xm": "万欣欣11",
            "dwdm": "404677",
            "yhlb": null,
            "sfzmhm": "1501********260011",
            "sjhm": "153****0011",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "一车队",
            "dwmc": "一车队",
            "zrrmc": null
          },
          {
            "yhdh": "15333520012",
            "xm": "万欣欣12",
            "dwdm": "404677",
            "yhlb": null,
            "sfzmhm": "1501********260012",
            "sjhm": "153****0012",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "一车队",
            "dwmc": "一车队",
            "zrrmc": null
          },
          {
            "yhdh": "15333520013",
            "xm": "万欣欣13",
            "dwdm": "404678",
            "yhlb": null,
            "sfzmhm": "1501********260012",
            "sjhm": "153****0013",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "二车队",
            "dwmc": "二车队",
            "zrrmc": null
          },
          {
            "yhdh": "15333520014",
            "xm": "万欣欣14",
            "dwdm": "404677",
            "yhlb": null,
            "sfzmhm": "1501********260014",
            "sjhm": "153****0014",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "一车队",
            "dwmc": "一车队",
            "zrrmc": null
          },
          {
            "yhdh": "15333520015",
            "xm": "万欣欣15",
            "dwdm": "404678",
            "yhlb": null,
            "sfzmhm": "1501********260015",
            "sjhm": "153****0015",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "二车队",
            "dwmc": "二车队",
            "zrrmc": null
          },
          {
            "yhdh": "15333520016",
            "xm": "万欣欣16",
            "dwdm": "404672",
            "yhlb": null,
            "sfzmhm": "1501********260015",
            "sjhm": "153****0016",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "出租公司",
            "dwmc": "出租公司",
            "zrrmc": null
          },
          {
            "yhdh": "15333520017",
            "xm": "万欣欣17",
            "dwdm": "404672",
            "yhlb": null,
            "sfzmhm": "1501********260015",
            "sjhm": "153****0017",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "部门负责人",
            "dwjc": "出租公司",
            "dwmc": "出租公司",
            "zrrmc": null
          },
          {
            "yhdh": "38113822973930002407",
            "xm": "刘雅涵2",
            "dwdm": "404679",
            "yhlb": null,
            "sfzmhm": "1501********260002",
            "sjhm": "138****0002",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "出租公司一车队",
            "dwmc": "出租公司一车队",
            "zrrmc": null
          },
          {
            "yhdh": "94715333523920018680",
            "xm": "万欣欣18",
            "dwdm": "404679",
            "yhlb": null,
            "sfzmhm": "1501********260018",
            "sjhm": "153****0018",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "安全员",
            "dwjc": "出租公司一车队",
            "dwmc": "出租公司一车队",
            "zrrmc": null
          },
          {
            "yhdh": "66215333542020019612",
            "xm": "万欣欣19",
            "dwdm": "404679",
            "yhlb": null,
            "sfzmhm": "1501********260019",
            "sjhm": "153****0019",
            "zhdm": "404670",
            "xb": "2",
            "nsrq": null,
            "dz": null,
            "gw": "驾驶员",
            "dwjc": "出租公司一车队",
            "dwmc": "出租公司一车队",
            "zrrmc": null
          }
        ]
      }
      this.personList = data.rows.map(v => {
        const index = _.findIndex(this.selectPersonList, o => o.yhdh === v.yhdh)
        if (index !== -1) {
          return {
            ...v,
            check: true
          }
        } else {
          return {
            ...v,
            check: false
          }
        }
      })
    },
    reset() {
      this.$refs.tree.reset([])
      this.selectPostList = []
      this.postList.forEach(v => {
        v.check = false
      })
      this.searchValue = ''
      this.inputValue = ''
    },
    // getHTML() {
    //   return (<div style='max-height: 400px;overflow: auto;'>
    //     <p v-show={this.selectDeptList && this.selectDeptList.length > 0} style='margin: 0 5px;'>确定要根据部门：</p>
    //     <div v-show={this.selectDeptList && this.selectDeptList.length > 0}>
    //       {
    //         this.selectDeptList.map((item, index) => {
    //           return <el-tag style='margin: 3px;' key={index}>{ item.label }</el-tag>
    //         })
    //       }
    //     </div>
    //     <p v-show={this.selectPostList && this.selectPostList.length > 0} style='margin: 0 5px;'>{ this.selectDeptList && this.selectDeptList.length > 0 ? '和岗位：' : '确定要根据部门：'}</p>
    //     <div v-show={this.selectPostList && this.selectPostList.length > 0}>
    //       {
    //         this.selectPostList.map((item, index) => {
    //           return <el-tag style='margin: 3px;' key={index}>{ item.mc }</el-tag>
    //         })
    //       }
    //     </div>
    //     <p style='margin: 0 5px;'>检索企业人员并添加到列表？</p>
    //   </div>)
    // },
    addPerson() {
      this.selectDeptList = this.$refs.tree.getCheckedNodes(false, true)
      const gws = this.selectPostList.map(v => v.bh) || []
      const dwdms = this.selectDeptList.map(v => v.value) || []
      let API = null
      if (this.type === 'noWhitePerson') {
        API = getEnableAppointUserList
      } else if (this.type === 'preJobTraining') {
        API = getPreJobTrainingUserList
      } else {
        API = getEnterpriseUsersList
      }
      if (gws.length > 0 || dwdms.length > 0) {
        this.$confirm('123', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(async() => {
          const arr = _.cloneDeep(this.selectPersonList)
          if (dwdms && dwdms.length > 0) {
            const { data } = await API({ dwdms })
            arr.push(...data)
          }
          if (gws && gws.length > 0) {
            const { data } = await API({ gws })
            arr.push(...data)
          }
          this.selectPersonList = _.uniqBy(arr, 'yhdh')
        }).catch(() => {
          this.$message.info('已取消')
        })
      } else {
        this.$message.error('请选择部门或岗位')
      }
    },
    deletePerson(item) {
      this.selectPersonList = this.selectPersonList.filter(v => v.yhdh !== item.yhdh)
    },
    change(item, value) {
      if (value) {
        this.selectPostList.push(item)
      } else {
        this.selectPostList = this.selectPostList.filter(v => v.check)
      }
    },
    changePerson(item, value) {
      if (value) {
        this.selectPersonList.push(item)
      } else {
        const arr = _.cloneDeep(this.selectPersonList)
        this.selectPersonList = arr.filter(v => v.yhdh !== item.yhdh)
      }
    },
    submit() {
      this.$emit('changePerson', this.selectPersonList)
    },
    clearAll() {
      this.selectPersonList = []
    },
    setSearchSelectList() {
      const str = _.trim(this.inputValue)
      if (str) {
        const arr = _.cloneDeep(this.selectPersonList)
        this.searchSelectList = arr.filter(v => {
          return _.includes(v.xm, str) || _.includes(v.dwmc, str) || _.includes(v.dwjc, str) || _.includes(v.gw, str)
        })
      } else {
        this.searchSelectList = _.cloneDeep(this.selectPersonList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex{
  display: flex;
}
.aic{
  align-items: center;
}
.person-dialog{
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.35);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  .card{
    width: 700px;
    height: 550px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .header{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background-color: #F5F6F7;
    }
    .container{
      display: flex;
      height: 500px;
      width: 100%;
      >div{
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
      }
      .left{
        width: 400px;
        >div{
          width: 100%;
        }
        .top{
          height: 40px;
          :deep(.ant-input){
            outline: none;
            border: none;
            padding-left: 0;
          }
        }
        .list{
          height: calc(100% - 90px);
          overflow: auto;
          .ant-tag{
            margin: 3px;
          }
        }
        .bottom{
          height: 50px;
          .top{
            height: 40px;
          }
        }
      }
      .right{
        width: 300px;
        border-left: 1px solid #F5F6F7;
        padding-right: 0;
        .top{
          height: 40px;
          padding-right: 15px;
          :deep(.ant-select .ant-input){
            outline: none;
            border: none;
            padding-left: 0;
          }
        }
        .list{
          height: calc(100% - 90px);
          padding-top: 10px;
          box-sizing: border-box;
          overflow: auto;
          padding-right: 15px;
          .collapse-div{
            max-height: 220px;
            width: 100%;
            overflow: auto;
            ul{
              margin: 0;
              padding: 0;
              li{
                list-style: none;
                padding: 0 10px;
                >span{
                  margin-left: 10px;
                }
              }
            }
          }
        }
        .bottom{
          height: 50px;
        }
      }
    }

  }
}
</style>
