<template>
    <div class="panel">
        <div class="panel-heading">
            <h5>
                Все выплаты
            </h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <TableList modelKey="withdraws" :data="data.withdraws" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.withdraws && data.columns"></TableList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import TableList from '~/components/render/table.vue'

  export default {
    created: function () {
      let module = 'users'
      let action = 'getWithdrawsByUser'
      let options = {
        user: this.userId,
        paginator: {
          page: 1,
          limit: 100
        },
        orderBy: 'id DESC'
      }
      this.data.query = [module, action, options]
      this.data.widgets = {searchByText: true, limit: true, pager: true}
      this.data.columns = [
        {
          name: 'Создана',
          key: 'created',
          sortable: true,
          sortByDefault: true,
          needRender: true,
          width: 120
        }, {
          name: 'Пользователь',
          key: 'user_name',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'E-mail',
          key: 'user_mail',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Проект',
          key: 'order_project',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 145
        }, {
          name: 'Платежная система',
          key: 'withdraw_provider',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 185
        }, {
          name: 'Реквизиты',
          key: 'withdraw_wallets',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 160
        }, {
          name: 'Сумма',
          key: 'sum',
          sortable: true,
          sortByDefault: false,
          needRender: true,
          width: 120
        }, {
          name: 'Комиссия',
          key: 'comission',
          sortable: true,
          sortByDefault: false,
          needRender: true,
          width: 120
        }, {
          name: 'Комментарий',
          key: 'comment',
          sortable: false,
          sortByDefault: false,
          needRender: false,
          width: 120
        }, {
          name: 'Статус',
          key: 'withdraw_status',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 160
        }
      ]
      this.data.withdraws = (this.financeData.withdraws !== undefined && this.financeData.withdraws !== null ? this.financeData.withdraws : {})
      this.data.lastPage = (this.financeData.lastPage !== undefined && this.financeData.lastPage !== null ? this.financeData.lastPage : 1)
    },
    props: [
      'financeData', 'userId'
    ],
    data: function () {
      return {
        data: {
        }
      }
    },
    components: {
      TableList
    }
  }
</script>
