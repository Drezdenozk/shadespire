<template>
  <div>
    <LeftMenu></LeftMenu>
    <TopMenu></TopMenu>

    <section class="page-content">
      <div class="page-content-inner">
        <template v-if="guestToken !== undefined && guestToken !== null">
          <div class="alert alert-warning" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="refresh">
              <span aria-hidden="true">×</span>
            </button>
            <strong>Внимание!</strong> Вы авторизованы под другим пользователем. Нажмите F5 или закройте это окно чтобы вернуться в свой.<br/>
            Ваш токен: {{guestToken}}
          </div>
        </template>
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
    computed: mapGetters(['isAuthenticated', 'loggedUser', 'guestToken', 'userGroups']),
    mounted () {
      let self = this
      window.setInterval(function () {
        if (self.userGroups.indexOf(1) !== -1) {
          self.$store.dispatch('updateAdminBalance', this.loggedUser)
          self.$store.dispatch('updateAdminTicketsCounter', this.loggedUser)
          self.$store.dispatch('updateAdminOrdersCounter', this.loggedUser)
        } else if (self.userGroups.indexOf(3) !== -1) {
          self.$store.dispatch('updateResellerBalance', this.loggedUser)
        }
      }, 120000)
    },
    components: {
      LeftMenu,
      TopMenu
    },
    methods: {
      refresh () {
        location.replace('/')
      },
      logOut () {
        unsetToken()
      }
    }
  }
</script>
