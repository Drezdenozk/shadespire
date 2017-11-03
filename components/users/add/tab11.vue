<template>
    <section>
        <div class="row">
            <div class="col-lg-4">
                <div class="panel">
                    <div class="panel-heading">
                        <h5>
                            Корректировать баланс
                        </h5>
                    </div>
                    <div class="panel-body">
                        <form @submit.prevent="validateBeforeSubmit($event)" id="form-add-payments" name="form-validation" method="POST">
                            <div class="form-group" :class="{'has-danger': errors.has('sum') }">
                                <label class="form-label" for="promo-name" :class="{'has-danger': errors.has('sum') }">Сумма [в &#8381;]*</label>
                                <input data-vv-as="Сумма" v-validate="'required'" :class="{'has-danger': errors.has('sum') }" id="promo-name" name="sum" class="form-control" type="number" min="0" step="0.01" v-model="balanceModel.sum">

                                <div class="form-control-error" v-if="errors !== undefined && errors.has('sum')">
                                    <ul>
                                        <li>{{ errors.first('sum') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Направление *</label><br/>
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-primary-outline" :class="{'active' : balanceModel.direction === 'add'}">
                                        <input type="radio" v-bind:value="'add'" v-model="balanceModel.direction">
                                        Добавление
                                    </label>
                                    <label class="btn btn-primary-outline" :class="{'active' : balanceModel.direction === 'rem'}">
                                        <input type="radio" v-bind:value="'rem'" v-model="balanceModel.direction">
                                        Списание
                                    </label>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-danger': errors.has('comment') }">
                                <label class="form-label" for="promo-name" :class="{'has-danger': errors.has('comment') }">Комментарий</label>
                                <textarea data-vv-as="Комментарий" :class="{'has-danger': errors.has('comment') }" name="comment" id="promo-comment" class="form-control" type="text" v-model="balanceModel.comment"></textarea>

                                <div class="form-control-error" v-if="errors !== undefined && errors.has('comment')">
                                    <ul>
                                        <li>{{ errors.first('comment') }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-send"><i class="icmn-spinner6 util-spin"></i>Внести корректировки</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="step-block step-block-balance step-success margin-bottom-20">
                    <span class="step-digit">
                        <i class="icmn-stats-growth"></i>
                    </span>
                    <div class="step-desc">
                        <span class="step-title">Подтверждено</span>
                        <ul>
                            <template v-for="(item, index) in nBalance.approved">
                                <li>{{item}}
                                    <template v-if="index === 'RUB'"> &#x20BD</template>
                                    <template v-else-if="index === 'USD'">  $</template>
                                    <template v-else-if="index === 'EUR'"> &#x20AC</template>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <div class="step-block step-block-balance step-warning">
                    <span class="step-digit">
                        <i class="icmn-stats-growth"></i>
                    </span>
                    <div class="step-desc">
                        <span class="step-title">В ожидании</span>
                        <ul>
                            <template v-for="(item, index) in nBalance.hold">
                                <li>{{item}}
                                    <template v-if="index === 'RUB'"> &#x20BD</template>
                                    <template v-else-if="index === 'USD'">  $</template>
                                    <template v-else-if="index === 'EUR'"> &#x20AC</template>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import { getFromApi } from '~/utils/api'

  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    props: [
      'userId', 'balance'
    ],
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    created () {
      this.nBalance = this.balance
    },
    mounted () {
      miniToastr.init()
    },
    methods: {
      validateBeforeSubmit (event) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.addPaymentsToDB(event)
        }
      },
      addPaymentsToDB (event) {
        let button = (event.target).querySelector('.btn-send')
        let self = this
        let action = 'editUserBalance'
        let module = 'finance'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          user: self.userId,
          sum: self.balanceModel.sum,
          direction: self.balanceModel.direction,
          comment: self.balanceModel.comment
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            let num = self.balanceModel.sum
            if (self.balanceModel.direction !== 'add') {
              num = -1 * num
            }

            if (response.data.message === 'balance_edited_success') {
              self.showMessage({
                title: 'Успех!', message: 'Баланс успешно отредактрован', type: 'success'
              })
              if (Number.isInteger(num + self.nBalance['approved']['RUB'])) {
                self.nBalance['approved']['RUB'] = parseInt(num, 10) + parseInt(self.nBalance['approved']['RUB'], 10)
              } else if ((parseFloat(num, 10) + parseFloat(self.nBalance['approved']['RUB'], 10)) % 1 !== 0) {
                self.nBalance['approved']['RUB'] = (parseFloat(num, 10) + parseFloat(self.nBalance['approved']['RUB'], 10)).toFixed(2)
              } else {
                self.nBalance['approved']['RUB'] = (parseFloat(num, 10) + parseFloat(self.nBalance['approved']['RUB'], 10)).toFixed(0)
              }
            } else if (response.data.message === 'not_enough_money') {
              self.showMessage({
                title: 'Ошибка!', message: 'Недостаточно средств', type: 'error'
              })
            } else if (response.data.message === 'sum_is_empty') {
              self.showMessage({
                title: 'Ошибка!', message: 'Отправлено пустое или нулевое значение суммы', type: 'error'
              })
            } else if (response.data.message === 'user_not_found') {
              self.showMessage({
                title: 'Ошибка!', message: 'Пользователь не найден', type: 'error'
              })
            } else if (response.data.message === 'balance_edit_failed') {
              self.showMessage({
                title: 'Ошибка!', message: 'Ошибка редактирования баланса', type: 'error'
              })
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
        nBalance: {},
        balanceModel: {
          sum: '',
          direction: 'add',
          comment: ''
        }
      }
    }
  }
</script>
