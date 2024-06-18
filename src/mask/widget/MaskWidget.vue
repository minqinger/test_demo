<template>
  <div class="mask-widget-wrapper">
    <h1>Mask组件</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'MaskComponentVue'
})
</script>

<style lang="scss">
.mask-widget-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--oio-disable-color)
}
</style>
