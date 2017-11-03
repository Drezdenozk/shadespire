<template>
    <form @submit.prevent="validateBeforeSubmit($event)">
        <div class="form-group" :class="{'has-danger': errors.has('title') }">
            <label class="form-label" :class="{'has-danger': errors.has('title') }" >Заголовок</label>
            <input data-vv-as="Заголовок" :class="{'has-danger': errors.has('title') }" v-validate="'required'" name='title' v-model="title" class="form-control" />
            <div class="form-control-error" v-if="errors !== undefined && errors.has('title')">
                <ul>
                    <li>{{ errors.first('title') }}</li>
                </ul>
            </div>
        </div>
        <div class="form-group" :class="{'has-danger': errors.has('content') }">
            <label class="form-label" :class="{'has-danger': errors.has('title') }" >Контент</label>
            <textarea data-vv-as="Контент" :class="{'has-danger': errors.has('content') }" v-validate="'min:2|required'" name='content' v-model="content" class="form-control adjustable-textarea"></textarea>
            <div class="form-control-error" v-if="errors !== undefined && errors.has('content')">
                <ul>
                    <li>{{ errors.first('content') }}</li>
                </ul>
            </div>
        </div>
        <div class="form-actions margin-bottom-0 margin-top-0 padding-top-0 border-top-0">
            <button type="submit" class="btn btn-primary btn-send width-200 margin-top-10">
                <i class="icmn-spinner6 util-spin"></i>
                <template v-if="edit === false">Добавить шаблон</template><template v-else>Сохранить изменения</template>
            </button>
        </div>
    </form>
</template>

<script>
  import { getFromApi } from '~/utils/api'

  let miniToastr

  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    props: ['answerData', 'edit'],
    data: function () {
      return {
        title: '',
        content: '',
        onClient: false
      }
    },
    created: function () {
      if (this.answerData !== undefined && this.answerData !== null) {
        this.title = this.answerData.title
        this.id = this.answerData.id
        this.content = this.answerData.content
      }
    },
    mounted () {
      miniToastr.init()
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
          this.sendMessage(event)
        }
      },
      sendMessage: function (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'createTemplate'
        let module = 'tickets'

        let data = {
          title: self.title,
          content: self.content
        }

        if (self.edit) {
          action = 'editTemplate'
          data.template = self.answerData.id
        }
        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success' && response.data.message === 'template_created_success') {
              self.showMessage({
                title: 'Успех!', message: 'Шаблон создан', type: 'success'
              })
              self.$router.replace('/admin/settings/tickets')
            } else if (response.data.status === 'success' && response.data.message === 'edited_success') {
              self.showMessage({
                title: 'Успех!', message: 'Шаблон был успешно отредактирован', type: 'success'
              })
              self.$router.replace('/admin/settings/tickets')
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