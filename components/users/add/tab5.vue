<template>
    <div class="panel">
        <div class="panel-heading">
            <h5>
                Все отзывы 
            </h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-lg-12">
                    <TableList modelKey="offersReviews" :data="data.offersReviews" :widgets="data.widgets" :lastPage="data.lastPage" :columns="data.columns" :query="data.query" v-if="data.offersReviews && data.columns"></TableList>
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
      let action = 'getOfferReviewsByUser'
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
          name: 'Создан',
          key: 'created',
          sortable: true,
          sortByDefault: true,
          needRender: true,
          width: 120
        }, {
          name: 'Магазин',
          key: 'review_shop',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Рейтинг',
          key: 'review_rating',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }, {
          name: 'Текст',
          key: 'review_text',
          sortable: false,
          sortByDefault: false,
          needRender: true
        }
      ]
      this.data.offersReviews = (this.reviewsData.offersReviews !== undefined && this.reviewsData.offersReviews !== null ? this.reviewsData.offersReviews : {})
      this.data.lastPage = (this.reviewsData.lastPage !== undefined && this.reviewsData.lastPage !== null ? this.reviewsData.lastPage : 1)
    },
    props: [
      'reviewsData', 'userId'
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
