<template>
    <div class="container">
        <h1>
            <p class="text-center"><img src="/404.jpg" /></p>
        </h1>
    </div>
</template>

<script>
    export default {
      transition (to, from) {
        if (!from) return 'slide-left'
        return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
      },
      middleware: 'check-rules',
      layout: '404',
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