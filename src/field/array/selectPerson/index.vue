<template>
  <div class="custom-string-filed-wrapper">
    <a-select
      v-model:value="yhdhs"
      mode="multiple"
      style="width: 100%"
      placeholder="请选择"
      :max-tag-count="maxTagCount"
      :options="options"
      :open="false"
      @click="openSelect"
    >
      <template #maxTagPlaceholder="omittedValues">
        <span style="color: red">+ {{ omittedValues.length }} ...</span>
      </template>
    </a-select>
    <PersonCard v-if="personDialog" :selected="yhdhs" @changePerson="changePerson" @closeSelection="closeSelection" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref  } from 'vue'
import PersonCard from './components/personCard.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'CustomArraySelectPerson',
  components:{
    PersonCard
  },
  setup() {
    const options = ref([
      {
        label: 'text',
        value: 1
      }
    ])
    const yhdhs = ref([])
    const maxTagCount = ref(2)
    const maxTagTextLength = ref(10)
    /**
     * @description: 打开人员选择框
     * @return {*}
     */
    const personDialog = ref(false)    
    const openSelect = () => {
      personDialog.value = true
    }
    /**
     * @description: 人员数据变动
     * @param {*} val
     * @return {*}
     */    
    const changePerson = (val) => {
      console.log(val);
    }
    /**
     * @description: 人员选框关闭
     * @return {*}
     */    
    const closeSelection = () => {
      personDialog.value = false
    }
    return {
      // select
      yhdhs,
      options,
      maxTagCount,
      maxTagTextLength,

      // 人员选框
      personDialog,
      openSelect,
      changePerson,
      closeSelection,
      
    }
  }
})
</script>

<style lang="scss">
.custom-string-filed-wrapper {
}
</style>