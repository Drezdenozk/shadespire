<template>
    <form @submit.prevent="validateBeforeSubmit($event)" id="form-validation" name="form-validation" method="POST" class="row">
        <div class="col-lg-8">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Основные данные
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="form-group" :class="{'has-danger': errors.has('title') }">
                        <label class="form-label" for="title" :class="{'has-danger': errors.has('title') }">Заголовок *</label>
                        <input id="title" data-vv-as="Заголовок" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('title') }" name="title" v-model="title" type="text">
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('title')">
                            <ul>
                                <li>{{ errors.first('title') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group" :class="{'has-danger': errors.has('slug') }">
                        <label class="form-label" for="slug" :class="{'has-danger': errors.has('slug') }">Сео-урл *</label>
                        <div class="form-input-icon form-input-icon-right">
                            <i class="icmn-spinner11 util-spin" v-if="generateSlug"></i>
                            <input :disabled="edit" id="slug" data-vv-as="Сео-урл" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('slug') }" name="slug" v-model="shopModel.news.slug" type="text">
                        </div>
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('slug')">
                            <ul>
                                <li>{{ errors.first('slug') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group" :class="{'has-danger': errors.has('categories') }">
                        <label class="form-label"  :class="{'has-danger': errors.has('categories') }" for="categories">Категории магазина *</label>
                        <multiselect id="categories" :class="{'has-danger': errors.has('categories') }" :custom-label="customLabel" placeholder="Укажите хотя-бы одну категорию" v-model="shopModel.news.category_id" track-by="id" :multiple="false" :options="categoryList"></multiselect>

                        <input data-vv-as="Категории магазина" v-validate="'required'" name='categories' v-model="shopModel.news.category_id" type="hidden">
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('categories')">
                            <ul>
                                <li>{{ errors.first('categories') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group" v-if="onClient === true">
                        <label class="form-label">Анонс:</label><br/>
                        <tiny-mce id="short_desc" :uploadBase="uploadBase" :uploadDir="uploadDir" v-model="shopModel.news.teaser" :toolbar="toolbar"></tiny-mce>
                    </div>
                    <div class="form-group" v-if="onClient === true">
                        <label class="form-label">Полный текст новости:</label><br/>
                        <tiny-mce id="full_desc" :uploadBase="uploadBase" :uploadDir="uploadDir" v-model="shopModel.news.fulltext" :toolbar="toolbar"></tiny-mce>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Сео
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="form-group" :class="{'has-danger': errors.has('seo_h1') }">
                        <label class="form-label" :class="{'has-danger': errors.has('seo_h1') }">Заголовок *</label>
                        <input data-vv-as="Заголовок" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('seo_h1') }" name="seo_h1" v-model="shopModel.seo.h1" type="text">
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('seo_h1')">
                            <ul>
                                <li>{{ errors.first('seo_h1') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group" :class="{'has-danger': errors.has('seo_keys') }">
                        <label class="form-label" :class="{'has-danger': errors.has('seo_keys') }">Ключевые слова *</label>
                        <input data-vv-as="Ключевые слова" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('seo_keys') }" name="seo_keys" v-model="shopModel.seo.keywords" type="text">
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('seo_keys')">
                            <ul>
                                <li>{{ errors.first('seo_keys') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group" :class="{'has-danger': errors.has('seo_desc') }">
                        <label class="form-label" :class="{'has-danger': errors.has('seo_desc') }">Описание *</label>
                        <input data-vv-as="Описание" v-validate="'required'" class="form-control" :class="{'has-danger': errors.has('seo_desc') }" name="seo_desc" v-model="shopModel.seo.description" type="text">
                        <div class="form-control-error" v-if="errors !== undefined && errors.has('seo_desc')">
                            <ul>
                                <li>{{ errors.first('seo_desc') }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Настройки публикации
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="form-label">По всем проектам:</label><br/>
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.news.is_global === 1}">
                                <input type="radio" value="1" v-model.number="shopModel.news.is_global">
                                Да
                            </label>
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.news.is_global === 0}">
                                <input type="radio" value="0" v-model.number="shopModel.news.is_global">
                                Нет
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Опубликована:</label><br/>
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.news.status === 1}">
                                <input type="radio" value="1" v-model.number="shopModel.news.status">
                                Да
                            </label>
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.news.status === 0}">
                                <input type="radio" value="0" v-model.number="shopModel.news.status">
                                Нет
                            </label>
                        </div>
                    </div>
                    <div class="form-group" v-if="edit">
                        <label class="form-label">Дата создания:</label>
                        <input class="form-control" v-model="shopModel.news.created_at" type="text" readonly>
                    </div>
                    <div class="form-group" v-if="edit">
                        <label class="form-label">Последнее редактирование:</label>
                        <input class="form-control" v-model="shopModel.news.updated_at" type="text" readonly>
                    </div>
                    <div class="form-group" v-if="edit">
                        <a :href="shopModel.news.link" target="_blank" class="btn btn-primary">Посмотреть опубликованную</a>
                    </div>
                </div>
            </div>
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
                            <input type="hidden" v-model="shopModel.image">
                        </div>
                        <dropzone v-if="onClient === true" ref="myUniqueID" id="myUniqueID22" url="/api/ticket/screenshot" :use-custom-dropzone-options="true" :use-font-awesome="true" :auto-process-queue="false" :show-remove-link="false">
                            <div class="dz-default dz-message">
                                <span><i style="font-size: 32px;" class="fa fa-cloud-upload"></i><br>Перетащите изображения сюда для загрузки</span>
                            </div>
                        </dropzone>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Alt изображения</label>
                        <input class="form-control" v-model="shopModel.teaserImage.alt" type="text">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Title изображения</label>
                        <input class="form-control" v-model="shopModel.teaserImage.title" type="text">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="form-actions">
                <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i><template v-if="edit !== true">Добавить новость</template><template v-else>Сохранить изменения</template></button>
            </div>
        </div>
    </form>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import moment from 'moment'

  import { sendImageToCash, getFromApi } from '~/utils/api'

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
      if (this.newsData !== undefined) {
        if (this.newsData.fulltext !== undefined && this.newsData.fulltext !== null && this.newsData.fulltext !== '') {
          this.shopModel.news.fulltext = this.newsData.fulltext
        }
        if (this.newsData.title !== undefined && this.newsData.title !== null && this.newsData.title !== '') {
          this.title = this.newsData.title
          this.shopModel.news.title = this.newsData.title
        }
        if (this.newsData.slug !== undefined && this.newsData.slug !== null && this.newsData.slug !== '') {
          this.shopModel.news.slug = this.newsData.slug
        }
        if (this.newsData.teaser !== undefined && this.newsData.teaser !== null && this.newsData.teaser !== '') {
          this.shopModel.news.teaser = this.newsData.teaser
        }
        if (this.newsData.status !== undefined && this.newsData.status !== null && this.newsData.status !== '') {
          this.shopModel.news.status = this.newsData.status
        }
        if (this.newsData.is_global !== undefined && this.newsData.is_global !== null && this.newsData.is_global !== '') {
          this.shopModel.news.is_global = this.newsData.is_global
        }
        if (this.newsData.created_at !== undefined && this.newsData.created_at !== null && this.newsData.created_at !== '' && this.newsData.created_at !== null) {
          this.shopModel.news.created_at = moment(this.newsData.created_at, 'YYYY-MM-DD HH:mm:ss').format('MM.DD.YYYY, HH:mm')
        } else {
          this.shopModel.news.created_at = '-'
        }
        if (this.newsData.updated_at !== undefined && this.newsData.updated_at !== null && this.newsData.updated_at !== '' && this.newsData.updated_at !== null) {
          this.shopModel.news.updated_at = moment(this.newsData.updated_at, 'YYYY-MM-DD HH:mm:ss').format('MM.DD.YYYY, HH:mm')
        } else {
          this.shopModel.news.updated_at = 'Не редактировалось'
        }
        if (this.newsData.id !== undefined && this.newsData.id !== null && this.newsData.id !== '') {
          this.news = this.newsData.id
        }
        if (this.newsData.link !== undefined && this.newsData.link !== null && this.newsData.link !== '') {
          this.shopModel.news.link = this.newsData.link
        }
        if (this.newsData.images !== undefined && this.newsData.images !== null && this.newsData.images.length > 0) {
          this.shopModel.aImages = this.newsData.images
        }
        if (this.newsData.category !== undefined && this.newsData.category !== null && this.newsData.category.id !== '') {
          this.shopModel.news.category_id = {
            category_name: this.newsData.category.category_name,
            id: this.newsData.category.id,
            project_id: this.newsData.category.project_id,
            slug: this.newsData.category.slug
          }
        }
        if (this.newsData.seo !== undefined && this.newsData.seo !== false && this.newsData.seo.h1 !== undefined) {
          this.shopModel.seo.h1 = this.newsData.seo.h1
        }
        if (this.newsData.seo !== undefined && this.newsData.seo !== false && this.newsData.seo.keywords !== undefined) {
          this.shopModel.seo.keywords = this.newsData.seo.keywords
        }
        if (this.newsData.seo !== undefined && this.newsData.seo !== false && this.newsData.seo.description !== undefined) {
          this.shopModel.seo.description = this.newsData.seo.description
        }
        if (this.newsData.teaserimage !== undefined && this.newsData.teaserImage !== false && this.newsData.teaserimage.title !== undefined) {
          this.shopModel.teaserImage.title = this.newsData.teaserimage.title
        }
        if (this.newsData.teaserimage !== undefined && this.newsData.teaserimage !== false && this.newsData.teaserimage.alt !== undefined) {
          this.shopModel.teaserImage.alt = this.newsData.teaserimage.alt
        }
        if (this.newsData.teaserimage !== undefined && this.newsData.teaserimage !== false && this.newsData.teaserimage.src !== undefined) {
          this.shopModel.teaserImage.src = this.newsData.teaserimage.src
          this.image = this.newsData.teaserimage.src
        }
      }
    },
    mounted () {
      miniToastr.init()
      let self = this
      self.onClient = true
      setTimeout(function () {
        if (document.querySelector('#myUniqueID22') !== null) {
          document.querySelector('#myUniqueID22').dropzone.on('addedfile', function (file) {
            self.uploadAvatar(file)
          })
        }
      }, 2000)
    },
    components: {
      dropzone,
      Multiselect
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: [
      'categoryList',
      'edit',
      'newsData'
    ],
    watch: {
      title: function (val) {
        if (!this.edit) {
          this.createSlug()
        } else {
          this.shopModel.news.title = val
        }
      }
    },
    data: function () {
      return {
        news: 0,
        uploadBase: 'https://backmy.cash',
        uploadDir: '/news/upload',
        toolbar: 'bold italic underline strikethrough alignleft aligncenter alignright alignjustify alignnone styleselect fontselect fontsizeselect cut copy paste outdent indent blockquote undo redo removeformat hr bullist numlist link unlink openlink image charmap pastetext anchor searchreplace visualblocks visualchars code insertdatetime nonbreaking table imageoptions backcolor forecolor',
        onClient: false,
        title: '',
        test: '',
        image: '/278x90_not_loaded.png',
        generateSlug: false,
        shopModel: {
          aImages: [],
          news: {
            link: '',
            created_at: '',
            updated_at: '',
            category_id: null,
            fulltext: '',
            slug: '',
            is_global: 0,
            status: 0,
            teaser: '',
            title: ''
          },
          seo: {
            h1: '',
            keywords: '',
            description: ''
          },
          teaserImage: {
            src: '',
            alt: '',
            title: ''
          }
        }
      }
    },
    methods: {
      createSlug: function () {
        let self = this
        let action = 'generateSlug'
        let module = 'reseller-news-public'
        let data = {
          title: self.title
        }
        self.generateSlug = true
        self.shopModel.news.title = self.title

        getFromApi(undefined, module, action, data)
          .then((response) => {
            if (response.data.status === 'success' && response.data.message.slug !== undefined) {
              self.shopModel.news.slug = response.data.message.slug
            } else {
              self.showMessage({
                title: 'Ошибка!', message: response.data.message, type: 'error'
              })
            }
            self.generateSlug = false
          })
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
              sendImageToCash('https://backmy.cash/news/upload', pngUrl, '.jpg', true)
                .then((response) => {
                  self.image = response.data
                  self.shopModel.teaserImage.src = response.data
                  // if (more) {
                  // self.shopModel.aImages.push('https://backmy.cash' + response.data)
                  // }
                })
            }
            img.src = e.target.result
          }
          FR.readAsDataURL(temp)
        }
      },
      customLabel (option) {
        return `${option.category_name}`
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addNewsToDB(event)
        }
      },
      addNewsToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'addNews'
        let module = 'news'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          news: {
            title: self.shopModel.news.title,
            teaser: self.shopModel.news.teaser,
            fulltext: self.shopModel.news.fulltext,
            status: self.shopModel.news.status,
            is_global: self.shopModel.news.is_global,
            category_id: (self.shopModel.news.category_id !== null ? self.shopModel.news.category_id.id : null),
            slug: self.shopModel.news.slug
          },
          seo: {
            h1: self.shopModel.seo.h1,
            keywords: self.shopModel.seo.keywords,
            description: self.shopModel.seo.description
          },
          teaserImage: {
            src: self.shopModel.teaserImage.src,
            alt: self.shopModel.teaserImage.alt,
            title: self.shopModel.teaserImage.title
          }
        }

        if (self.edit !== false) {
          action = 'updateNews'
          data.news.id = self.news
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