<template>
  <div class="custom-string-filed-wrapper">
    <el-button @click="openDetail({})">详情</el-button>
    <LedgerDetail ref="ledgerDetail" />
  </div>
</template>

<script>
import LedgerDetail from './detail.vue'
export default {
  components:{
    LedgerDetail
  },
  methods:{
    openDetail(row) {
      this.$refs.ledgerDetail.open(row)
    }
  }
}
</script>

<style lang="scss">
.custom-string-filed-wrapper {
}
</style>