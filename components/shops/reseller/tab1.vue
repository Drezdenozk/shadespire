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
					<div class="form-group" :class="{'has-danger': errors.has('name') }">
						<label class="form-label" for="name">Название магазина *</label>
						<input data-vv-as="Название магазина" v-validate="'required'" :class="{'has-danger': errors.has('name') }" name="name" id="name" class="form-control" v-model="shopModel.name" type="text">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('name')">
							<ul>
								<li>{{ errors.first('name') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" v-if="edit === true && offer !== 0" :class="{'has-danger': errors.has('slug') }">
						<label class="form-label" for="name">Сео-урл *</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-link"></i>
							</span>
							<input data-vv-as="Сео-урл" v-validate="'required'" :class="{'has-danger': errors.has('slug') }" name="slug" id="slug" class="form-control" v-model="shopModel.slug" type="text">
						</div>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('slug')">
							<ul>
								<li>{{ errors.first('slug') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('site') }">
						<label class="form-label" for="site">Сайт *</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-sphere"></i>
							</span>
							<input data-vv-as="Сайт" readonly disabled v-validate="'required'" :class="{'has-danger': errors.has('site') }" name="site" id="site" class="form-control" v-model="shopModel.site" type="url">
						</div>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('site')">
							<ul>
								<li>{{ errors.first('site') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('country') }">
						<label class="form-label" for="country">Доступен в странах *</label>
						<multiselect readonly disabled :class="{'has-danger': errors.has('country') }" id="country" :custom-label="customLabel" placeholder="Укажите хотя-бы одну страну" v-model="shopModel.country" track-by="id" :multiple="true" :options="countryList"></multiselect>

						<input data-vv-as="Доступен в странах" readonly disabled v-validate="'required'" :class="{'has-danger': errors.has('country') }" name="country" v-model="shopModel.country" type="hidden">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('country')">
							<ul>
								<li>{{ errors.first('country') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label" for="categories">Категории магазина</label>
						<multiselect id="categories" :custom-label="customLabel" placeholder="Укажите хотя-бы одну категорию" v-model="shopModel.categories" track-by="id" :multiple="true" :options="categoryList"></multiselect>
					</div>
					<div class="form-group">
						<label class="form-label">Теги</label><br/>
						<input-tag v-if="onClient === true" :tags="shopModel.tags"></input-tag>
						<small>Перечислите теги через "enter"</small>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-4">
			<div class="panel">
				<div class="panel-heading">
					<h5>
						Фотография
					</h5>
				</div>
				<div class="panel-body">
					<div class="media">
						<div class="media-left">
							<template v-if="image === '/278x90_not_loaded.png' || image === '/278x90_not_found.png'">
							  <img style="max-width:278px" class="media-object img-thumbnail" :src="image">
							</template>
							<template v-else>
							  <img style="max-width:278px" class="media-object img-thumbnail" onerror="this.setAttribute('src', '/278x90_not_found.png')" :src="'https://backmy.cash' + image">
							</template>
							<canvas id="shopImageCanvas" style="display: none"/>
						</div>
						<div class="media-body">
							<div class="form-group">
								<dropzone v-if="onClient === true" ref="myUniqueID" id="myUniqueID22" url="/api/ticket/screenshot" :use-custom-dropzone-options="true" :use-font-awesome="true" :auto-process-queue="false" :show-remove-link="false">
									<div class="dz-default dz-message">
										<span><i style="font-size: 32px;" class="fa fa-cloud-upload"></i><br>Перетащите изображения сюда для загрузки</span>
									</div>
								</dropzone>
								<input type="hidden" v-model="shopModel.image">
								<small>Фотография должна быть в пропорции 278 * 90</small>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel">
				<div class="panel-heading">
					<h5>
						Базовые настройки
					</h5>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label class="form-label">У магазина есть:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-primary-outline" :class="{'active' : have_cashback === 1}">
								<input type="checkbox" v-bind:true-value="1" v-bind:false-value="0" v-model="have_cashback">
								Кэшбэк
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : have_promo === 1}">
								<input type="checkbox" v-bind:true-value="1" v-bind:false-value="0" v-model="have_promo">
								Промокоды
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : have_dlinks === 1}">
								<input type="checkbox" v-bind:true-value="1" v-bind:false-value="0" v-model="have_dlinks">
								Диплинки
							</label>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label">Магазин доступен:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('web') !== -1}">
								<input type="checkbox" value="web" readonly disabled v-model="shopModel.onlyfor">
								Web
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('plugin') !== -1}">
								<input type="checkbox" value="plugin" readonly disabled v-model="shopModel.onlyfor">
								Плагины
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('ios') !== -1}">
								<input type="checkbox" value="ios" readonly disabled v-model="shopModel.onlyfor">
								IOS
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('android') !== -1}">
								<input type="checkbox" value="android" readonly disabled v-model="shopModel.onlyfor">
								Android
							</label>
							<label class="btn btn-primary-outline" style="display: none">
								<input type="checkbox" value="mobile" readonly disabled v-model="shopModel.onlyfor">
								Mobile
							</label>
						</div>
					</div>
					<div class="form-group" v-if="edit === true && offer !== 0">
						<label class="form-label">Включен:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default-outline" :class="{'active' : shopModel.available === 0}">
								<input type="radio" v-bind:value="0" v-model.number="shopModel.available">
								Нет
							</label>
							<label class="btn btn-success-outline" :class="{'active' : shopModel.available === 1}">
								<input type="radio" v-bind:value="1" v-model.number="shopModel.available">
								Да
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-12">
			<div class="form-actions">
				<button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить магазин</template><template v-else>Сохранить изменения</template></button>
			</div>
		</div>
	</form>
</template>


<script>
  import InputTag from 'vue-input-tag'
  import Multiselect from 'vue-multiselect'

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
      if (this.offerData !== undefined) {
        if (this.offerData.id !== undefined && this.offerData.id !== null && this.offerData.id !== '') {
          this.offer = this.offerData.id
        }
        if (this.offerData.available !== undefined && this.offerData.available !== null && this.offerData.available !== '') {
          this.shopModel.available = this.offerData.available
        }
        if (this.offerData.image !== undefined && this.offerData.image !== null && this.offerData.image !== '') {
          this.shopModel.image = this.offerData.image
          this.image = this.offerData.image
        }
        if (this.offerData.name !== undefined && this.offerData.name !== null && this.offerData.name !== '') {
          this.shopModel.name = this.offerData.name
        }
        if (this.offerData.slug !== undefined && this.offerData.slug !== null && this.offerData.slug !== '') {
          this.shopModel.slug = this.offerData.slug
        }
        if (this.offerData.site !== undefined && this.offerData.site !== null && this.offerData.site !== '') {
          this.shopModel.site = this.offerData.site
        }
        if (this.offerData.tags !== undefined && this.offerData.tags !== null && this.offerData.tags !== '') {
          this.shopModel.tags = this.offerData.tags.split(',')
        }
        if (this.offerData.have_cashback !== undefined && this.offerData.have_cashback !== null && this.offerData.have_cashback !== '') {
          this.have_cashback = this.offerData.have_cashback
        }
        if (this.offerData.have_dlinks !== undefined && this.offerData.have_dlinks !== null && this.offerData.have_dlinks !== '') {
          this.have_dlinks = this.offerData.have_dlinks
        }
        if (this.offerData.have_promo !== undefined && this.offerData.have_promo !== null && this.offerData.have_promo !== '') {
          this.have_promo = this.offerData.have_promo
        }
        if (this.offerData.onlyfor !== undefined && this.offerData.onlyfor !== null && this.offerData.onlyfor !== '') {
          this.shopModel.onlyfor = this.offerData.onlyfor.split(',')
        }
        if (this.offerData.categories !== undefined && this.offerData.categories !== null && this.offerData.categories !== '') {
          let selectedCategories = this.offerData.categories
          let selectedCategoriesObject = []
          Object.keys(selectedCategories).map(function (key) {
            selectedCategoriesObject.push(selectedCategories[key])
          })
          /*
          Object.keys(selectedCategories).map(function (key) {
            for (let y = 0; y < self.categoryList.length; y++) {
              if (self.categoryList[y].id === parseInt(key, 10)) {
                selectedCategoriesObject.push(self.categoryList[y])
              }
            }
          })
          */
          this.shopModel.categories = selectedCategoriesObject
        }
        if (this.offerData.country !== undefined && this.offerData.country !== null && this.offerData.country !== '') {
          let selectedCountries = this.offerData.country.split(',')
          let selectedCountriesObject = []
          for (let i = 0; i < selectedCountries.length; i++) {
            for (let y = 0; y < this.countryList.length; y++) {
              if (this.countryList[y].code === selectedCountries[i]) {
                selectedCountriesObject.push(this.countryList[y])
              }
            }
          }
          this.shopModel.country = selectedCountriesObject
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
    watch: {
      have_cashback: {
        handler: 'handleUpdateTabs', deep: true
      },
      have_dlinks: {
        handler: 'handleUpdateTabs', deep: true
      },
      have_promo: {
        handler: 'handleUpdateTabs', deep: true
      }
    },
    components: {
      Multiselect,
      dropzone,
      InputTag
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: [
      'providerList',
      'categoryList',
      'countryList',
      'edit',
      'offerData'
    ],
    data: function () {
      return {
        onClient: false,
        offer: 0,
        have_promo: 0,
        have_cashback: 0,
        have_dlinks: 0,
        image: '/278x90_not_loaded.png',
        shopModel: {
          available: 0,
          site: '',
          conf_iframe: 0,
          categories: [],
          country: '',
          name: '',
          have_cashback: 0,
          have_dlinks: 0,
          have_promo: 0,
          onlyfor: ['web', 'ios', 'android', 'mobile'],
          tags: [],
          image: '',
          slug: ''
        }
      }
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addShopToDB(event)
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
              sendImageToCash('https://backmy.cash/shops/upload', pngUrl, '.jpg', true)
                .then((response) => {
                  self.image = response.data
                  self.shopModel.image = response.data
                })
            }
            img.src = e.target.result
          }
          FR.readAsDataURL(temp)
        }
      },
      handleUpdateTabs: function () {
        let self = this
        self.shopModel.have_cashback = self.have_cashback
        self.shopModel.have_promo = self.have_promo
        self.shopModel.have_dlinks = self.have_dlinks
        self.$emit('updateTabs', {
          have_cashback: self.have_cashback,
          have_promo: self.have_promo,
          have_dlinks: self.have_dlinks
        })
      },
      customLabel (option) {
        return `${option.name}`
      },
      addShopToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'editBasics'
        let module = 'reseller-offers-public'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          available: (self.shopModel.available !== undefined ? self.shopModel.available : 0),
          categories: (self.shopModel.categories !== undefined && self.shopModel.categories.length > 0 ? (self.shopModel.categories.map(function (category) { return category.id })) : []),
          conf_iframe: (self.shopModel.conf_iframe !== undefined ? self.shopModel.conf_iframe : 0),
          have_cashback: (self.shopModel.have_cashback !== undefined ? self.shopModel.have_cashback : 0),
          have_dlinks: (self.shopModel.have_dlinks !== undefined ? self.shopModel.have_dlinks : 0),
          have_promo: (self.shopModel.have_promo !== undefined ? self.shopModel.have_promo : 0),
          image: (self.shopModel.image !== undefined ? self.shopModel.image : ''),
          name: (self.shopModel.name !== undefined ? self.shopModel.name : ''),
          slug: (self.shopModel.slug !== undefined ? self.shopModel.slug : ''),
          tags: (self.shopModel.tags !== undefined && self.shopModel.tags.length > 0 ? self.shopModel.tags.join(',') : '')
        }

        if (self.edit !== false) {
          data.offer = self.offer
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              if (response.data.message === 'offer_created' && response.data.id !== undefined) {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Магазин успешно добавлен!',
                  type: 'success'
                })
                self.$router.replace('/admin/shops/edit/' + response.data.id)
              } else {
                self.showMessage({
                  title: 'Успех!',
                  message: 'Магазин успешно обновлен!',
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