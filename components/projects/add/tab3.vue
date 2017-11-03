<template>
	<div class="panel">
		<div class="panel-heading">
			<h5>
				Персонал проекта
			</h5>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-lg-12">
					<TableList modelKey="users" :data="userData" :widgets="widgets" :lastPage="lastPage" :columns="columns" :query="query" v-if="userData"></TableList>
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
      'userData',
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
          'users',
          'list',
          {orderBy: 'id DESC', paginator: {page: 1, limit: 100}, registeredby: this.project, byGroup: [3, 4, 6, 7]}
        ],
        columns: [
          {
            name: 'Id',
            key: 'id',
            sortable: true,
            sortByDefault: true,
            width: 40
          }, {
            name: 'ФИО',
            key: 'secondname',
            sortable: true,
            sortByDefault: false,
            needRender: true
          }, {
            name: 'E-mail',
            key: 'email',
            sortable: true,
            sortByDefault: false,
            needRender: true
          }, {
            name: 'Группа',
            key: 'groups',
            sortable: true,
            sortByDefault: false,
            needRender: true
          }, {
            name: 'Создан',
            key: 'created',
            sortable: true,
            sortByDefault: false,
            needRender: true
          }, {
            name: 'Активен',
            key: 'lastActivity',
            sortable: true,
            sortByDefault: false,
            needRender: false,
            lastActivity: true
          }, {
            name: '',
            key: 'lastActivity',
            sortable: false,
            sortByDefault: false,
            needRender: false,
            command: {
              remove: 'users-admin',
              edit: '/admin/users/edit/'
            },
            width: '1%'
          }
        ]
      }
    }
  }
</script>