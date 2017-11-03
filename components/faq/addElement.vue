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
                <div class="form-group" v-if="model.id !== 0">
                    <label class="form-label">ID записи *</label>
                    <input class="form-control" disabled readonly v-model="model.id" type="text">
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
                <div class="form-group">
                    <label class="form-label">Текст *</label>
                    <tiny-mce id="full_desc" :uploadBase="uploadBase" :uploadDir="uploadDir" v-model="model.text" :toolbar="toolbar"></tiny-mce>
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
        if (this.data.text !== undefined && this.data.text !== null && this.data.text !== '') {
          this.model.text = this.data.text
        }
        if (this.data.id !== undefined && this.data.id !== null && this.data.id !== '') {
          this.model.id = this.data.id
        }
      }
    },
    mounted () {
      miniToastr.init()
      this.onClient = true
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
      'data',
      'id'
    ],
    watch: {
    },
    data: function () {
      return {
        onClient: false,
        uploadBase: 'https://backmy.cash',
        uploadDir: '/news/upload',
        toolbar: 'bold italic underline strikethrough alignleft aligncenter alignright alignjustify alignnone styleselect fontselect fontsizeselect cut copy paste outdent indent blockquote undo redo removeformat hr bullist numlist link unlink openlink image charmap pastetext anchor searchreplace visualblocks visualchars code insertdatetime nonbreaking table imageoptions backcolor forecolor',
        model: {
          id: 0,
          text: '',
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
        let action = 'createItem'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          title: self.model.title,
          text: self.model.text,
          faq: self.id
        }

        if (self.edit !== false) {
          action = 'editItem'
          data.item = self.model.id
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'entry_create_success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Элемент успешно добавлен!',
                  type: 'success'
                })
                self.$router.replace('/panel/faq/view/' + self.id)
              } else if (response.data.message === 'edit_success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Элемент был успешно отредактирован!',
                  type: 'success'
                })
                self.$router.replace('/panel/faq/view/' + self.id)
              } else if (response.data.message === 'entry_not_found') {
                self.showMessage({
                  title: 'Ошибка!',
                  message: 'Элемент с id ' + self.id + ' не найден!',
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