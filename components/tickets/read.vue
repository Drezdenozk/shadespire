<template>
    <div class="conversation-block" tabindex="0">
        <div class="conversation-item">
            <div class="s1">
                <a class="avatar">
                    <img :src="(ticketPreview.user.avatar !== undefined && ticketPreview.user.avatar !== null && ticketPreview.user.avatar !== 'null' && ticketPreview.user.avatar !== '' ? ticketPreview.user.avatar : '/avatar.png')" onerror="this.setAttribute('src', '/avatar.png')">
                </a>
            </div>
            <div class="s2">
                <div>
                    <div class="pull-right" v-if="ticketPreview.from_device.length !== 0">
                        <i class="fa fa-user-secret" aria-hidden="true" v-tooltip.right-end="createInfo(ticketPreview)"></i>
                    </div>
                    <small>{{dataFCreated(ticketPreview.created)}}</small>
                </div>
                <strong><nuxt-link :to="'/admin/users/edit/' + ticketPreview.user.id">{{createName()}}</nuxt-link></strong>
                <p>{{ticketPreview.message}}</p>
                <template v-if="ticketPreview.image.length > 0">
                    <div class="list" v-for="(n, index) in ticketPreview.image" :data-index="index">
                        <img data-zoom-padding='20' :data-zoom-url='n.src' data-zoom-overlay='true' class="messaging-img" :src="n.src">
                    </div>
                </template>
            </div>
        </div>
        <template>
            <div v-for="message in ticketData" class="conversation-item" :class="{'you': message.from.id !== author}">
                <div class="s1">
                    <a class="avatar">
                        <template v-if="message.from.id === author">
                            <img :src="(ticketPreview.user.avatar !== undefined && ticketPreview.user.avatar !== null && ticketPreview.user.avatar !== 'null' && ticketPreview.user.avatar !== '' ? ticketPreview.user.avatar : '/avatar.png')" onerror="this.setAttribute('src', '/avatar.png')">
                        </template>
                        <template v-else>
                            <img :src="(message.avatar !== undefined && message.avatar !== null && message.avatar !== 'null' && message.avatar !== '' ? message.avatar : '/admin.png')" onerror="this.setAttribute('src', '/admin.png')">
                        </template>
                    </a>
                </div>
                <div class="s2">
                    <div>
                        <div class="pull-right" v-if="message.from.id === author && message.from_device.length !== 0">
                            <i class="fa fa-user-secret" aria-hidden="true" v-tooltip.right-end="createInfo(message)"></i>
                        </div>
                        <small>{{dataCreated(message.date)}}</small>
                    </div>
                    <template v-if="message.from.id === author">
                        <strong><nuxt-link :to="'/admin/users/edit/' + message.from.id">{{createName(message)}}</nuxt-link></strong>
                    </template>
                    <template v-else>
                        <strong><nuxt-link :to="'/admin/users/edit/' + message.from.id">{{createName(message)}}</nuxt-link></strong>
                    </template>
                    <p>{{message.message}}</p>
                    <template v-if="message.image && message.image.length > 0">
                        <div class="list" v-for="(n, index) in message.image" :data-index="index">
                            <img data-zoom-padding='20' :data-zoom-url='n.src' data-zoom-overlay='true' class="messaging-img" :src="n.src">
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <div class="text-center" v-if="!componentReady">
            <div class="icmn-spinner11 util-spin"></div> &nbsp;Получаем список сообщений
        </div>
    </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data: function () {
      return {
        modalclose: true,
        keyinput: true,
        mousescroll: true,
        showclosebutton: true,
        showcaption: true,
        imagecountseparator: 'из',
        showimagecount: true,
        showthumbnails: true
      }
    },
    props: [
      'ticketPreview',
      'ticketData',
      'author',
      'componentReady'
    ],
    updated: function () {
      if (process.browser) {
        let zoom = require('image-zoom')

        var z = zoom(document.querySelector('img'))
        z.on('shown', function () {
        })
      }
    },
    methods: {
      imageList: function (imagesList) {
        let newArray = imagesList.map(function (item) {
          return {url: item.src}
        })
        return newArray
      },
      createInfo: function (message) {
        if (typeof message.from_device === 'string') {
          message.from_device = JSON.parse(message.from_device)
        }
        let val = ''
        if (Object.keys(message.from_device).length > 0) {
          Object.keys(message.from_device).map(function (key, index) {
            val += key + ': ' + message.from_device[key] + '<br/>'
          })
        }
        return val
      },
      dataFCreated: function (datas) {
        return moment(datas, 'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY, HH:mm')
      },
      dataCreated: function (datas) {
        return moment(datas, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
      },
      createName: function (message) {
        let value = []

        if (message !== undefined) {
          if (message.firstname !== undefined && message.firstname !== 'null' && message.firstname !== null && message.firstname !== '') {
            value.push(message.firstname)
          }
          if (value.length === 0 && message.from.id === this.author) {
            value.push(this.ticketPreview.user.email)
          } else if (message.from.id === this.author) {
            value.push('[' + this.ticketPreview.user.email + ']')
          } else if (value.length === 0) {
            value.push('Сотрудник тех-поддержки')
          }
        } else {
          if (this.ticketPreview.user.secondName !== undefined && this.ticketPreview.user.secondName !== 'null' && this.ticketPreview.user.secondName !== null && this.ticketPreview.user.secondName !== '') {
            value.push(this.ticketPreview.user.secondName)
          }
          if (this.ticketPreview.user.firstName !== undefined && this.ticketPreview.user.firstName !== 'null' && this.ticketPreview.user.firstName !== null && this.ticketPreview.user.firstName !== '') {
            value.push(this.ticketPreview.user.firstName)
          }
          if (this.ticketPreview.user.thirdName !== undefined && this.ticketPreview.user.thirdName !== 'null' && this.ticketPreview.user.thirdName !== null && this.ticketPreview.user.thirdName !== '') {
            value.push(this.ticketPreview.user.thirdName)
          }
          if (value.length === 0) {
            value.push(this.ticketPreview.user.email)
          } else {
            value.push('[' + this.ticketPreview.user.email + ']')
          }
        }

        return value.join(' ')
      }
    }
  }
</script>