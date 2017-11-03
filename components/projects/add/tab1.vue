<template>
	<form @submit.prevent="validateBeforeSubmit" id="form-validation" name="form-validation" method="POST" class="row">
		<div class="col-lg-12">
			<div class="panel">
				<div class="panel-heading">
					<h5>
						Основные данные
					</h5>
				</div>
				<div class="panel-body">
					<div class="form-group" :class="{'has-danger': errors.has('name') }">
						<label class="form-label" :class="{'has-danger': errors.has('name') }" for="name">Название проекта</label>
						<input data-vv-as="Название проекта" v-validate="'required'" :class="{'has-danger': errors.has('name') }" name="name" id="name" class="form-control" v-model="projectModel.name" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('name')">
							<ul>
								<li>{{ errors.first('name') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('projectHost') }">
						<label class="form-label" :class="{'has-danger': errors.has('projectHost') }" for="projectHost">Хост</label>
						<input data-vv-as="Хост" v-validate="'required'" :class="{'has-danger': errors.has('projectHost') }" name="projectHost" id="projectHost" class="form-control" v-model="projectModel.projectHost" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('projectHost')">
							<ul>
								<li>{{ errors.first('projectHost') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('description') }">
						<label class="form-label" :class="{'has-danger': errors.has('description') }" for="description">Описание проекта</label>
						<input data-vv-as="Описание проекта" :class="{'has-danger': errors.has('description') }" name="description" id="description" class="form-control" v-model="projectModel.description" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('description')">
							<ul>
								<li>{{ errors.first('description') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('comment') }">
						<label class="form-label" for="comment" :class="{'has-danger': errors.has('comment') }">Комментарий для проекта</label>
						<input data-vv-as="Комментарий для проекта" :class="{'has-danger': errors.has('comment') }" name="comment" id="comment" class="form-control" v-model="projectModel.comment" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('comment')">
							<ul>
								<li>{{ errors.first('comment') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('syscpa') }" v-if="onClient === true">
						<label class="form-label" for="syscpa" :class="{'has-danger': errors.has('syscpa') }">Наша доля от стоимости заказа, в %</label>
						<vue-slider v-model="projectModel.syscpa"></vue-slider>
						<input data-vv-as="Наша доля от стоимости заказа" :class="{'has-danger': errors.has('syscpa') }" name="syscpa" id="syscpa" class="form-control" v-model="projectModel.syscpa" type="hidden">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('syscpa')">
							<ul>
								<li>{{ errors.first('syscpa') }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-12">
			<div class="form-actions">
				<button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить проект</template><template v-else>Сохранить изменения</template></button>
			</div>
		</div>
	</form>
</template>


<script>
  import { getFromApi } from '~/utils/api'

  let miniToastr
  let vueSlider

  if (process.browser) {
    vueSlider = require('vue-slider-component')
    miniToastr = require('mini-toastr')
  }

  export default {
    created () {
      if (this.projectData !== undefined) {
        this.project = this.projectData.id
        if (this.projectData.name !== undefined && this.projectData.name !== null) {
          this.projectModel.name = this.projectData.name
        }
        if (this.projectData.host !== undefined && this.projectData.host !== null) {
          this.projectModel.projectHost = this.projectData.host
        }
        if (this.projectData.description !== undefined && this.projectData.description !== null) {
          this.projectModel.description = this.projectData.description
        }
        if (this.projectData.comment !== undefined && this.projectData.comment !== null) {
          this.projectModel.comment = this.projectData.comment
        }
        if (this.projectData.syscpa !== undefined && this.projectData.syscpa !== null) {
          this.projectModel.syscpa = this.projectData.syscpa
        }
      }
    },
    mounted () {
      this.onClient = true
      miniToastr.init()
    },
    components: {
      vueSlider
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
      'projectData'
    ],
    data: function () {
      return {
        onClient: false,
        project: 0,
        projectModel: {
          name: '',
          projectHost: '',
          description: '',
          comment: '',
          syscpa: 15
        }
      }
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addProjectToDB(event)
        }
      },
      customLabel (option) {
        return `${option.name}`
      },
      addProjectToDB () {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'add'
        let module = 'projects'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          syscpa: (self.projectModel.syscpa !== undefined ? self.projectModel.syscpa : 15),
          projectHost: (self.projectModel.projectHost !== undefined ? (self.projectModel.projectHost).trim() : ''),
          name: (self.projectModel.name !== undefined ? (self.projectModel.name).trim() : ''),
          comment: (self.projectModel.comment !== undefined ? (self.projectModel.comment).trim() : ''),
          description: (self.projectModel.description !== undefined ? (self.projectModel.description).trim() : '')
        }

        if (self.edit !== false) {
          action = 'edit'
          data.id = self.project
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'project_created_success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Проект был успешно добавлен!',
                  type: 'success'
                })
                self.$router.replace('/admin/projects/')
              } else {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Проект был успешно сохранен!',
                  type: 'success'
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