<template>
  <div class="view-action-wrapper" @click="clickAction">
    自定义跳转动作
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'ViewActionComponent',
  props: ['clickAction']
})
</script>

<style lang="scss">
.view-action-wrapper {
}
</style>
