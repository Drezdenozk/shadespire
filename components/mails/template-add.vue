<template>
    <form @submit.prevent="validateBeforeSubmit($event)" id="form-validation" name="form-validation" method="POST">
        <div class="panel">
            <div class="panel-heading">
                <h5>
                    Шаблон
                </h5>
            </div>
            <div class="panel-body">
                <div class="form-group" :class="{'has-danger': errors.has('name') }">
                    <label class="form-label" for="title" :class="{'has-danger': errors.has('name') }">Название *</label>
                    <input id="title" data-vv-as="Название" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('name') }" name="name" v-model="templateModel.name" type="text">
                    <div class="form-control-error" v-if="errors !== undefined && errors.has('name')">
                        <ul>
                            <li>{{ errors.first('name') }}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('content') }">
                    <label class="form-label" for="content" :class="{'has-danger': errors.has('content') }">HTML содержимое *</label>
                    <textarea style="min-height: 681px" id="content" data-vv-as="HTML содержимое" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('content') }" name="content" v-model="templateModel.content"></textarea>
                    <div class="form-control-error" v-if="errors !== undefined && errors.has('content')">
                        <ul>
                            <li>{{ errors.first('content') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Сохранить шаблон</template><template v-else>Сохранить изменения</template></button>
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
      if (this.templateData !== undefined) {
        this.templateModel.name = this.templateData.name
        this.templateModel.content = this.templateData.content
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
      'templateData',
      'id',
      'edit'
    ],
    data: function () {
      return {
        template: 0,
        templateModel: {
          name: '',
          content: ''
        }
      }
    },
    watch: {
      templateModel: {
        handler: 'handleUpdateContent', deep: true
      }
    },
    methods: {
      handleUpdateContent: function () {
        this.$emit('updateContent', this.templateModel.content)
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addTemplateToDB(event)
        }
      },
      addTemplateToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'addNews'
        let module = 'news'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          name: self.templateModel.name,
          content: self.templateModel.content
        }

        if (self.edit !== false) {
          action = 'updateNews'
          data.id = self.template
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'news_created_successfully') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Новость успешно добавлена!',
                  type: 'success'
                })
                if (response.data.id !== undefined) {
                  self.$router.replace('/admin/news/edit/' + response.data.id)
                } else {
                  self.$router.replace('/admin/news')
                }
              } else if (response.data.message === 'news_updated_successfully') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Новость была успешно отредактирована!',
                  type: 'success'
                })
              } else if (response.data.message === 'news_not_found') {
                self.showMessage({
                  title: 'Ошибка!',
                  message: 'Новость с id ' + self.shopModel.news.id + ' не найдена!',
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