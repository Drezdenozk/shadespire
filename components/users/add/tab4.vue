<template>
    <div class="panel">
        <div class="panel-heading">
            <h5>
                Все рефералы
            </h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <TableList modelKey="" :data="data.reffData" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.reffData && data.columns"></TableList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import TableList from '~/components/render/table.vue'

  export default {
    created: function () {
      let module = ''
      let action = ''
      let options = {}
      this.data.query = [module, action, options]
      this.data.widgets = {searchByText: false, limit: false, pager: false}
      this.data.columns = [
        {
          name: 'Id',
          key: 'reff_id',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 40
        }, {
          name: 'Пользователь',
          key: 'reff_user',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Баланс',
          key: 'reff_balance',
          sortable: false,
          sortByDefault: false,
          needRender: true,
          width: 120
        }
      ]
      this.data.reffData = (this.reffData.list !== undefined && this.reffData.list !== null ? this.reffData.list : {})
      this.data.lastPage = (this.reffData.lastPage !== undefined && this.reffData.lastPage !== null ? this.reffData.lastPage : 1)
    },
    props: [
      'reffData', 'userId'
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
