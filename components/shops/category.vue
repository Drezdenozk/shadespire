<template>
    <form @submit.prevent="validateBeforeSubmit($event)">
        <div class="form-group" :class="{'has-danger': errors.has('name') }">
            <label class="form-label" :class="{'has-danger': errors.has('name') }" >Название</label>
            <input data-vv-as="Название" :class="{'has-danger': errors.has('name') }" v-validate="'required'" name='name' v-model="name" class="form-control" />
            <div class="form-control-error" v-if="errors !== undefined && errors.has('name')">
                <ul>
                    <li>{{ errors.first('name') }}</li>
                </ul>
            </div>
        </div>
        <div class="form-actions margin-bottom-0 margin-top-0 padding-top-0 border-top-0">
            <button type="submit" class="btn btn-primary btn-send width-200 margin-top-10">
                <i class="icmn-spinner6 util-spin"></i>
                <template v-if="edit === false">Добавить категорию</template><template v-else>Сохранить изменения</template>
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
        name: '',
        content: '',
        onClient: false
      }
    },
    created: function () {
      if (this.answerData !== undefined && this.answerData !== null) {
        this.name = this.answerData.name
        this.id = this.answerData.id
      }
    },
    mounted () {
      miniToastr.init()
    },
    notifications: {
      showMessage: {
        name: '',
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
        let action = 'addCategory'
        let module = 'categories'

        let data = {
          name: self.name
        }

        if (self.edit) {
          action = 'updateCategory'
          data.category = self.answerData.id
        }
        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success' && response.data.message === 'category_created_successfully') {
              self.showMessage({
                name: 'Успех!', message: 'Категория создана', type: 'success'
              })
              self.$router.replace('/admin/shops/categories')
            } else if (response.data.status === 'success' && response.data.message === 'category_updated_successfully') {
              self.showMessage({
                name: 'Успех!', message: 'Категория была успешно отредактирована', type: 'success'
              })
              self.$router.replace('/admin/shops/categories')
            } else {
              self.showMessage({
                name: 'Ошибка!', message: response.data.message, type: 'error'
              })
            }
          })
      }
    }
  }
</script>