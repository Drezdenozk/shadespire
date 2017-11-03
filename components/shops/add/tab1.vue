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
					<div class="form-group" :class="{'has-danger': errors.has('aggregator') }">
						<label class="form-label" for="aggregator">Провайдер *</label>
						<multiselect :class="{'has-danger': errors.has('aggregator') }" id="aggregator" :custom-label="customLabel" placeholder="Укажите провайдер" v-model="shopModel.aggregator" track-by="id" :multiple="false" :options="providerList"></multiselect>

						<input data-vv-as="Провайдер" v-validate="'required'" :class="{'has-danger': errors.has('aggregator') }" name="aggregator" v-model="shopModel.aggregator" type="hidden">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('aggregator')">
							<ul>
								<li>{{ errors.first('aggregator') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" v-if="edit === true && offer !== 0" :class="{'has-danger': errors.has('sid') }">
						<label class="form-label" for="sid">Внешний ID оффера *</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-key"></i>
							</span>
							<input data-vv-as="Внешний ID оффера" v-validate="'required'" :class="{'has-danger': errors.has('sid') }" name="sid" id="sid" class="form-control" v-model="shopModel.sid" type="text">
						</div>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('sid')">
							<ul>
								<li>{{ errors.first('sid') }}</li>
							</ul>
						</div>
						<small>Уникальный ID оффера у провайдера (используется для проверок доступности и т.д.)</small>
					</div>
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
							<input data-vv-as="Сайт" v-validate="'required'" :class="{'has-danger': errors.has('site') }" name="site" id="site" class="form-control" v-model="shopModel.site" type="url">
						</div>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('site')">
							<ul>
								<li>{{ errors.first('site') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" :class="{'has-danger': errors.has('country') }">
						<label class="form-label" for="country">Доступен в странах *</label>
						<multiselect :class="{'has-danger': errors.has('country') }" id="country" :custom-label="customLabel" placeholder="Укажите хотя-бы одну страну" v-model="shopModel.country" track-by="id" :multiple="true" :options="countryList"></multiselect>

						<input data-vv-as="Доступен в странах" v-validate="'required'" :class="{'has-danger': errors.has('country') }" name="country" v-model="shopModel.country" type="hidden">
						<div class="form-control-error" v-if="errors !== undefined && errors.has('country')">
							<ul>
								<li>{{ errors.first('country') }}</li>
							</ul>
						</div>
					</div>
					<div class="form-group" v-if="edit === true && offer !== 0" :class="{'has-danger': errors.has('link') }">
						<label class="form-label" for="link">Ссылка для перехода *</label>
						<div class="input-group">
							<span class="input-group-addon">
								<i class="icmn-exit3"></i>
							</span>
							<input data-vv-as="Ссылка для перехода" v-validate="'required'" :class="{'has-danger': errors.has('link') }" name="link" id="link" class="form-control" v-model="shopModel.link" type="url">
						</div>
						<div class="form-control-error" v-if="errors !== undefined && errors.has('link')">
							<ul>
								<li>{{ errors.first('link') }}</li>
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
								<input type="checkbox" value="web" v-model="shopModel.onlyfor">
								Web
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('plugin') !== -1}">
								<input type="checkbox" value="plugin" v-model="shopModel.onlyfor">
								Плагины
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('ios') !== -1}">
								<input type="checkbox" value="ios" v-model="shopModel.onlyfor">
								IOS
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : shopModel.onlyfor.indexOf('android') !== -1}">
								<input type="checkbox" value="android" v-model="shopModel.onlyfor">
								Android
							</label>
							<label class="btn btn-primary-outline" style="display: none">
								<input type="checkbox" value="mobile" v-model="shopModel.onlyfor">
								Mobile
							</label>
						</div>
					</div>
					<div class="form-group" v-if="edit === true && offer !== 0">
						<label class="form-label">Как активировать в плагине:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-primary-outline" :class="{'active' : activateInPlugin === 2}">
								<input type="radio" value="2" v-model.number="activateInPlugin">
								С переходом
							</label>
							<label class="btn btn-primary-outline" :class="{'active' : activateInPlugin === 3}">
								<input type="radio" value="3" v-model.number="activateInPlugin">
								Без перехода
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
					<div class="form-group" v-if="edit === true && offer !== 0">
						<label class="form-label">Удален:</label><br/>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default-outline" :class="{'active' : shopModel.deleted === 0}">
								<input type="radio" v-bind:value="0" v-model.number="shopModel.deleted">
								Нет
							</label>
							<label class="btn btn-danger-outline" :class="{'active' : shopModel.deleted === 1}">
								<input type="radio" v-bind:value="1" v-model.number="shopModel.deleted">
								Да
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-12" v-if="edit === true && offer !== 0">
			<div class="panel">
				<div class="panel-heading">
					<h5>
						Бандлы
					</h5>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-overflow dataTable">
						<thead>
							<tr>
								<th>Ссылка</th>
								<th width="50"><a href="#" class="btn btn-icon btn-primary" v-on:click="addRow($event)"><i class="icmn-plus2"></i></a></th>
							</tr>
						</thead>
						<tbody>
							<template v-if="shopModel.bundles.length > 0">
								<template :id="'bundle-' + index" v-for="(bundle, index) in shopModel.bundles">
									<tr :class="{'disabled' : shopModel['bundles'][index].delete !== undefined}">
										<td>
											<input type="text" v-model="shopModel['bundles'][index].link" class="form-control" :disabled="shopModel['bundles'][index].delete !== undefined" :class="{'disabled' : shopModel['bundles'][index].delete !== undefined}" placeholder="Ссылка"/>
										</td>
										<td class="text-center">
											<a href="#" v-if="shopModel['bundles'][index].delete === undefined" class="btn btn-icon btn-warning" v-on:click="removeRow($event, index)"><i class="icmn-minus2"></i></a>
										</td>
									</tr>
								</template>
							</template>
							<template v-else>
								<tr>
									<td colspan="2">Вы еще не добавили ни одного бандла</td>
								</tr>
							</template>
						</tbody>
					</table>
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
        if (this.offerData.deleted !== undefined && this.offerData.deleted !== null && this.offerData.deleted !== '') {
          this.shopModel.deleted = this.offerData.deleted
        }
        if (this.offerData.sid !== undefined && this.offerData.sid !== null && this.offerData.sid !== '') {
          this.shopModel.sid = this.offerData.sid
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
        if (this.offerData.link !== undefined && this.offerData.link !== null && this.offerData.link !== '') {
          this.shopModel.link = this.offerData.link
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
        if (this.offerData.conf_popup !== undefined && this.offerData.conf_popup !== null && this.offerData.conf_popup !== '') {
          if (this.offerData.conf_popup === 1) {
            this.activateInPlugin = 2
          }
        }
        if (this.offerData.conf_iframe !== undefined && this.offerData.conf_iframe !== null && this.offerData.conf_iframe !== '') {
          if (this.offerData.conf_iframe === 1) {
            this.activateInPlugin = 3
          }
        }
        if (this.offerData.categories !== undefined && this.offerData.categories !== null && this.offerData.categories !== '') {
          let selectedCategories = this.offerData.categories
          let selectedCategoriesObject = []
          let self = this
          Object.keys(selectedCategories).map(function (key) {
            for (let y = 0; y < self.categoryList.length; y++) {
              if (self.categoryList[y].id === parseInt(key, 10)) {
                selectedCategoriesObject.push(self.categoryList[y])
              }
            }
          })
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
        if (this.offerData.aggregator !== undefined && this.offerData.aggregator !== null && this.offerData.aggregator !== '') {
          this.shopModel.aggregator = this.offerData.aggregator
        }
        if (this.offerData.bundles !== undefined && this.offerData.bundles !== null && this.offerData.bundles.length > 0) {
          this.shopModel.bundles = this.offerData.bundles
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
      },
      activateInPlugin: function (newValue) {
        if (newValue === 2) {
          this.shopModel.conf_popup = 1
          this.shopModel.conf_iframe = 0
        } else if (newValue === 3) {
          this.shopModel.conf_popup = 0
          this.shopModel.conf_iframe = 1
        } else {
          this.shopModel.conf_popup = 0
          this.shopModel.conf_iframe = 0
        }
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
        activateInPlugin: 0,
        have_promo: 0,
        have_cashback: 0,
        have_dlinks: 0,
        image: '/278x90_not_loaded.png',
        shopModel: {
          available: 0,
          deleted: 0,
          bundles: [],
          site: '',
          conf_popup: 0,
          conf_iframe: 0,
          categories: [],
          aggregator: [],
          country: '',
          name: '',
          have_cashback: 0,
          have_dlinks: 0,
          have_promo: 0,
          onlyfor: ['web', 'ios', 'android', 'mobile'],
          tags: [],
          image: '',
          link: '',
          sid: '',
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
      addRow (event) {
        event.preventDefault()
        this.shopModel.bundles.push({
          link: ''
        })
        return false
      },
      removeRow (event, index) {
        event.preventDefault()
        if (this.shopModel.bundles[index].id !== undefined) {
          this.shopModel.bundles[index].delete = true
          this.shopModel.bundles.push({
            link: ''
          })
          this.shopModel.bundles = (this.shopModel.bundles).slice(0, this.shopModel.bundles.length - 1)
        } else {
          this.shopModel.bundles = (this.shopModel.bundles).slice(0, this.shopModel.bundles.length - 1)
        }
        return false
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
        let action = 'create'
        let module = 'offers'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          aggregator: {
            id: (self.shopModel.aggregator !== undefined && self.shopModel.aggregator.id !== undefined ? self.shopModel.aggregator.id : ''),
            name: (self.shopModel.aggregator !== undefined && self.shopModel.aggregator.name !== undefined ? self.shopModel.aggregator.name : '')
          },
          available: (self.shopModel.available !== undefined ? self.shopModel.available : 0),
          bundles: (self.shopModel.bundles !== undefined ? self.shopModel.bundles : []),
          categories: (self.shopModel.categories !== undefined && self.shopModel.categories.length > 0 ? (self.shopModel.categories.map(function (category) { return category.id })) : []),
          conf_iframe: (self.shopModel.conf_iframe !== undefined ? self.shopModel.conf_iframe : 0),
          conf_popup: (self.shopModel.conf_popup !== undefined ? self.shopModel.conf_popup : 0),
          country: (self.shopModel.country !== undefined && self.shopModel.country.length > 0 ? (self.shopModel.country.map(function (country) { return country.code })).join(',') : ''),
          deleted: (self.shopModel.deleted !== undefined ? self.shopModel.deleted : 0),
          have_cashback: (self.shopModel.have_cashback !== undefined ? self.shopModel.have_cashback : 0),
          have_dlinks: (self.shopModel.have_dlinks !== undefined ? self.shopModel.have_dlinks : 0),
          have_promo: (self.shopModel.have_promo !== undefined ? self.shopModel.have_promo : 0),
          image: (self.shopModel.image !== undefined ? self.shopModel.image : ''),
          link: (self.shopModel.link !== undefined ? self.shopModel.link : ''),
          name: (self.shopModel.name !== undefined ? self.shopModel.name : ''),
          onlyfor: (self.shopModel.onlyfor !== undefined && self.shopModel.onlyfor.length > 0 ? self.shopModel.onlyfor.join(',') : ''),
          sid: (self.shopModel.sid !== undefined ? self.shopModel.sid : ''),
          site: (self.shopModel.site !== undefined ? self.shopModel.site : ''),
          slug: (self.shopModel.slug !== undefined ? self.shopModel.slug : ''),
          tags: (self.shopModel.tags !== undefined && self.shopModel.tags.length > 0 ? self.shopModel.tags.join(',') : '')
        }

        if (self.edit !== false) {
          action = 'editBasics'
          data.offer = self.offer
        }

        getFromApi(undefined, module, action, data)
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