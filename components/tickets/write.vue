<template>
    <div class="panel">
        <div class="panel-body">
            <form @submit.prevent="validateBeforeSubmit($event)">
                <div class="text-center" v-if="!componentReady">
                    <div class="icmn-spinner11 util-spin" style="display: inline-block; margin-bottom: 20px"></div> &nbsp;Получаем список быстрых ответов
                </div>
                <div v-else style="margin-bottom: 10px">
                    <template v-for="answer in fastAnswers">
                        <span style="cursor: pointer" v-on:click="turnAnswer(answer.content)" class="label label-secondary font-size-14 margin-inline">{{answer.title}}</span>
                    </template>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="form-group margin-bottom-0" :class="{'has-danger': errors.has('answer_field') }">
                            <textarea data-vv-as="Ответ" :class="{'has-danger': errors.has('answer_field') }" v-validate="'min:2|required'" name='answer_field' v-model="message" class="form-control adjustable-textarea" placeholder="Ваш ответ" style="min-height: 150px;overflow: hidden; word-wrap: break-word; resize: none; height: 60px;"></textarea>
                            <div class="form-control-error" v-if="errors !== undefined && errors.has('answer_field')">
                                <ul>
                                    <li>{{ errors.first('answer_field') }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group margin-bottom-0" :class="{'has-danger': errors.has('answer_field') }">
                            <dropzone v-if="onClient === true" ref="myUniqueID" id="myUniqueID22" url="/api/ticket/screenshot" :use-custom-dropzone-options="true" :use-font-awesome="true" :auto-process-queue="false" :show-remove-link="false">
                                <div class="dz-default dz-message">
                                    <span><i style="font-size: 32px;" class="fa fa-cloud-upload"></i><br>Перетащите изображения сюда для загрузки</span>
                                </div>
                            </dropzone>
                        </div>
                    </div>
                </div>
                <div class="form-actions margin-bottom-0 margin-top-0 padding-top-0 border-top-0">
                    <button type="submit" class="btn btn-primary btn-send width-200 margin-top-10">
                        <i class="icmn-spinner6 util-spin"></i>
                        Отправить
                    </button>
                </div>
                <canvas id="shopImageCanvas" style="display: none"/>
            </form>
        </div>
    </div>
</template>

<script>
  import { sendImageToCash, getFromApi } from '~/utils/api'

  let miniToastr
  let dropzone = {}

  if (process.browser) {
    miniToastr = require('mini-toastr')
    dropzone = require('vue2-dropzone')
    dropzone.name = 'dropzone'
  }

  dropzone.render = function (createElement) {
    const that = this._self
    return createElement('form', {
      props: that.props,
      attrs: {
        class: 'vue-dropzone dropzone',
        id: that.id || '',
        action: that.url || '',
        dropzoneOptions: that.dropzoneOptions,
        useCustomDropzoneOptions: that.useCustomDropzoneOptions
      }
    }, this.$slots.default)
  }

  export default {
    props: ['ticketId', 'author', 'reseller'],
    data: function () {
      return {
        fastAnswers: [],
        componentReady: false,
        message: '',
        onClient: false,
        imageToSend: [],
        options: {
          useFontAwesome: true
        }
      }
    },
    components: {
      dropzone
    },
    mounted () {
      miniToastr.init()
      let self = this
      this.onClient = true
      setTimeout(function () {
        document.querySelector('#myUniqueID22').dropzone.on('addedfile', function (file) {
          self.uploadAvatar(file)
        })
      }, 2000)
    },
    created: function () {
      let module = 'tickets'
      if (this.reseller !== undefined && this.reseller === true) {
        module = 'reseller-tickets-public'
      }
      getFromApi(undefined, module, 'getTemplates', {})
        .then((response) => {
          let self = this
          self.componentReady = true
          if (response.data.message !== undefined && response.data.message.length > 0) {
            self.fastAnswers = response.data.message
          }
        })
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    methods: {
      turnAnswer: function (content) {
        this.message = content
      },
      uploadAvatar: function (file) {
        let canvas = document.querySelector('#shopImageCanvas')
        let context = canvas.getContext('2d')
        let pngUrl
        let self = this
        if (file) {
          let temp = file
          let FR = new FileReader()
          FR.onload = function (e) {
            let img = new Image()
            img.onload = function () {
              canvas.width = img.width
              canvas.height = img.height
              context.drawImage(img, 0, 0)
              pngUrl = canvas.toDataURL('image/jpeg')
              sendImageToCash('https://backmy.cash/api/ticket/screenshot', pngUrl, '.jpg', true)
                .then((response) => {
                  self.imageToSend.push('https://backmy.cash' + response.data)
                })
            }
            img.src = e.target.result
          }
          FR.readAsDataURL(temp)
        }
      },
      reset () {
        this.$emit('update', true)
        this.message = ''
        this.imageToSend = []
        this.$validator.reset()
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.sendMessage(event)
        }
      },
      sendMessage: function (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'write'
        let module = 'tickets'

        if (this.reseller !== undefined && this.reseller === true) {
          module = 'reseller-tickets-public'
        }
        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        // self.imageToSend = [
        // 'https://pp.userapi.com/c840133/v840133818/2ce09/ImphklhMzPM.jpg',
        // 'https://pp.userapi.com/c840133/v840133818/2ce25/_jXGqwT7SwM.jpg'
        // ]

        let data = {
          message: self.message,
          ticket: self.ticketId,
          image: self.imageToSend
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success' && response.data.message === 'message_sent_success') {
              self.showMessage({
                title: 'Успех!', message: 'Сообщение было успешно отправлено', type: 'success'
              })
              this.reset()
            } else if (response.data.message === 'validation_failed') {
              self.showMessage({
                title: 'Ошибка!', message: 'Текст сообщения не прошел валидацию', type: 'error'
              })
            } else {
              self.showMessage({
                title: 'Ошибка!', message: response.data.message, type: 'error'
              })
            }
          })
      }
    }
  }
</script>