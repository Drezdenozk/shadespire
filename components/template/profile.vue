<template>
    <div class="menu-user-block" v-if="userId !== null">
        <div class="dropdown dropdown-avatar" :class="{'open' : menu_opened}">
            <a v-on:click="showProfile($event)" href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="avatar" v-if="userAvatar === null">
                    <img src="~assets/theme/assets/common/img/temp/avatars/1.jpg">
                </span>
                <span class="avatar" v-else>
                    <img :src="'https://backmy.cash' + userAvatar" onerror="this.setAttribute('src', '/admin.png')">
                </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="" role="menu">
                <nuxt-link class="dropdown-item" :to="'/admin/users/edit/' + userId"><i class="dropdown-icon icmn-user"></i> Профиль</nuxt-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" v-on:click="logOut($event)"><i class="dropdown-icon icmn-exit"></i> Выйти</a>
            </ul>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { unsetToken } from '~/utils/auth'

  export default {
    computed: mapGetters(['userAvatar', 'userId']),
    data: function () {
      return {
        menu_opened: false
      }
    },
    methods: {
      showProfile (event) {
        event.preventDefault()
        this.menu_opened = !this.menu_opened
      },
      logOut (event) {
        event.preventDefault()
        unsetToken()
      }
    }
  }
</script>