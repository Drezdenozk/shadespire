<template>
	<div class="panel">
		<div class="panel-heading">
			<h5>
				Сео данные
			</h5>
		</div>
		<div class="panel-body">
			<form @submit.prevent="validateBeforeSubmit" id="form-add-seo" name="form-validation" method="POST">
				<div class="form-group" :class="{'has-danger': errors.has('h1') }">
					<label class="form-label" for="h1">Заголовок *</label>
					<input id="h1" data-vv-as="Название" v-validate="'required'" :class="{'has-danger': errors.has('h1') }" name="h1" class="form-control" type="text" v-model="shopModel.h1">
					<div class="form-control-error" v-if="errors !== undefined && errors.has('h1')">
						<ul>
							<li>{{ errors.first('h1') }}</li>
						</ul>
					</div>
				</div>
				<div class="form-group" :class="{'has-danger': errors.has('keywords') }">
					<label class="form-label" for="keywords">Ключевые слова *</label><br/>
					<textarea data-vv-as="Ключевые слова" v-validate="'required'" :class="{'has-danger': errors.has('keywords') }" name="keywords" id="keywords" class="form-control" v-model="shopModel.keywords"></textarea>
					<div class="form-control-error" v-if="errors !== undefined && errors.has('keywords')">
						<ul>
							<li>{{ errors.first('keywords') }}</li>
						</ul>
					</div>
				</div>
				<div class="form-group" :class="{'has-danger': errors.has('descriptions') }">
					<label class="form-label" for="descriptions">Описание *</label><br/>
					<textarea data-vv-as="Описание" v-validate="'required'" :class="{'has-danger': errors.has('descriptions') }" name="descriptions" id="descriptions" class="form-control" v-model="shopModel.descriptions"></textarea>
					<div class="form-control-error" v-if="errors !== undefined && errors.has('descriptions')">
						<ul>
							<li>{{ errors.first('descriptions') }}</li>
						</ul>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i>Сохранить изменения</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
  import { getFromApi } from '~/utils/api'

  let miniToastr

  if (process.browser) {
    miniToastr = require('mini-toastr')
  }
  export default {
    created () {
      if (this.offerData !== undefined) {
        if (this.offerData.id !== undefined && this.offerData.id !== null && this.offerData.id !== '') {
          this.offer = this.offerData.id
        }
        if (this.offerData.seo !== undefined && this.offerData.seo.h1 !== undefined && this.offerData.seo.h1 !== '') {
          this.shopModel.h1 = this.offerData.seo.h1
        }
        if (this.offerData.seo !== undefined && this.offerData.seo.descriptions !== undefined && this.offerData.seo.descriptions !== '') {
          this.shopModel.descriptions = this.offerData.seo.descriptions
        }
        if (this.offerData.seo !== undefined && this.offerData.seo.keywords !== undefined && this.offerData.seo.keywords !== '') {
          this.shopModel.keywords = this.offerData.seo.keywords
        }
      }
    },
    mounted () {
      miniToastr.init()
    },
    data: function () {
      return {
        offer: 0,
        shopModel: {
          descriptions: '',
          h1: '',
          keywords: ''
        }
      }
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: ['offerData'],
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addSeoToDB(event)
        }
      },
      addSeoToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'saveSeo'
        let module = 'reseller-offers-public'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          offer_id: self.offer,
          descriptions: self.shopModel.descriptions,
          h1: self.shopModel.h1,
          keywords: self.shopModel.keywords
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.removeAttribute('disabled')
            button.classList.remove('on-ajax')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Сео-данные успешно обновлены!',
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