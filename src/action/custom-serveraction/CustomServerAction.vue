<template>
  <div class="server-action-wrapper" @click="clickAction">
    自定义服务器动作
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'ServerActionComponent',
  props: ['clickAction']
})
</script>

<style lang="scss">
.server-action-wrapper {
}
</style>
