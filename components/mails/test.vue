<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h5>Тестирование</h5>
        </div>
        <div class="panel-body">
            <form @submit.prevent="validateBeforeSubmit">
                <div class="form-group" :class="{'has-danger': errors.has('email') }">
                    <label class="form-control-label" for="l8" :class="{'has-danger': errors.has('email') }">Отправить тестовое письмо на адрес</label>
                    <div class="input-group">
                        <input data-vv-as="E-mail" v-validate="'required'" name="email" :class="{'has-danger': errors.has('email') }" type="email" class="form-control" v-model="email" placeholder="test@mail.ru" id="l8">
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-success">
                                Отправить
                            </button>
                        </span>
                    </div>
                    <div class="form-control-error" v-if="errors !== undefined && errors.has('email')">
                        <ul>
                            <li>{{ errors.first('email') }}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" v-on:click="showPreview($event)" class="btn btn-warning">Открыть превью в новом окне</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { getFromApi } from '~/utils/api'

    let miniToastr
    if (process.browser) {
      miniToastr = require('mini-toastr')
    }

    export default {
      props: [
        'content',
        'project',
        'type'
      ],
      mounted () {
        miniToastr.init()
      },
      data: function () {
        return {
          email: ''
        }
      },
      notifications: {
        showMessage: {
          title: '',
          message: '',
          type: 'error'
        }
      },
      methods: {
        validateBeforeSubmit (event) {
          this.$validator.validateAll()
          if (!this.errors.any()) {
            this.sendPreview(event)
          }
        },
        sendPreview: function (event) {
          let self = this
          let button = event.currentTarget.querySelector('.btn-success')
          let module = 'mailing'
          let action = 'sendTestEmail'
          let data = {content: self.content, subject: 'Тестовое письмо', email: self.email}

          if (self.project !== undefined && self.type !== undefined) {
            module = 'notifications'
            action = 'sendTestEmail'
            data = {
              pid: self.project,
              email: self.email,
              type: self.type
            }
          }

          button.classList.add('on-ajax')
          button.setAttribute('disabled', 'disabled')

          if (this.content !== undefined && this.content !== null && this.content !== '') {
            getFromApi(undefined, module, action, data)
              .then((response) => {
                button.classList.remove('on-ajax')
                button.removeAttribute('disabled')

                if (response.data.status === 'success') {
                  self.showMessage({
                    title: 'Успех!',
                    message: 'Тестовое сообщение было отправлено',
                    type: 'success'
                  })
                } else {
                  self.showMessage({
                    title: 'Ошибка!',
                    message: 'Ошибка отправки тестового сообщения',
                    type: 'error'
                  })
                }
              })
          } else {
            self.showMessage({
              title: 'Ошибка!',
              message: 'Вы не заполнили поле "HTML содержимое',
              type: 'error'
            })
          }
        },
        showPreview: function (event) {
          let self = this
          if (self.content !== undefined && self.content !== null && self.content !== '') {
            event.preventDefault()
            let win = window.open('', 'Title')
            win.document.body.innerHTML = self.content
          } else {
            self.showMessage({
              title: 'Ошибка!',
              message: 'Вы не заполнили поле "HTML содержимое',
              type: 'error'
            })
          }
        }
      }
    }
</script>