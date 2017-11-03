<template>
	<form @submit.prevent="validateBeforeSubmit" id="form-validation" name="form-validation" method="POST" class="row">
		<div class="col-lg-8">
			<div class="panel">
				<div class="panel-heading">
					<h5>
						Основные данные
					</h5>
				</div>
				<div class="panel-body">
					<div class="form-group" :class="{'has-danger': errors.has('secondname') }">
						<label class="form-label" :class="{'has-danger': errors.has('secondname') }" for="secondname">Фамилия</label>
						<input data-vv-as="Фамилия" v-validate="'alpha'" :class="{'has-danger': errors.has('secondname') }" name="secondname" id="secondname" class="form-control" v-model="userModel.secondName" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('secondname')">
							<ul>
								<li>{{ errors.first('secondname') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('firstname') }">
						<label class="form-label" :class="{'has-danger': errors.has('firstname') }" for="firstname">Имя</label>
						<input data-vv-as="Имя" v-validate="'alpha'" :class="{'has-danger': errors.has('firstname') }" name="firstname" id="firstname" class="form-control" v-model="userModel.firstName" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('firstname')">
							<ul>
								<li>{{ errors.first('firstname') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('thirdname') }">
						<label class="form-label" :class="{'has-danger': errors.has('thirdname') }" for="thirdname">Отчество</label>
						<input data-vv-as="Отчество" v-validate="'alpha'" :class="{'has-danger': errors.has('thirdname') }" name="thirdname" id="thirdname" class="form-control" v-model="userModel.thirdName" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('thirdname')">
							<ul>
								<li>{{ errors.first('thirdname') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('birthday') }">
						<label class="form-label" for="birthday" :class="{'has-danger': errors.has('birthday') }">Дата рождения</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-calendar"></i>
							</span>
							<input data-vv-as="Дата рождения" v-mask="'##.##.####'" v-validate="'date_format:DD.MM.YYYY'" placeholder="23.09.1999" name='birthday' id="birthday" class="form-control"  :class="{'has-danger': errors.has('birthday') }" v-model="birthday" type="text">
							<div class="form-control-error" v-if="errors !== undefined && errors.has('birthday')">
								<ul>
									<li>{{ errors.first('birthday') }}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('email_field') }">
						<label class="form-label" :class="{'has-danger': errors.has('email_field') }" for="email">E-mail *</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-mail2"></i>
							</span>
							<input data-vv-as="E-mail" v-validate="'email|required'" name='email_field' id="email" :class="{'has-danger': errors.has('email_field') }" class="form-control" v-model="userModel.email" type="email">
							<div class="form-control-error" v-if="errors !== undefined && errors.has('email_field')">
								<ul>
									<li>{{ errors.first('email_field') }}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('phones') }">
						<label class="form-label" for="phones" :class="{'has-danger': errors.has('phones') }">Телефон</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-phone"></i>
							</span>
							<input data-vv-as="Телефон" placeholder="79111234567" v-mask="'###########'" id="phones" v-validate="'digits:11'" name="phones" class="form-control" :class="{'has-danger': errors.has('phones') }" v-model="userModel.phone" type="text">
							<div class="form-control-error" v-if="errors !== undefined && errors.has('phones')">
								<ul>
									<li>{{ errors.first('phones') }}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Пол:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-primary-outline" :class="{'active' : userModel.sex === 'M'}">
								<input type="radio" value="M" v-model="userModel.sex">
								Муж.
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : userModel.sex === 'F'}">
								<input type="radio" value="F" v-model="userModel.sex">
								Жен.
							</label>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Активирован:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default-outline" :class="{'active' : !userModel.activated}">
								<input type="radio" v-bind:value="0" v-model="userModel.activated">
								Нет
							</label>
							<label class="btn btn-danger-outline" :class="{'active' : userModel.activated}">
								<input type="radio" v-bind:value="1" v-model="userModel.activated">
								Да
							</label>
						</div>
					</div>
				</div>
			</div>

			<div class="panel" v-if="edit === true">
				<div class="panel-heading">
					<h5>
						Фотография
					</h5>
				</div>
				<div class="panel-body">
					<div class="media">
						<div class="media-left">
							<template v-if="image === '/278x278_not_loaded.png' || image === '/278x278_not_found.png'">
								<img style="max-width:278px" class="media-object img-thumbnail" :src="image">
							</template>
							<template v-else>
								<img style="max-width:278px" class="media-object img-thumbnail" onerror="this.setAttribute('src', '/278x90_not_found.png')" :src="'https://backmy.cash' + image">
							</template>
							<canvas id="shopImageCanvas" style="display: none"/>
						</div>
						<div class="media-body">
							<dropzone v-if="onClient === true" ref="myUniqueID" id="myUniqueID22" url="/users/upload" :use-custom-dropzone-options="true" :use-font-awesome="true" :auto-process-queue="false" :show-remove-link="false">
								<div class="dz-default dz-message">
									<span><i style="font-size: 32px;" class="fa fa-cloud-upload"></i><br>Перетащите изображения сюда для загрузки</span>
								</div>
							</dropzone>
							<input type="hidden" v-model="userModel.avatar">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-4">
			<div class="panel" v-if="edit !== true">
				<div class="panel-heading">
					<h5>
						Фотография
					</h5>
				</div>
				<div class="panel-body">
					<div class="media">
						<div class="media-left">
							<template v-if="image === '/278x278_not_loaded.png' || image === '/278x278_not_found.png'">
							  <img style="max-width:278px" class="media-object img-thumbnail" :src="image">
							</template>
							<template v-else>
							  <img style="max-width:278px" class="media-object img-thumbnail" onerror="this.setAttribute('src', '/278x90_not_found.png')" :src="'https://backmy.cash' + image">
							</template>
							<canvas id="shopImageCanvas" style="display: none"/>
						</div>
						<div class="media-body">
							<dropzone v-if="onClient === true" ref="myUniqueID" id="myUniqueID22" url="/users/upload" :use-custom-dropzone-options="true" :use-font-awesome="true" :auto-process-queue="false" :show-remove-link="false">
								<div class="dz-default dz-message">
									<span><i style="font-size: 32px;" class="fa fa-cloud-upload"></i><br>Перетащите изображения сюда для загрузки</span>
								</div>
							</dropzone>
							<input type="hidden" v-model="userModel.avatar">
						</div>
					</div>
				</div>
			</div>
			<div class="panel" v-if="edit === true">
				<div class="panel-heading">
					<h5>
						Системная информация
					</h5>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label class="form-label" for="project">Проект</label>
						<input name='project' class="form-control" :value="registeredby.name" type="text" readonly>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('groups') }" v-if="edit === true">
						<label class="form-label" :class="{'has-danger': errors.has('groups') }">Права *</label>
						<multiselect :custom-label="customLabel" :class="{'has-danger': errors.has('groups') }" placeholder="Укажите хотя-бы одно право" v-model="groups" track-by="id" :multiple="true" :options="groupsList"></multiselect>

						<select data-vv-as="Права" v-validate="'required'" name='groups' v-model="groups" style="display: none;">
							<template v-for="group in groupsList">
								<option :value="group.id">{{group.name}}</option>
							</template>
						</select>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('groups')">
							<ul>
								<li>{{ errors.first('groups') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label" for="project">UID</label>
						<input name='project' class="form-control" :value="userModel.uid" type="text" readonly>
					</div>
					<div class="form-group">
						<label class="form-label" for="project">ID</label>
						<input name='project' class="form-control" :value="userModel.id" type="text" readonly>
					</div>
					<div class="form-group">
						<label class="form-label" for="project">Зарегистрирован</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-calendar"></i>
							</span>
							<input name='project' class="form-control" :value="userModel.created" type="text" readonly>
						</div>
					</div>
					<div class="form-group" v-if="userModel.referedBy.id !== null">
						<label class="form-label" for="project">Привел</label>
						<nuxt-link :to="'/admin/users/edit/' + userModel.referedBy.id">
							<div class="form-control readonly">{{userModel.referedBy.email}}</div>
						</nuxt-link>
					</div>
					<div class="form-group">
						<label class="form-label" for="project">Реф. ссылка</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-link"></i>
							</span>
							<input name='project' class="form-control" :value="userModel.ref_link" type="text" readonly>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label" for="project">Реф. код</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-code"></i>
							</span>
							<input name='project' class="form-control" :value="userModel.ref_code" type="text" readonly>
						</div>
					</div>
				</div>
			</div>
			<div class="panel">
				<div class="panel-heading">
					<h5 v-if="edit === false">
						Технические данные
					</h5>
					<h5 v-else>
						Изменить пароль
					</h5>
				</div>
				<div class="panel-body">
					<div class="form-group" :class="{'has-danger': errors.has('project') }" v-if="edit !== true">
						<label class="form-label" for="project">Проект *</label>
						<multiselect id="project" :custom-label="customLabel" :class="{'has-danger': errors.has('project') }" placeholder="Укажите проект" v-model="registeredby" track-by="id" :multiple="false" :options="projectsList"></multiselect>

						<input data-vv-as="Проект" v-validate="'required'" name='project' v-model="registeredby" type="hidden">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('project')">
							<ul>
								<li>{{ errors.first('project') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('groups') }" v-if="edit !== true">
						<label class="form-label" for="rules" :class="{'has-danger': errors.has('groups') }">Права *</label>
						<multiselect id="rules" :custom-label="customLabel" :class="{'has-danger': errors.has('groups') }" placeholder="Укажите хотя-бы одно право" v-model="groups" track-by="id" :multiple="true" :options="groupsList"></multiselect>

						<select data-vv-as="Права" v-validate="'required'" name='groups' v-model="groups" style="display: none;">
							<template v-for="group in groupsList">
								<option :value="group.id">{{group.name}}</option>
							</template>
						</select>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('groups')">
							<ul>
								<li>{{ errors.first('groups') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('confirm_field') }">
						<label class="form-label" :class="{'has-danger': errors.has('confirm_field') }" for="password1">Пароль</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-lock"></i>
							</span>
							<input data-vv-as="Пароль" v-validate="'confirmed:pw_confirm'" id="password1" name="confirm_field" class="form-control" :class="{'has-danger': errors.has('confirm_field') }" v-model="password1" type="password">
							<div class="form-control-error" v-if="errors !== undefined && errors.has('confirm_field')">
								<ul>
									<li>{{ errors.first('confirm_field') }}</li>
								</ul>
							</div>
						</div>
						<small>Если оставить это поле пустым - пароль будет сгенерирован автоматически</small>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('confirm_field') }" v-show="password1.length > 0">
						<label class="form-label" :class="{'has-danger': errors.has('confirm_field') }" for="password2">Повторите пароль</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-lock"></i>
							</span>
							<input data-vv-as="повторным вводом" name="pw_confirm" id="password2" class="form-control" :class="{'has-danger': errors.has('confirm_field') }" v-model="password2" type="password">
						</div>
					</div>
					<div class="form-actions" v-if="edit === true">
						<button type="button" v-on:click="changePassword($event)" :disabled="password1.length === 0 || errors.has('confirm_field')" class="btn btn-info"><i class="icmn-spinner6 util-spin"></i>Изменить пароль</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-12">
			<div class="form-actions">
				<button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить пользователя</template><template v-else>Сохранить изменения</template></button>
			</div>
		</div>
	</form>
</template>


<script>
  import Multiselect from 'vue-multiselect'
  import moment from 'moment'

  import { getFromApi, sendImageToCash } from '~/utils/api'

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
    created () {
      if (this.userData !== undefined) {
        if (this.userData.id !== undefined && this.userData.id !== null && this.userData.id !== '') {
          this.user = this.userData.id
        }
        if (this.userData.email !== undefined && this.userData.email !== null && this.userData.email !== '') {
          this.userModel.email = this.userData.email
        }
        if (this.userData.firstName !== undefined && this.userData.firstName !== null && this.userData.firstName !== '') {
          this.userModel.firstName = this.userData.firstName
        }
        if (this.userData.secondName !== undefined && this.userData.secondName !== null && this.userData.secondName !== '') {
          this.userModel.secondName = this.userData.secondName
        }
        if (this.userData.thirdName !== undefined && this.userData.thirdName !== null && this.userData.thirdName !== '') {
          this.userModel.thirdName = this.userData.thirdName
        }
        if (this.userData.phone !== undefined && this.userData.phone !== null && this.userData.phone !== '') {
          this.userModel.phone = this.userData.phone
        }
        if (this.userData.sex !== undefined && this.userData.sex !== null && this.userData.sex !== '') {
          this.userModel.sex = this.userData.sex
        }
        if (this.userData.activated !== undefined && this.userData.activated !== null && this.userData.activated !== '') {
          this.userModel.activated = this.userData.activated
        }
        if (this.userData.birth_day !== undefined && this.userData.birth_day !== null && this.userData.birth_day !== '') {
          this.userModel.birth_day = this.userData.birth_day
        }
        if (this.userData.birth_month !== undefined && this.userData.birth_month !== null && this.userData.birth_month !== '') {
          this.userModel.birth_month = this.userData.birth_month
        }
        if (this.userData.birth_year !== undefined && this.userData.birth_year !== null && this.userData.birth_year !== '') {
          this.userModel.birth_year = this.userData.birth_year
        }
        if (this.userModel.birth_year !== '' && this.userModel.birth_day !== '' && this.userModel.birth_month !== '') {
          this.birthday = moment((this.userModel.birth_day + '.' + this.userModel.birth_month + '.' + this.userModel.birth_year), 'D.M.YYYY').format('DD.MM.YYYY')
        }
        if (this.userData.groups !== undefined && this.userData.groups !== null && Object.keys(this.userData.groups).length > 0) {
          let self = this
          Object.keys(self.userData.groups).map(function (key) {
            let tempObject = self.userData.groups[key]
            tempObject.isHidden = 0
            self.groups.push(tempObject)
            self.userModel.groups.push(tempObject.id)
          })
        }
        if (this.userData.registeredBy !== undefined && this.userData.registeredBy !== null && this.userData.registeredBy !== '') {
          if (this.projectsList.length > 0) {
            for (let i = 0; i < this.projectsList.length; i++) {
              if (this.projectsList[i].id === this.userData.registeredBy) {
                this.registeredby = this.projectsList[i]
                this.userModel.registeredBy = this.userData.registeredBy
              }
            }
          }
        }
        if (this.userData.uid !== undefined && this.userData.uid !== null && this.userData.uid !== '') {
          this.userModel.uid = this.userData.uid
        }
        if (this.userData.id !== undefined && this.userData.id !== null && this.userData.id !== '') {
          this.userModel.id = this.userData.id
        }
        if (this.userData.ref_code !== undefined && this.userData.ref_code !== null && this.userData.ref_code !== '') {
          this.userModel.ref_code = this.userData.ref_code
        }
        if (this.userData.ref_link !== undefined && this.userData.ref_link !== null && this.userData.ref_link !== '') {
          this.userModel.ref_link = this.userData.ref_link
        }
        if (this.userData.created !== undefined && this.userData.created !== null && this.userData.created !== '') {
          this.userModel.created = moment(this.userData.created, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
        }
        if (this.userData.avatar !== undefined && this.userData.avatar !== null && this.userData.avatar !== '') {
          this.userModel.avatar = this.userData.avatar
          this.image = this.userData.avatar
        }
        if (this.userData.referedBy !== undefined && this.userData.referedBy !== null && this.userData.referedBy.id !== undefined) {
          this.userModel.referedBy = this.userData.referedBy
        }
      }
    },
    mounted () {
      this.onClient = true
      miniToastr.init()
      let self = this
      setTimeout(function () {
        if (document.querySelector('#myUniqueID22') !== null) {
          document.querySelector('#myUniqueID22').dropzone.on('addedfile', function (file) {
            self.uploadAvatar(file)
          })
        }
      }, 2000)
    },
    components: {
      Multiselect,
      dropzone
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: [
      'groupsList',
      'projectsList',
      'edit',
      'userData'
    ],
    data: function () {
      return {
        onClient: false,
        user: 0,
        image: '/278x278_not_loaded.png',
        password1: '',
        password2: '',
        birthday: '',
        registeredby: '',
        groups: [],
        userModel: {
          groups: [],
          secondName: '',
          firstName: '',
          thirdName: '',
          email: '',
          phone: '',
          sex: 'M',
          activated: 0,
          passwd: '',
          birth_day: '',
          birth_month: '',
          birth_year: '',
          avatar: ''
        }
      }
    },
    methods: {
      changePassword (event) {
        if (this.password1.length > 0) {
          let self = this
          this.$validator.validateAll({
            confirm_field: this.password1,
            pw_confirm: this.password2
          }).then((result) => {
            if (result) {
              let button = (event.currentTarget)
              let action = 'editPasswd'
              let module = 'users'

              button.classList.add('on-ajax')
              button.setAttribute('disabled', 'disabled')

              let data = {
                user: self.user,
                passwd: self.password1
              }

              getFromApi(undefined, module, action, data)
                .then((response) => {
                  button.classList.remove('on-ajax')
                  button.removeAttribute('disabled')

                  if (response.data.message === 'passwd_update_success') {
                    self.showMessage({
                      title: 'Успех!',
                      message: 'Пароль успешно изменен!',
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
          })
        }
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          if (this.password1.length > 0) {
            this.userModel.passwd = this.password1
          }
          if (this.birthday.length > 0 && (this.birthday.split('.')).length === 3) {
            let value = this.birthday.split('.')
            if (value.length === 3) {
              this.userModel.birth_day = value[0]
              this.userModel.birth_month = value[1]
              this.userModel.birth_year = value[2]
            }
          }
          if (this.registeredby.id !== undefined && this.registeredby.id !== null && this.registeredby.id > 0) {
            this.userModel.registeredby = this.registeredby.id
          }
          if (this.groups.length > 0) {
            this.userModel.groups = (this.groups).map(function (group) { return parseInt(group.id, 10) })
          }
          this.addUserToDB(event)
        }
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
              sendImageToCash('https://backmy.cash/users/upload', pngUrl, '.jpg', true)
                .then((response) => {
                  self.image = response.data
                  self.userModel.avatar = response.data
                })
            }
            img.src = e.target.result
          }
          FR.readAsDataURL(temp)
        }
      },
      customLabel (option) {
        return `${option.name}`
      },
      addUserToDB () {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'add'
        let module = 'users'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          secondname: (self.userModel.secondName !== undefined ? (self.userModel.secondName).trim() : ''),
          firstname: (self.userModel.firstName !== undefined ? (self.userModel.firstName).trim() : ''),
          thirdname: (self.userModel.thirdName !== undefined ? (self.userModel.thirdName).trim() : ''),
          sex: (self.userModel.sex !== undefined ? self.userModel.sex : ''),
          email: (self.userModel.email !== undefined ? (self.userModel.email).trim() : ''),
          phone: (self.userModel.phone !== undefined ? self.userModel.phone : ''),
          birth_day: (self.userModel.birth_day !== undefined ? self.userModel.birth_day : ''),
          birth_month: (self.userModel.birth_month !== undefined ? self.userModel.birth_month : ''),
          birth_year: (self.userModel.birth_year !== undefined ? self.userModel.birth_year : ''),
          activated: (self.userModel.activated !== undefined ? self.userModel.activated : ''),
          groups: (self.userModel.groups !== undefined ? self.userModel.groups : []),
          registeredby: (self.userModel.registeredby !== undefined ? self.userModel.registeredby : ''),
          avatar: (self.userModel.avatar !== undefined ? self.userModel.avatar : '')
        }

        if (self.userModel.passwd !== undefined && self.userModel.passwd !== null && self.userModel.passwd.length > 0 && !self.edit) {
          data.passwd = self.userModel.passwd
        }

        if ((data.groups).indexOf(3) !== -1) {
          data.project = data.registeredby
        } else {
          data.project = 0
        }

        if (self.edit !== false) {
          action = 'edit'
          data.user = self.user
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'user_create_success') {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Пользователь успешно добавлен!',
                  type: 'success'
                })
                self.$router.replace('/admin/users')
              } else {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Пользователь успешно обновлен!',
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