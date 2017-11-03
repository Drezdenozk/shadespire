<template>
    <div>
        <LeftMenu></LeftMenu>
        <TopMenu></TopMenu>

        <section class="page-content">
            <div class="page-content-inner">
                <nuxt/>
            </div>
        </section>
        <div class="main-backdrop"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { unsetToken } from '~/utils/auth'
    import LeftMenu from '~/components/template/leftmenu.vue'
    import TopMenu from '~/components/template/topmenu.vue'

    export default {
      middleware: 'check-rules',
      computed: mapGetters(['isAuthenticated', 'loggedUser']),
      mounted () {
        let self = this
        window.setInterval(function () {
          self.$store.dispatch('updateAdminBalance', this.loggedUser)
          self.$store.dispatch('updateAdminTicketsCounter', this.loggedUser)
          self.$store.dispatch('updateAdminOrdersCounter', this.loggedUser)
        }, 120000)
      },
      components: {
        LeftMenu,
        TopMenu
      },
      methods: {
        logOut () {
          unsetToken()
        }
      }
    }
</script>
