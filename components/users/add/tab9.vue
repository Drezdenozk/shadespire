<template>
    <section>
        <div class="row">
            <div class="col-lg-4">
                <div class="panel">
                    <div class="panel-heading">
                        <h5>
                            Добавить реквизиты
                        </h5>
                    </div>
                    <div class="panel-body">
                        <form @submit.prevent="validateBeforeSubmit($event)" id="form-add-payments" name="form-validation" method="POST">
                            <div class="form-group" :class="{'has-danger': errors.has('provider') }">
                                <label class="form-label" :class="{'has-danger': errors.has('provider') }">Провайдер *</label>
                                <multiselect :custom-label="customLabel" :class="{'has-danger': errors.has('provider') }" placeholder="Укажите провайдера" v-model="payModel.provider" track-by="id" :options="providerList"></multiselect>

                                <select data-vv-as="Провайдер" v-validate="'required'" name='provider' v-model="payModel.provider" style="display: none;">
                                    <template v-for="provider in providerList">
                                        <option :value="provider.id">{{provider.name}}</option>
                                    </template>
                                </select>
                                <div class="form-control-error" v-if="errors !== undefined && errors.has('provider')">
                                    <ul>
                                        <li>{{ errors.first('provider') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('number') }">
                                <label class="form-label" for="promo-name" :class="{'has-danger': errors.has('number') }">Номер *</label>
                                <input data-vv-as="Номер" v-validate="'required'" :class="{'has-danger': errors.has('number') }" id="promo-name" name="number" class="form-control" type="text" v-model="payModel.number">

                                <div class="form-control-error" v-if="errors !== undefined && errors.has('number')">
                                    <ul>
                                        <li>{{ errors.first('number') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="payModel.provider.id !== undefined && payModel.provider.id === 4" class="form-group" :class="{'has-danger': errors.has('holdername') }">
                                <label class="form-label" for="promo-name" :class="{'has-danger': errors.has('holdername') }">Держатель *</label>
                                <input data-vv-as="Держатель" v-validate="'required'" :class="{'has-danger': errors.has('holdername') }" name="holdername" id="promo-holdername" class="form-control" type="text" v-model="payModel.holdername">

                                <div class="form-control-error" v-if="errors !== undefined && errors.has('holdername')">
                                    <ul>
                                        <li>{{ errors.first('holdername') }}</li>
                                    </ul>
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
                                    <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i>Добавить реквизиты</button>
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
                            Все реквизиты
                        </h5>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table width="100%" class="table table-hover nowrap table-striped dataTable">
                                <thead>
                                    <tr>
                                        <th width="40">Id</th>
                                        <th width="200">Провайдер</th>
                                        <th>Реквизиты</th>
                                        <th width="70"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="paymentsList.length > 0">
                                        <tr v-for="(payment, index) in paymentsList">
                                            <td width="40">{{payment.id}}</td>
                                            <td>{{getProviderName(payment.provider)}}</td>
                                            <td>{{payment.number}} {{payment.holdername}}</td>
                                            <td width="70">
                                                <button type="button" v-tooltip.top-center="'Редактировать реквизиты'" v-on:click="editPayments(payment.id, index, $event)" class="btn btn-info btn-rounded btn-icon margin-inline" style="margin-bottom: 0px;"><i class="fa fa-pencil"></i></button>
                                                <button type="button" v-on:click="remove_event(payment.id)" v-tooltip.top-center="'Удалить реквизиты'" class="btn btn-danger btn-rounded btn-icon margin-inline" style="margin-bottom: 0px;"><i class="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="4">У пользователя нет добавленных реквизитов</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-center margin-top-20" v-if="!componentReady">
                            <div class="icmn-spinner11 util-spin"></div> &nbsp;Обновляем список реквизитов
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import TableList from '~/components/render/table.vue'
  import Multiselect from 'vue-multiselect'
  import { getFromApi } from '~/utils/api'
  import { mapGetters } from 'vuex'

  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    props: [
      'paymentsData', 'userId', 'providerList'
    ],
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    mounted () {
      miniToastr.init()
    },
    computed: mapGetters(['loggedUser']),
    created: function () {
      this.paymentsList = this.paymentsData
    },
    methods: {
      remove_event: function (id) {
        let self = this

        self.$swal({
          title: 'Вы уверены?',
          text: 'Вы пытаетесь удалить реквизиты пользователя!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да, удалить реквизиты!',
          cancelButtonText: 'Отмена'
        }).then(function () {
          return getFromApi(null, 'users-payment-details', 'deletePaymentDetails', {id: id})
            .then(function (res) {
              if (res.data.message === 'payment_details_delete_successfully') {
                self.$swal({
                  title: 'Успех!',
                  text: 'Реквизиты с id "' + id + '" был успешно удалены',
                  type: 'success',
                  timer: 2000
                })
                self.componentReady = false
                self.refreshPaymentsList()
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке удалить реквизиты c id ' + id,
                  type: 'error',
                  timer: 2000
                })
              }
            })
        })
      },
      cancelEdit: function () {
        this.edits = false
        this.payModel = {
          provider: '',
          number: '',
          holdername: ''
        }
        this.$validator.reset()
      },
      editPayments: function (id, index) {
        this.edits = true
        this.payModel = {
          provider: {
            id: this.paymentsList[index].provider,
            name: this.paymentsList[index].provider_name
          },
          id: id,
          number: this.paymentsList[index].number,
          holdername: this.paymentsList[index].holdername
        }
      },
      getProviderName: function (provider) {
        for (let i = 0; i < this.providerList.length; i++) {
          if (this.providerList[i].id === provider) {
            return this.providerList[i].name
          }
        }
      },
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addPaymentsToDB(event)
        }
      },
      customLabel (option) {
        return `${option.name}`
      },
      refreshPaymentsList () {
        let self = this
        Promise.all([
          getFromApi(undefined, 'users-payment-details', 'getListPaymentDetails', {
            user_id: self.userId,
            paginator: {
              page: 1,
              limit: 100
            },
            orderBy: 'id DESC'}, self.loggedUser)
        ]).then((values) => {
          self.paymentsList = (values[0].data !== undefined && values[0].data !== null && values[0].data.message !== undefined && values[0].data.message !== null && values[0].data.message.paymentDetails !== undefined && values[0].data.message.paymentDetails !== null ? values[0].data.message.paymentDetails : {})
          self.componentReady = true
        })
      },
      addPaymentsToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'createPaymentDetails'
        let module = 'users-payment-details'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          user: self.userId,
          provider: self.payModel.provider.id,
          number: self.payModel.number,
          holdername: (self.payModel.provider.id !== 4 ? '' : self.payModel.provider.holdername)
        }

        if (self.edits === true) {
          data.id = self.payModel.id
          action = 'updatePaymentDetails'
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success' && response.data.message === 'payment_details_create_successfully') {
              self.showMessage({
                title: 'Успех!', message: 'Реквизиты успешно добавлены', type: 'success'
              })
              self.componentReady = false
              self.refreshPaymentsList()
            } else if (response.data.status === 'success' && response.data.message === 'payment_details_update_successfully') {
              self.showMessage({
                title: 'Успех!', message: 'Реквизиты успешно обновлены', type: 'success'
              })
              self.componentReady = false
              self.refreshPaymentsList()
            } else {
              self.showMessage({
                title: 'Ошибка!', message: response.data.message, type: 'error'
              })
            }
          })
      }
    },
    data: function () {
      return {
        componentReady: true,
        edits: false,
        payModel: {
          provider: '',
          number: '',
          holdername: ''
        }
      }
    },
    components: {
      Multiselect,
      TableList
    }
  }
</script>
