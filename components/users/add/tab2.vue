<template>
	<div class="panel">
		<div class="panel-heading">
			<h5>
				Все заказы
			</h5>
		</div>
		<div class="panel-body">
			<TableList modelKey="orders" :data="data.orders" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.columns"></TableList>
		</div>
	</div>
</template>


<script>
  import TableList from '~/components/render/table.vue'

  export default {
    created: function () {
      let module = 'users'
      let action = 'getOrdersByUser'
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
          name: 'Id',
          key: 'id',
          sortable: true,
          sortByDefault: true,
          width: 40
        }, {
          name: 'Добавлен',
          key: 'created',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 130
        }, {
          name: 'Обновлен',
          key: 'updated',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 130
        }, {
          name: 'Проект',
          key: 'order_projectName',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 130
        }, {
          name: 'Магазин',
          key: 'order_shop',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 220
        }, {
          name: 'Кэшбэк',
          key: 'create_all',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 110
        }, {
          name: 'Нам',
          key: 'create_our',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 110
        }, {
          name: 'Партнёру',
          key: 'create_partner',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 110
        }, {
          name: 'Пользователю',
          key: 'create_user',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 110
        }, {
          name: 'Рефоводу',
          key: 'create_reff',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 110
        }, {
          name: 'Покупатель',
          key: 'order_user_name',
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
          name: 'Статус',
          key: 'order_status',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 150
        }
      ]
      this.data.orders = (this.ordersData.orders !== undefined && this.ordersData.orders !== null ? this.ordersData.orders : {})
      this.data.lastPage = (this.ordersData.lastPage !== undefined && this.ordersData.lastPage !== null ? this.ordersData.lastPage : 1)
    },
    props: [
      'ordersData', 'userId'
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