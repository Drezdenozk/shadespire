<template>
    <form @submit.prevent="validateBeforeSubmit($event)" id="form-validation" name="form-validation" method="POST">
        <div class="panel">
            <div class="panel-heading">
                <h5>
                    Основные данные
                </h5>
            </div>
            <div class="panel-body">
                <div class="form-group" v-if="id !== 0">
                    <label class="form-label">ID раздела *</label>
                    <input class="form-control" disabled readonly v-model="id" type="text">
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('title') }">
                    <label class="form-label" for="title" :class="{'has-danger': errors.has('title') }">Заголовок *</label>
                    <input id="title" data-vv-as="Заголовок" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('title') }" name="title" v-model="model.title" type="text">
                    <div class="form-control-error" v-if="errors !== undefined && errors.has('title')">
                        <ul>
                            <li>{{ errors.first('title') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="form-actions">
                <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить раздел</template><template v-else>Сохранить изменения</template></button>
            </div>
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
    created () {
      if (this.data !== undefined) {
        if (this.data.title !== undefined && this.data.title !== null && this.data.title !== '') {
          this.model.title = this.data.title
        }
        if (this.data.id !== undefined && this.data.id !== null && this.data.id !== '') {
          this.id = this.data.id
        }
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
    props: [
      'edit',
      'data'
    ],
    watch: {
    },
    data: function () {
      return {
        id: 0,
        onClient: false,
        model: {
          title: ''
        }
      }
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addToDB(event)
        }
      },
      addToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let module = 'reseller-faq-public'
        let action = 'create'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          title: self.model.title
        }

        if (self.edit !== false) {
          action = 'edit'
          data.faq = self.id
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'faq_create_successs') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Раздел успешно добавлен!',
                  type: 'success'
                })
                self.$router.replace('/panel/faq')
              } else if (response.data.message === 'edit_success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Раздел был успешно отредактирован!',
                  type: 'success'
                })
                self.$router.replace('/panel/faq')
              } else if (response.data.message === 'faq_not_found') {
                self.showMessage({
                  title: 'Ошибка!',
                  message: 'Раздел с id ' + self.id + ' не найден!',
                  type: 'error'
                })
              }
            } else {
              self.showMessage({
                title: 'Ошибка!',
                message: response.data.message,
                type: 'error'
              })
            }
          })
      }
    }
  }
</script>