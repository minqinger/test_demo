<template>
  <div class="layout-widget-wrapper">
    <h1>Layout组件</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'LayoutComponentVue'
})
</script>

<style lang="scss">
.layout-widget-wrapper {
  background-color: red;
}
</style>
