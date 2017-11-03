<template>
    <nav class="top-menu">
        <div class="menu-icon-container hidden-md-up">
            <div class="animate-menu-button left-menu-toggle" v-on:click="toggleMenu()">
                <div><!-- --></div>
            </div>
        </div>
        <div class="menu">
            <Profile></Profile>
            <div class="menu-info-block">
                <Balance></Balance>
            </div>
        </div>
    </nav>
</template>


<script>
  import Profile from '~/components/template/profile.vue'
  import Balance from '~/components/template/balance.vue'

  export default {
    components: {
      Profile,
      Balance
    },
    methods: {
      toggleMenu: function () {
        let button = document.querySelector('div.animate-menu-button')
        let sideBar = document.querySelector('nav.left-menu')
        let backDrop = document.querySelector('div.main-backdrop')

        button.classList.toggle('active')
        sideBar.classList.toggle('left-menu-showed')
        backDrop.classList.toggle('main-backdrop-showed')
      }
    }
  }
</script>
