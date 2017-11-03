<template>
    <div class="panel">
        <div class="panel-heading">
            <div class="pull-right">
                <button class="btn btn-primary btn-xs" v-on:click="checkTickets($event)"><i class="icmn-spinner11"></i> проверить</button>
            </div>
            <h3>
                Тикеты
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table width="100%" class="table table-hover nowrap table-striped dataTable">
                            <thead>
                            <tr>
                                <th width="200">Название</th>
                                <th>ID для теста</th>
                                <th width="200"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="3"><strong>Публичные методы</strong></td>
                            </tr>
                            <tr>
                                <td>Мои тикеты</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Чтение тикета</td>
                                <td><input type="number" class="form-control input-sm" style="padding-top: 0;padding-bottom: 0" placeholder="ID тикета"/></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="3"><strong>Админские методы</strong></td>
                            </tr>
                            <tr>
                                <td>От пользователей</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>От партнеров</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Чтение тикета</td>
                                <td><input type="number" class="form-control input-sm" style="padding-top: 0;padding-bottom: 0" placeholder="ID тикета"/></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getFromApi } from '~/utils/api'

    export default {
      methods: {
        checkTickets: function (event) {
          event.currentTarget.setAttribute('disabled', 'disabled')
          event.currentTarget.classList.toggle('btn-primary')
          event.currentTarget.classList.toggle('btn-warning')
          event.currentTarget.innerText = 'Проверяется...'

          let module = 'news'
          let action = 'getNewsList'
          let options = {}
          return getFromApi(null, module, action, options)
            .then((res) => {

            })
        }
      }
    }
</script>