<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Новый промокод
                    </h5>
                </div>
                <div class="panel-body">
                    <form @submit.prevent="validateBeforeSubmit" id="form-add-promocode" name="form-validation" method="POST">
                        <div class="form-group" :class="{'has-danger': errors.has('title') }">
                            <label class="form-label" :class="{'has-danger': errors.has('title') }" for="promo-name">Название *</label>
                            <input data-vv-as="Название" v-validate="'required'" :class="{'has-danger': errors.has('title') }" name="title" id="promo-name" class="form-control" type="text" v-model="shopModel.title">
                            <div class="form-control-error" v-if="errors !== undefined && errors.has('title')">
                                <ul>
                                    <li>{{ errors.first('title') }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group" :class="{'has-danger': errors.has('code') }">
                            <label class="form-label" for="promo-code">Код *</label>
                            <input data-vv-as="Код" v-validate="'required'" :class="{'has-danger': errors.has('code') }" name="code" id="promo-code" class="form-control" type="text" v-model="shopModel.code">
                            <div class="form-control-error" v-if="errors !== undefined && errors.has('code')">
                                <ul>
                                    <li>{{ errors.first('code') }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group" :class="{'has-danger': errors.has('desc') }">
                            <label class="form-label" for="promo-desc">Описание *</label><br/>
                            <textarea data-vv-as="Описание" v-validate="'required'" :class="{'has-danger': errors.has('desc') }" name="desc" id="promo-desc" class="form-control" v-model="shopModel.description"></textarea>
                            <div class="form-control-error" v-if="errors !== undefined && errors.has('desc')">
                                <ul>
                                    <li>{{ errors.first('desc') }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Тип скидки</label><br/>
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary-outline" :class="{'active' : !shopModel.fixed}">
                                    <input type="radio" value="0" v-model.number="shopModel.fixed">
                                    Процентный
                                </label>
                                <label class="btn btn-primary-outline" :class="{'active' : shopModel.fixed}">
                                    <input type="radio" value="1" v-model.number="shopModel.fixed">
                                    Фиксированный
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" :class="{'has-danger': errors.has('discount') }" for="promo-discount">Скидка *</label>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="icmn-coins"></i>
                                </span>
                                <input data-vv-as="Скидка" v-validate="'required'" :class="{'has-danger': errors.has('discount') }" name="discount" id="promo-discount" class="form-control" type="number" min="0" step="0.01" v-model.number="shopModel.discount">
                                <span class="input-group-addon">
                                    <template v-if="shopModel.fixed">&#8381;</template>
                                    <template v-else>%</template>
                                </span>
                            </div>
                            <div class="form-control-error" v-if="errors !== undefined && errors.has('discount')">
                                <ul>
                                    <li>{{ errors.first('discount') }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Действует с:</label>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="icmn-calendar"></i>
                                </span>
                                <input class="form-control" type="date" style="display: inline-block;width:70%;" v-model="shopModel.startDate">
                                <input class="form-control" type="time" style="display: inline-block;width:30%;" v-model="shopModel.startTime">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">По:</label>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="icmn-calendar"></i>
                                </span>
                                <input class="form-control" type="date" style="display: inline-block;width:70%;" v-model="shopModel.finishDate">
                                <input class="form-control" type="time" style="display: inline-block;width:30%;" v-model="shopModel.finishTime">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Активен:</label><br/>
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary-outline" :class="{'active' : shopModel.status === 1}">
                                    <input type="radio" value="1" v-model.number="shopModel.status">
                                    Да
                                </label>
                                <label class="btn btn-primary-outline" :class="{'active' : shopModel.status === 0}">
                                    <input type="radio" value="0" v-model.number="shopModel.status">
                                    Нет
                                </label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <template v-if="edits === true">
                                <div class="btn-group" role="group">
                                    <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i>Сохранить изменения</button>
                                    <button type="button" v-on:click="cancelEdit($event)" class="btn btn-default"><i class="icmn-spinner6 util-spin"></i>Отменить редактирование</button>
                                </div>
                            </template>
                            <template v-else>
                                <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i>Добавить промокод</button>
                            </template>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="panel">
                <div class="panel-heading">
                    <h5>
                        Добавленные промокоды
                    </h5>
                </div>
                <div class="panel-body">
                    <table class="table table-striped table-overflow dataTable">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Код</th>
                            <th>Действует с</th>
                            <th>Действует по</th>
                            <th>Скидка</th>
                            <th>Активен</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <template v-if="selfPromocodesList.length > 0">
                                <template :id="'promocode-' + index" v-for="(promocode, index) in selfPromocodesList">
                                    <tr>
                                        <td style="vertical-align:middle">
                                            {{index + 1}}
                                        </td>
                                        <td style="vertical-align:middle">
                                            <span>{{promocode.title}}</span>
                                        </td>
                                        <td style="vertical-align:middle">
                                            <span>{{promocode.code}}</span>
                                        </td>
                                        <td style="vertical-align:middle">
                                            <span>{{promocode.start_date}}</span>
                                        </td>
                                        <td style="vertical-align:middle">
                                            <span>{{promocode.end_date}}</span>
                                        </td>
                                        <td style="vertical-align:middle">
                                            <span>{{promocode.discount}}</span>
                                            <template v-if="!promocode.fixed">%</template>
                                            <template v-else> &#8381;</template>
                                        </td>
                                        <td style="vertical-align:middle">
                                            <template v-if="promocode.status === 1">
                                                <i class="fa fa-check-square" style="color: rgb(117, 172, 0);"></i>
                                            </template>
                                            <template v-else>
                                                <i class="fa fa-ban" style="color: rgb(218, 16, 33);"></i>
                                            </template>
                                        </td>
                                        <td>
                                            <a v-if="promocode.id !== null" href="#" v-on:click="editPromocode(promocode, $event)" class="btn btn-info btn-rounded btn-icon margin-inline" style="margin-bottom: 0px;"><i class="fa fa-pencil"></i></a>
                                            <span v-else class="btn btn-warning btn-rounded btn-icon margin-inline" style="margin-bottom: 0px;"><i class="fa fa-refresh"></i></span>
                                        </td>
                                    </tr>
                                    <tr v-if="onUpdate">
                                        <td colspan="7"><div class="icmn-spinner11 util-spin"></div> &nbsp;Обновляем список промокодов</td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="7">Вы еще не добавили ни одного промокода</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { getFromApi } from '~/utils/api'
  import moment from 'moment'

  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    created () {
      this.selfPromocodesList = this.promocodesList
      if (this.offerData !== undefined) {
        if (this.offerData.id !== undefined && this.offerData.id !== null && this.offerData.id !== '') {
          this.offer = this.offerData.id
        }
        if (this.promocodesList !== undefined && this.promocodesList !== null && this.promocodesList.length > 0) {
          this.shopModel.promocodesList = this.promocodesList
        }
      }
    },
    mounted () {
      miniToastr.init()
    },
    watch: {
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    props: [
      'promocodesList',
      'offerData'
    ],
    data: function () {
      return {
        onUpdate: false,
        offer: 0,
        edits: false,
        selfPromocodesList: [],
        shopModel: {
          promocodesList: [],
          code: '',
          title: '',
          description: '',
          fixed: 0,
          status: 0,
          discount: 0,
          startDate: moment().format('YYYY-MM-DD'),
          startTime: '00:00',
          finishDate: moment().add(1, 'days').format('YYYY-MM-DD'),
          finishTime: '00:00'
        }
      }
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          if (this.edits === true) {
            this.savePromocodeToDB(event)
          } else {
            this.addPromocodeToDB(event)
          }
        }
      },
      cancelEdit: function () {
        this.edits = false
        this.shopModel.code = ''
        this.shopModel.title = ''
        this.shopModel.description = ''
        this.shopModel.fixed = 0
        this.shopModel.status = 0
        this.shopModel.discount = 0
        this.shopModel.startDate = moment().format('YYYY-MM-DD')
        this.shopModel.startTime = '00:00'
        this.shopModel.finishDate = moment().add(1, 'days').format('YYYY-MM-DD')
        this.shopModel.finishTime = '00:00'
      },
      editPromocode: function (promocode, event) {
        event.preventDefault()
        this.edits = true
        this.shopModel.id = promocode.id
        this.shopModel.code = promocode.code
        this.shopModel.title = promocode.title
        this.shopModel.description = promocode.description
        this.shopModel.fixed = promocode.fixed
        this.shopModel.status = promocode.status
        this.shopModel.discount = promocode.discount
        this.shopModel.startDate = moment(promocode.start_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
        this.shopModel.startTime = moment(promocode.start_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
        this.shopModel.finishDate = moment(promocode.end_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
        this.shopModel.finishTime = moment(promocode.end_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
      },
      savePromocodeToDB: function () {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'updateOffersPromocode'
        let module = 'offers-promocode'

        button.setAttribute('disabled', 'disabled')
        button.classList.add('on-ajax')

        let data = {
          promocode: {
            code: self.shopModel.code,
            description: self.shopModel.description,
            discount: self.shopModel.discount,
            end_date: self.shopModel.finishDate + ', ' + self.shopModel.finishTime + ':00',
            fixed: self.shopModel.fixed,
            offer_id: self.offer,
            start_date: self.shopModel.startDate + ', ' + self.shopModel.startTime + ':00',
            status: self.shopModel.status,
            title: self.shopModel.title,
            id: self.shopModel.id
          }
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.removeAttribute('disabled')
            button.classList.remove('on-ajax')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Промокод успешно изменен!',
                type: 'success'
              })

              self.updatePromocodesList()
            } else {
              self.showMessage({
                title: 'Ошибка!',
                message: response.data.message,
                type: 'error'
              })
            }
          })
      },
      updatePromocodesList: function () {
        let self = this
        self.onUpdate = true
        getFromApi(undefined, 'offers-promocode', 'getOffersPromocodeList', {offer_id: self.offer}, this.$store.getters.guestToken)
          .then((response) => {
            self.onUpdate = false
            self.selfPromocodesList = (response.data !== undefined && response.data !== null && response.data.message !== undefined && response.data.message !== null && response.data.message.promocodes !== undefined ? response.data.message.promocodes : [])
          })
      },
      addPromocodeToDB: function (event) {
        let button = event.currentTarget
        let self = this
        let action = 'createOffersPromocode'
        let module = 'offers-promocode'

        button.setAttribute('disabled', 'disabled')
        button.classList.add('on-ajax')

        let data = {
          promocode: {
            code: self.shopModel.code,
            description: self.shopModel.description,
            discount: self.shopModel.discount,
            end_date: self.shopModel.finishDate + ', ' + self.shopModel.finishTime + ':00',
            fixed: self.shopModel.fixed,
            offer_id: self.offer,
            start_date: self.shopModel.startDate + ', ' + self.shopModel.startTime + ':00',
            status: self.shopModel.status,
            title: self.shopModel.title
          }
        }

        getFromApi(undefined, module, action, data, this.$store.getters.guestToken)
          .then((response) => {
            button.removeAttribute('disabled')
            button.classList.remove('on-ajax')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Промокод успешно сохранен!',
                type: 'success'
              })

              self.updatePromocodesList()
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