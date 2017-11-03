<template>
    <form id="form-validation" name="form-add-cashback" method="POST" class="row">
        <div class="col-lg-4">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Настройки кэшбэка
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="form-label">Тип кэшбэка:</label><br/>
                        <div class="btn-group" data-toggle="buttons">
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.cpa_type === 'dynamic'}">
                                <input type="radio" value="dynamic" readonly disabled v-model="shopModel.cpa_type">
                                Процентный
                            </label>
                            <label class="btn btn-primary-outline" :class="{'active' : shopModel.cpa_type === 'fixed'}">
                                <input type="radio" value="fixed" readonly disabled v-model="shopModel.cpa_type">
                                Фиксированный
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="cashback">Кэшбэк
                            <span v-if="shopModel.cpa_type === 'fixed'">
                                в &#8381;
                            </span>
                            <span v-else>
                                в %
                            </span>
                        </label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="icmn-coins"></i>
                            </span>
                            <input type="number" min="0" step="0.01" class="form-control readonly" readonly disabled :value="getCpa" id="cashback">
                        </div>
                    </div>
                    <div class="form-group" v-if="onClient === true">
                        <label class="form-label">Оставлять себе, в %</label>
                        <vue-slider ref="slider" :show="onClient" :max="max" :real-time="real" v-model="shopModel.rcpa"></vue-slider>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Настройки суб-категорий
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="table-responsive" v-if="shopModel.cpa_type !== 'fixed'">
                        <table width="100%" class="table table-hover nowrap table-striped dataTable">
                            <thead>
                                <tr>
                                    <th>Название суб-категории</th>
                                    <th width="180">Кэшбэк
                                        <span v-if="shopModel.cpa_type === 'fixed'">
                                            (в &#8381;)
                                        </span>
                                        <span v-else>
                                            (в %)
                                        </span>
                                    </th>
                                    <th width="220">Но не более (&#8381;)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="shopModel.subcategories.length === 0">
                                    <tr>
                                        <td colspan="4">Вы еще не добавили ни одной суб-категории</td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr v-for="(subcategory, index) in shopModel.subcategories">
                                        <td>
                                            <div class="form-group">
                                                <input placeholder="Название суб-категории" readonly disabled type="text" class="form-control" v-model="shopModel.subcategories[index].category_name" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group">
                                                <input type="number" class="form-control" readonly disabled step="0.01" min="0" v-model="shopModel.subcategories[index].cpa" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group">
                                                <input type="number" class="form-control" readonly disabled step="0.01" min="0" v-model="shopModel.subcategories[index].max_cpa" />
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <div class="alert alert-warning" role="alert">
                            Для магазинов с фиксированным кэшбэком системой не предусмотрены суб-категории.<br/>
                            Если Вы меняете тип кэшбэка, то Вы автоматически удаляете все созданные суб-категории
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="form-actions">
                <button type="button" v-on:click="addCashbackToDB($event)" class="btn btn-primary"><i class="icmn-spinner6 util-spin"></i>Сохранить изменения</button>
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
    computed: {
      getCpa: function (cpa) {
        return (this.shopModel.cpa.client + this.shopModel.cpa.reseller).toFixed(2)
      }
    },
    components: {
      vueSlider
    },
    created () {
      if (this.offerData !== undefined) {
        if (this.offerData.id !== undefined && this.offerData.id !== null && this.offerData.id !== '') {
          this.offer = this.offerData.id
        }
        if (this.offerData.cpa !== undefined && this.offerData.cpa !== null) {
          this.shopModel.cpa = this.offerData.cpa
        }
        if (this.offerData.cpa_type !== undefined && this.offerData.cpa_type !== null && this.offerData.cpa_type !== '') {
          this.shopModel.cpa_type = this.offerData.cpa_type
        }
        if (this.offerData.subcategories !== undefined && this.offerData.subcategories !== null && this.offerData.subcategories.length > 0) {
          this.shopModel.subcategories = this.offerData.subcategories
        }
      }
    },
    mounted () {
      miniToastr.init()
      this.onClient = true
      let self = this
      if (this.offerData.cpaLocal.reseller !== undefined && this.offerData.cpaLocal.reseller !== null) {
        window.setTimeout(function () {
          self.$refs.slider.setValue(parseInt(self.offerData.cpaLocal.reseller, 10))
        }, 1000)
      }
    },
    data: function () {
      return {
        onClient: false,
        offer: 0,
        min: 0,
        max: 30,
        real: true,
        shopModel: {
          cpa: 0,
          rcpa: 0,
          cpa_type: 'dynamic',
          subcategories: []
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
      addCashbackToDB (event) {
        let button = event.currentTarget
        let self = this
        let action = 'editCashback'
        let module = 'reseller-offers-public'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          offer: self.offer,
          rcpa: self.shopModel.rcpa
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.removeAttribute('disabled')
            button.classList.remove('on-ajax')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Отчисления по кэшбэку успешно обновлены!',
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