<template>
	<div class="panel">
		<div class="panel-heading">
			<h5>
				Текстовые данные
			</h5>
		</div>
		<div class="panel-body">
			<form @submit.prevent="validateBeforeSubmit" id="form-add-text" name="form-validation" method="POST">
				<div class="form-group">
					<label class="form-label">Комментарий к времени получения:</label><br/>
					<tiny-mce :uploadBase="uploadBase" :uploadDir="uploadDir" id="cashback_timeout_comment" v-model="shopModel.cashback_timeout_comment" :toolbar="toolbar"></tiny-mce>
				</div>
				<div class="form-group">
					<label class="form-label">Правила получения кэшбэка:</label><br/>
					<tiny-mce :uploadBase="uploadBase" :uploadDir="uploadDir" id="cashback_rules" v-model="shopModel.cashback_rules" :toolbar="toolbar"></tiny-mce>
				</div>
				<div class="form-group">
					<label class="form-label">Краткое описание:</label><br/>
					<tiny-mce :uploadBase="uploadBase" :uploadDir="uploadDir" id="short_desc" v-model="shopModel.shortDesc" :toolbar="toolbar"></tiny-mce>
				</div>
				<div class="form-group">
					<label class="form-label">Полное описание:</label><br/>
					<tiny-mce :uploadBase="uploadBase" :uploadDir="uploadDir" id="desc" v-model="shopModel.desc" :toolbar="toolbar"></tiny-mce>
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
        if (this.offerData.cashback_rules !== undefined && this.offerData.cashback_rules !== null && this.offerData.cashback_rules !== '') {
          this.shopModel.cashback_rules = this.offerData.cashback_rules
        }
        if (this.offerData.cashback_timeout_comment !== undefined && this.offerData.cashback_timeout_comment !== null && this.offerData.cashback_timeout_comment !== '') {
          this.shopModel.cashback_timeout_comment = this.offerData.cashback_timeout_comment
        }
        if (this.offerData.desc !== undefined && this.offerData.desc !== null && this.offerData.desc !== '') {
          this.shopModel.desc = this.offerData.desc
        }
        if (this.offerData.shortDesc !== undefined && this.offerData.shortDesc !== null && this.offerData.shortDesc !== '') {
          this.shopModel.shortDesc = this.offerData.shortDesc
        }
        if (this.offerData.id !== undefined && this.offerData.id !== null && this.offerData.id !== '') {
          this.offer = this.offerData.id
        }
      }
    },
    mounted () {
      miniToastr.init()
    },
    data: function () {
      return {
        offer: 0,
        uploadBase: 'https://backmy.cash',
        uploadDir: '/shops/upload',
        toolbar: 'bold italic underline strikethrough alignleft aligncenter alignright alignjustify alignnone styleselect fontselect fontsizeselect cut copy paste outdent indent blockquote undo redo removeformat hr bullist numlist link unlink openlink image charmap pastetext anchor searchreplace visualblocks visualchars code insertdatetime nonbreaking table imageoptions backcolor forecolor',
        shopModel: {
          cashback_rules: '',
          cashback_timeout_comment: '',
          desc: '',
          shortDesc: ''
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
          this.addTextToDB(event)
        }
      },
      addTextToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'editDescs'
        let module = 'reseller-offers-public'

        button.setAttribute('disabled', 'disabled')
        button.classList.add('on-ajax')

        let data = {
          cashback_rules: self.shopModel.cashback_rules,
          cashback_timeout_comment: self.shopModel.cashback_timeout_comment,
          desc: self.shopModel.desc,
          shortdesc: self.shopModel.shortDesc,
          offer: self.offer
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.removeAttribute('disabled')
            button.classList.remove('on-ajax')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Тексты успешно обновлены!',
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