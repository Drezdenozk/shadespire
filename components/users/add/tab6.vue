<template>
    <div class="panel">
        <div class="panel-heading">
            <h5>
                Все тикеты 
            </h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <TableList modelKey="tickets" :data="data.ticketsData" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.ticketsData && data.columns"></TableList>
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
      let action = 'getTicketsByUser'
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
          name: 'Создан',
          key: 'created',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 130
        }, {
          name: 'Последний ответ',
          key: 'updated',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 130
        }, {
          name: 'Статус',
          key: 'tickets_status',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 120
        }, {
          name: 'Проект',
          key: 'tickets_from_project',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Заголовок',
          key: 'tickets_title',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Ответственный',
          key: 'tickets_moderator',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }
      ]
      this.data.ticketsData = (this.ticketsData.tickets !== undefined && this.ticketsData.tickets !== null ? this.ticketsData.tickets : {})
      this.data.lastPage = (this.ticketsData.lastPage !== undefined && this.ticketsData.lastPage !== null ? this.ticketsData.lastPage : 1)
    },
    props: [
      'ticketsData', 'userId'
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
