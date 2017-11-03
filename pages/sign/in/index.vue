<template>
  <div class="single-page-block">
    <div class="single-page-block-inner effect-3d-element" style="border-radius:0px;background-color: #2b2838;">
      <div class="blur-placeholder"><!-- --></div>
      <div class="single-page-block-form">
        <h3 class="text-center">
          <i class="icmn-enter margin-right-10"></i>
          Авторизация
        </h3>
        <br />
        <form @submit.prevent="validateBeforeSubmit($event)" id="form-validation" name="form-validation" method="POST">
          <div class="form-group" :class="{'has-danger': errors.has('email_field') }">
            <div class="input-group">
              <span class="input-group-addon" style="border-radius:0px;min-width:38px;">
                  <i class="fa fa-envelope"></i>
              </span>
              <input style="border-radius:0px;" data-vv-as="E-mail" :class="{'has-danger': errors.has('email_field') }" type="email" placeholder="E-mail" v-validate="'email|required'" name='email_field' id="email" class="form-control" v-model="user.email">
              <div class="form-control-error" v-if="errors !== undefined && errors.has('email_field')">
                <ul>
                  <li>{{ errors.first('email_field') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="form-group" :class="{'has-danger': errors.has('password_field') }">
            <div class="input-group">
              <span class="input-group-addon" style="border-radius:0px;min-width:38px;">
                  <i class="fa fa-unlock-alt"></i>
              </span>
              <input style="border-radius:0px;" data-vv-as="E-mail" :class="{'has-danger': errors.has('password_field') }" type="password" placeholder="Пароль" v-validate="'min:6|required'" name='password_field' id="validation-password" class="form-control password" v-model="user.passwd">
              <div class="form-control-error" v-if="errors !== undefined && errors.has('password_field')">
                <ul>
                  <li>{{ errors.first('password_field') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" style="border-radius:0px;" class="btn btn-primary width-150 btn-send"><i class="icmn-spinner6 util-spin"></i>Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { setToken } from '~/utils/auth'

  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    mounted () {
      miniToastr.init()
    },
    layout: 'login',
    head: {
      bodyAttrs: {
        class: 'theme-dark single-page single-page-inverse'
      },
      title: 'Авторизация',
      meta: [
        {
          hid: 'Авторизация',
          name: 'Авторизация',
          content: 'Авторизация'
        }
      ]
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    data: function () {
      return {
        user: {
          email: '',
          passwd: ''
        }
      }
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.auth(event)
        }
      },
      auth (e) {
        e.preventDefault()
        let button = (e.target).querySelector('.btn-send')
        let self = this

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')
        if (this.user.email.length > 0 && this.user.passwd.length > 0) {
          let button = document.querySelector('.form-actions button[type="submit"]')
          button.classList.add('on-ajax')

          let url
          let toServer

          if (process.browser) {
            url = process.env.urls[process.env.currentUrl].ajax
          } else {
            url = process.env.urls[process.env.currentUrl].local
          }

          if (process.env.urls[process.env.currentUrl].rawData === true) {
            toServer = encodeURIComponent(JSON.stringify({module: 'sign', action: 'in', data: this.user, ip: process.env.ip, 'host': process.env.secretKey}))
            toServer = ('data=' + toServer)
          } else {
            toServer = JSON.stringify({module: 'sign', action: 'in', data: this.user, ip: process.env.ip, 'host': process.env.secretKey})
          }

          if (process.env.urls[process.env.currentUrl].rawData === true) {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
          } else {
            axios.defaults.headers.post['Content-Type'] = 'application/json'
          }

          axios.post(url, toServer)
            .then(function (response) {
              button.classList.remove('on-ajax')
              button.removeAttribute('disabled')
              if (response.data.status === 'success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Авторизация успешна!',
                  type: 'success'
                })
                setToken(response.data.message)
                self.$router.replace('/')
              } else {
                var message = ''
                switch (response.data.message) {
                  case 'email_or_passwd_incorrect':
                    message = 'E-mail или пароль указаны неправильно'
                    break
                  case 'account_doesnt_have_permissions':
                    message = 'E-mail или пароль указаны неправильно'
                    break
                  default:
                    message = response.data.message
                }
                self.showMessage({
                  title: 'Ошибка!',
                  message: message,
                  type: 'error'
                })
              }
            })
            .catch(function (error) {
              self.showMessage({
                title: 'Ошибка!',
                message: error,
                type: 'error'
              })
            })
        }
        return false
      }
    }
  }
</script>