<template>
    <div class="panel">
        <div class="panel-heading">
            <h5>
                Все устройства
            </h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <TableList modelKey="" :data="data.entersData" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.entersData && data.columns"></TableList>
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
          key: 'id',
          sortable: false,
          sortByDefault: false,
          needRender: false,
          width: 40
        }, {
          name: 'IP',
          key: 'ip',
          sortable: false,
          sortByDefault: false,
          needRender: false
        }, {
          name: 'Устройство',
          key: 'app_info',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }
      ]
      this.data.entersData = (this.entersData !== undefined && this.entersData !== null ? this.entersData : {})
      this.data.lastPage = 1
    },
    props: [
      'entersData', 'userId'
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
