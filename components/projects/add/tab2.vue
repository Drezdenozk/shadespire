<template>
	<div class="panel">
		<div class="panel-heading">
			<h5>
				Магазины проекта
			</h5>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-lg-12">
					<TableList modelKey="offers" :data="offerData" :project="project" :expansion="offerProjectData" :widgets="widgets" :lastPage="lastPage" :columns="columns" :query="query" v-if="offerData"></TableList>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
  import TableList from '~/components/render/table.vue'

  export default {
    components: {
      TableList
    },
    props: [
      'edit',
      'offerProjectData',
      'offerData',
      'project',
      'lastPage'
    ],
    data: function () {
      return {
        widgets: {
          searchByText: true,
          limit: true,
          pager: true
        },
        query: [
          'offers',
          'list',
          {orderBy: 'id DESC', paginator: {page: 1, limit: 100}}
        ],
        columns: [
          {
            name: 'Подключен',
            key: 'included',
            sortable: false,
            sortByDefault: false,
            width: 150,
            needRender: false
          }, {
            name: 'Id',
            key: 'id',
            sortable: true,
            sortByDefault: true,
            width: 40
          }, {
            name: 'Магазин',
            key: 'name',
            sortable: true,
            sortByDefault: false,
            needRender: true
          }, {
            name: 'Аггрегатор',
            key: 'aggregator',
            sortable: true,
            sortByDefault: false,
            needRender: true,
            width: 90
          }, {
            name: 'Страны',
            key: 'country',
            sortable: true,
            sortByDefault: false,
            needRender: true,
            width: 80
          }, {
            name: 'Доступен',
            key: 'available',
            sortable: false,
            sortByDefault: false,
            needRender: true,
            width: 70
          }, {
            name: '',
            key: 'shop_categories',
            sortable: false,
            sortByDefault: false,
            needRender: false,
            command: {
              stop: true,
              play: true,
              remove: 'shops-admin',
              edit: '/admin/shops/edit/'
            },
            width: '1%'
          }
        ]
      }
    }
  }
</script>