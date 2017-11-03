<template>
    <section>
        <div class="row">
            <div :class="{'col-lg-8': !edit, 'col-lg-12': edit}">
                <form @submit.prevent="validateBeforeSubmit($event)" id="form-validation" name="form-validation" method="POST">
                    <div class="panel">
                        <div class="panel-heading">
                            <h5>
                                Основные данные
                            </h5>
                        </div>
                        <div class="panel-body">
                            <div class="form-group" :class="{'has-danger': errors.has('title') }">
                                <label class="form-label" for="title" :class="{'has-danger': errors.has('title') }">Название рассылки *</label>
                                <input :readonly="edit" id="title" data-vv-as="Заголовок" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('title') }" name="title" v-model="mailsModel.title" type="text">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('title')">
                                    <ul>
                                        <li>{{ errors.first('title') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="!edit" class="form-group" :class="{'has-danger': errors.has('templates') }">
                                <label class="form-label"  :class="{'has-danger': errors.has('templates') }" for="templates">Шаблон письма *</label>
                                <multiselect id="templates" :class="{'has-danger': errors.has('templates') }" :custom-label="customLabel" placeholder="Укажите хотя-бы один шаблон" v-model="selectedTemplate" track-by="id" :multiple="false" :options="parsedTemplates"></multiselect>

                                <input data-vv-as="Шаблон письма" v-validate="'required'" name='templates' v-model="selectedTemplate" type="hidden">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('templates')">
                                    <ul>
                                        <li>{{ errors.first('templates') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" v-if="edit">
                                <label class="form-label">Создана</label>
                                <input :readonly="edit" class="form-control" v-model="mailsModel.createdAt" type="text">
                            </div>
                            <div class="form-group" v-if="edit">
                                <label class="form-label">Автор</label>
                                <input :readonly="edit" class="form-control" v-model="mailsModel.createdBy.name" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading">
                            <h5>
                                Выборка пользователей
                            </h5>
                        </div>
                        <div class="panel-body">
                            <div class="form-group" :class="{'has-danger': errors.has('registeredby') }">
                                <label class="form-label" :class="{'has-danger': errors.has('registeredby') }">Проект *</label>
                                <multiselect v-if="!edit" id="registeredby" :class="{'has-danger': errors.has('registeredby') }" :custom-label="customLabel" placeholder="Укажите хотя-бы один проект" v-model="mailsModel.registeredby" track-by="id" :multiple="true" :options="usersList"></multiselect>
                                <input v-if="!edit" data-vv-as="Список пользователей" v-validate="'required'" name='registeredby' v-model="mailsModel.registeredby" type="hidden">
                                <input :readonly="edit" v-if="edit" data-vv-as="Список пользователей" v-validate="'required'" name='registeredby' v-model="mailsModel.registeredby" class="form-control" type="text">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('registeredby')">
                                    <ul>
                                        <li>{{ errors.first('registeredby') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('created') }">
                                <label class="form-label" :class="{'has-danger': errors.has('created') }">Период регистрации с *</label>
                                <input v-if="!edit" class="form-control" type="date" v-model="mailsModel.created">
                                <input v-if="edit" :readonly="edit" data-vv-as="Период регистрации с" class="form-control" :class="{'has-danger': errors.has('created') }" name="created" v-model="mailsModel.created" type="text">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('created')">
                                    <ul>
                                        <li>{{ errors.first('created') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('created2') }">
                                <label class="form-label" :class="{'has-danger': errors.has('created2') }">Период регистрации по *</label>
                                <input v-if="!edit" class="form-control" type="date" v-model="mailsModel.created2">
                                <input v-if="edit" :readonly="edit" data-vv-as="Период регистрации по" class="form-control" :class="{'has-danger': errors.has('created2') }" name="created2" v-model="mailsModel.created2" type="text">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('created2')">
                                    <ul>
                                        <li>{{ errors.first('created2') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('last_signin') }">
                                <label class="form-label" :class="{'has-danger': errors.has('last_signin') }">Последняя активность *</label>
                                <input v-if="edit" :readonly="edit" data-vv-as="Последняя активность" class="form-control" :class="{'has-danger': errors.has('last_signin') }" name="last_signin" v-model.number="mailsModel.last_signin" type="number" min="0">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('last_signin')">
                                    <ul>
                                        <li>{{ errors.first('last_signin') }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading">
                            <h5>
                                Содержимое письма
                            </h5>
                        </div>
                        <div class="panel-body">
                            <div class="form-group" :class="{'has-danger': errors.has('name') }">
                                <label class="form-label" for="title" :class="{'has-danger': errors.has('name') }">Заголовок письма *</label>
                                <input :readonly="edit" id="name" data-vv-as="Название" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('name') }" name="name" v-model="mailsModel.subject" type="text">
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('name')">
                                    <ul>
                                        <li>{{ errors.first('name') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('content') }">
                                <label class="form-label" for="content" :class="{'has-danger': errors.has('content') }">HTML содержимое *</label>
                                <textarea :readonly="edit" style="min-height: 681px" id="content" data-vv-as="HTML содержимое" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('content') }" name="content" v-model="mailsModel.content"></textarea>
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('content')">
                                    <ul>
                                        <li>{{ errors.first('content') }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions" v-if="edit !== true">
                        <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить рассылку</template><template v-else>Сохранить изменения</template></button>
                    </div>
                </form>
            </div>
            <div v-if="edit !== true" :class="{'col-lg-4': !edit, 'col-lg-12': edit}">
                <templateVariables></templateVariables>
                <templateTest :content="mailsModel.content"></templateTest>
            </div>
        </div>
    </section>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import templateVariables from '~/components/mails/variables.vue'
  import templateTest from '~/components/mails/test.vue'
  import { getFromApi } from '~/utils/api'
  import moment from 'moment'

  let miniToastr

  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    created () {
      let self = this
      self.parsedTemplates = Object.keys(self.templates).map(function (item) {
        return {
          id: item,
          name: self.templates[item]
        }
      })

      if (this.mailData !== undefined) {
        if (this.mailData.title !== undefined && this.mailData.title !== null) {
          this.mailsModel.title = this.mailData.title
        }
        if (this.mailData.subject !== undefined && this.mailData.subject !== null) {
          this.mailsModel.subject = this.mailData.subject
        }
        if (this.mailData.content !== undefined && this.mailData.content !== null) {
          this.mailsModel.content = this.mailData.content
        }
        if (this.mailData.params.registeredby !== undefined && this.mailData.params.registeredby !== null) {
          let temp = this.usersList.map(function (item) {
            if (parseInt(item.id) === parseInt(self.mailData.params.registeredby, 10)) {
              return item.name
            }
          })
          this.mailsModel.registeredby = temp[0]
        }
        if (this.mailData.params.created !== undefined && this.mailData.params.created !== null) {
          this.mailsModel.created = this.mailData.params.created
        }
        if (this.mailData.params.last_signin !== undefined && this.mailData.params.last_signin !== null) {
          this.mailsModel.last_signin = this.mailData.params.last_signin
        }
        if (this.mailData.params.created !== undefined && this.mailData.params.created !== null) {
          this.mailsModel.created = this.mailData.params.created[0]
          this.mailsModel.created2 = this.mailData.params.created[1]
        }
        if (this.mailData.createdAt !== undefined && this.mailData.createdAt !== null) {
          this.mailsModel.createdAt = this.mailData.createdAt
        }
        if (this.mailData.createdBy !== undefined && this.mailData.createdBy !== null) {
          this.mailsModel.createdBy = this.mailData.createdBy
        }
      }
    },
    mounted () {
      miniToastr.init()
    },
    components: {
      Multiselect,
      templateVariables,
      templateTest
    },
    watch: {
      selectedTemplate: function (val) {
        this.mailsModel.letter_template = val.id
        this.getTemplate(val.id)
      }
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: [
      'templates',
      'edit',
      'templateData',
      'usersList',
      'mailData'
    ],
    data: function () {
      return {
        mails: 0,
        parsedTemplates: [],
        selectedTemplate: '',
        mailsModel: {
          letter_template: '',
          title: '',
          registeredby: '',
          created: '',
          created2: '',
          content: '',
          subject: '',
          last_signin: ''
        }
      }
    },
    methods: {
      customLabel (option) {
        return `${option.name}`
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addMailsToDB(event)
        }
      },
      getTemplate (id) {
        let self = this
        getFromApi(undefined, 'mailing', 'getTemplate', {id: id})
          .then((response) => {
            if (response.data.status === 'success') {
              self.mailsModel.content = response.data.message.content
            } else {
              self.showMessage({
                title: 'Ошибка!',
                message: response.data.message,
                type: 'error'
              })
            }
          })
      },
      addMailsToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'create'
        let module = 'mailing'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          title: self.mailsModel.title,
          registeredby: (self.mailsModel.registeredby).map(function (item) { return item.id }),
          letter_template: parseInt(self.mailsModel.letter_template, 10),
          content: self.mailsModel.content,
          subject: self.mailsModel.subject
        }

        if (self.mailsModel.created !== '' && self.mailsModel.created2 !== '') {
          data.created = [
            moment(self.mailsModel.created, 'YYYY-MM-DD').format('DD.MM.YYYY'),
            moment(self.mailsModel.created2, 'YYYY-MM-DD').format('DD.MM.YYYY')
          ]
        }

        if (self.mailsModel.last_signin !== '' && self.mailsModel.last_signin !== 0) {
          data.last_signin = self.mailsModel.last_signin
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Рассылка успешно добавлена!',
                type: 'success'
              })
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