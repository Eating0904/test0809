<template lang="pug">
router-view
Panels     // 非必要
</template>

<script>
import { useQueryString } from 'app-plugin/utils/hooks'
import { Panels } from 'app-plugin/components'

export default {
  name: 'App',
  components: {
    Panels,
  },
  setup() {
    useQueryString()
    return {}
  },
}
</script>