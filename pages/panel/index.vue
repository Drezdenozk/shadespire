<template>

</template>
<script>
export default {
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  layout: 'default',
  head: {
    bodyAttrs: {
      class: 'theme-dark'
    },
    title: 'Cashback Wmr Panel',
    meta: [
      {
        hid: 'Cashback Wmr Panel',
        name: 'Cashback Wmr Panel',
        content: 'Cashback Wmr Panel'
      }
    ]
  }
}
</script>