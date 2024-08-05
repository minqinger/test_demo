<template>
  <div class="treeWithSearch">
    <el-input
      v-if="showSearch"
      v-model="filterText"
      clearable
      :placeholder="placeholder"
      suffix-icon="el-icon-search"
      size="mini"
      style="margin-bottom: 10px;"
    />
    <div class="treeDiv">
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        :show-checkbox="showCheckbox"
        :filter-node-method="filterNode"
        :default-expanded-keys="expandedKeys"
        node-key="value"
        :highlight-current="highlightCurrent"
        :check-strictly="checkStrictly"
        :default-checked-keys="checkedKeys"
        :lazy="lazy"
        :load="loadNode"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        @check="checkHandle"
      >
        <template #default="{ node, data }">
          <span class="el-tree-node__label custom-tree-node">
            <span :title="data.label">{{ data.label }}</span>
            <slot name="actionBtns" :node="node" />
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字检索'
    },
    data: {
      type: Array,
      default: () => [],
      require: true
    },
    // 默认选中的节点数组
    checkedKeys: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          children: 'children',
          isLeaf: 'leaf'
        }
      },
      require: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: true
    },
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    requiredParent: {
      type: Boolean,
      default: false
    },
    // 默认展开节点的级别
    expandedKey: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      filterText: '',
      expandedKeys: [],
      currentKey: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    data: {
      handler(val) {
        this.expandNode(this.expandedKey, val)
      },
      immediate: true,
      deep: true
    }
  },
  mounted(){
    console.log(this.data)
  },
  methods: {
    loadNode(node, resolve) {
      this.$emit('loadNode', node, resolve)
    },
    checkHandle(currentNode, checkedNodes) {
      let checkFlag = false
      if (checkedNodes.checkedKeys.indexOf(currentNode.value) !== -1) {
        checkFlag = true
      }
      // 实现单向绑定 点击父节点全选子节点 子节点取消勾选而父节点不取消勾选
      this.recursionCheck(currentNode, checkFlag, true)
      // 子节点选中  父节点选中
      if (this.requiredParent) {
        this.selectedParent(currentNode)
      }
    },
    recursionCheck(currentNode, checkFlag, deepFlag) {
      if (currentNode.children && currentNode.children.length !== 0) {
        currentNode.children.forEach(item => {
          this.recursionCheck(item, checkFlag, deepFlag)
        })
      }
      this.$refs.tree.setChecked(currentNode.value, checkFlag, deepFlag)
    },
    selectedParent(currentObj) {
      const currentNode = this.$refs.tree.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true)
        this.selectedParent(currentNode.parent)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data && data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      if (data.value === this.currentKey) {
        this.$refs.tree.setCurrentKey(null)
        this.currentKey = null
        this.$emit('handleNodeClick', {})
        return
      }
      this.currentKey = data.value
      this.$emit('handleNodeClick', data)
    },
    // 返回被选中的节点数组，参数与element一致
    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },
    // 默认展开几级节点
    expandNode(num, children) {
      --num
      if (num > 0) {
        children.forEach(item => {
          this.expandedKeys.push(item.value)
          if (item.children) {
            this.expandNode(num, item.children)
          }
        })
      }
    },
    // 重置
    reset(arr) {
      this.filterText = ''
      this.$refs.tree.setCheckedKeys(arr)
    },
    format(node){
      console.log(node)
      return '暂无'
    }
  }
}
</script>

<style scoped lang="scss">
.treeWithSearch {
  height: 100%;

  .treeDiv {
    margin-top: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 42px);
    :deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content){
      background-color: #b9d9ff;
    }
    :deep(.el-tree-node__content){
      border-left: 2px solid transparent;
      &:hover{
        background-color: transparent;
      }
    }
    .el-tree-node__label{
      overflow: hidden;
      >span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    :deep(.el-tree-node:focus>.el-tree-node__content){
      background-color: transparent;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
