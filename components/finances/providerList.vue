<template>
    <form>
        <table class="table table-hover nowrap table-striped dataTable" width="100%">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Комиссия, в %</th>
                    <th>Доп. комиссия, в &#8381;</th>
                    <th>Min выплата, в &#8381;</th>
                    <th>Max выплата, в &#8381;</th>
                    <th>Включен</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!providerList.length > 0">
                    <tr>
                        <td colspan="7">Провайдеры не найдены</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(provider, key) in providerList" :id="'pr-' + providerList[key].id">
                        <td style="vertical-align: middle">
                            {{provider.name}}
                        </td>
                        <td style="vertical-align: middle">
                            <input type="number" class="form-control" v-model="providerList[key].percent_comission" min="0" step="0.01"/>
                        </td>
                        <td style="vertical-align: middle">
                            <input type="number" class="form-control" v-model="providerList[key].static_comission" min="0" step="0.01"/>
                        </td>
                        <td style="vertical-align: middle">
                            <input type="number" class="form-control" v-model="providerList[key].min_pay" min="0" step="0.01"/>
                        </td>
                        <td style="vertical-align: middle">
                            <input type="number" class="form-control" v-model="providerList[key].max_pay" min="0" step="0.01"/>
                        </td>
                        <td style="vertical-align: middle" width="120">
                            <div class="btn-group" data-toggle="buttons">
                                <label style="margin-bottom: 0px" class="btn btn-primary-outline" :class="{'active' : providerList[key].status === 1}">
                                    <input type="radio" value="1" v-model.number="providerList[key].status">
                                    Да
                                </label>
                                <label style="margin-bottom: 0px" class="btn btn-primary-outline" :class="{'active' : providerList[key].status === 0}">
                                    <input type="radio" value="0" v-model.number="providerList[key].status">
                                    Нет
                                </label>
                            </div>
                        </td>
                        <td style="vertical-align: middle" width="230">
                            <div class="form-actions" style="padding: 0;margin: 0;border:none;">
                                <div role="group" class="btn-group">
                                    <button type="button" v-on:click="updateProvider($event, key)" class="btn btn-primary"><i class="icmn-spinner6 util-spin"></i>Сохранить</button>
                                    <button type="button" v-on:click="removeProvider(providerList[key].id)" class="btn btn-danger"><i class="icmn-spinner6 util-spin"></i>Отключить</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </form>
</template>

<script>
  import { getFromApi } from '~/utils/api'

  export default {
    props: ['withdrawsProviders'],
    created: function () {
      this.providerList = this.withdrawsProviders
    },
    watch: {
      withdrawsProviders: function () {
        this.providerList = this.withdrawsProviders
      }
    },
    data: function () {
      return {
        providerList: []
      }
    },
    notifications: {
      showMessage: {
        title: '',
        message: '',
        type: 'error'
      }
    },
    methods: {
      removeProvider: function (id) {
        let self = this
        self.$swal({
          title: 'Вы уверены?',
          text: 'Вы пытаетесь отключить провайдера!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да, отключить провайдера!',
          cancelButtonText: 'Отмена'
        }).then(function () {
          return getFromApi(null, 'withdraws-providers', 'deleteWithdrawsProviders', {withdrawsProvider: {id: id}})
            .then(function (res) {
              if (res.data.message === 'withdraws_provider_delete_successfully') {
                self.$swal({
                  title: 'Успех!',
                  text: 'Провайдер с id "' + id + '" был успешно отключен',
                  type: 'success',
                  timer: 2000
                })

                document.querySelector('tr#pr-' + id).style.opacity = 0.5
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке отключить провайдера c id ' + id,
                  type: 'error',
                  timer: 2000
                })
              }
            })
        })
      },
      updateProvider: function (event, key) {
        let button = event.currentTarget
        let self = this
        let action = 'editWithdrawsProviders'
        let module = 'withdraws-providers'

        button.classList.add('on-ajax')
        button.setAttribute('disabled', 'disabled')

        let data = {
          withdrawsProvider: {
            id: self.providerList[key].id,
            max_pay: self.providerList[key].max_pay,
            min_pay: self.providerList[key].min_pay,
            percent_comission: self.providerList[key].percent_comission,
            static_comission: self.providerList[key].static_comission,
            status: self.providerList[key].status
          }
        }

        getFromApi(undefined, module, action, data)
          .then((response) => {
            button.classList.remove('on-ajax')
            button.removeAttribute('disabled')

            if (response.data.status === 'success') {
              self.showMessage({
                title: 'Успех!',
                message: 'Данные провайдера обновлены',
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