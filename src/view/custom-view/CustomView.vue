<template>
  <div class="custom-view-wrapper">
    {{ list2 }}
    <h1>自定义视图</h1>
    {{ list }}
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {http} from "@kunlun/dependencies";

export default defineComponent({
  inheritAttrs: false,
  name: 'ViewComponentVue',
  props: ['list'],
  setup() {
    const list2 = ref()
    onMounted(async () => {
      const query = `{
        resourceLangQuery {
          queryListByEntity(query: {active: ACTIVE, installState: true}) {
            id
            name
            active
            installState
            code
            isoCode
          }
        }
      }
      `
      const result = await http.query('resource', query);
      list2.value = result.data['resourceLangQuery']['queryListByEntity']

      const mutation = `mutation {
      resourceTaxKindMutation {
        create(data: {code: "002", name: "测试2"}) {
          id
          code
          name
          createDate
          writeDate
          createUid
          writeUid
        }
      }
    }
    `
      const res = await http.mutate('resource', mutation);
      console.log(res);
    });
    return {
      list2
    }
  }
})
</script>

<style lang="scss">
.custom-view-wrapper {}
</style>
