<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h5>Список макросов</h5>
        </div>
        <div class="panel-body">
            <ul class="list-group" data-type="all" style="margin:-1px;">
                <li class="list-group-item">
                    <span class="pull-right">Текущая дата в формате д.м.г ч.м.с</span>
                    <span class="label label-info" v-html="'&#123;&#123;NOW&#125;&#125;'"></span>
                </li>
                <li class="list-group-item">
                    <span class="pull-right">Текущий год</span>
                    <span class="label label-info" v-html="'&#123;&#123;YEAR&#125;&#125;'"></span>
                </li>
                <li class="list-group-item">
                    <span class="pull-right">Название проекта</span>
                    <span class="label label-info" v-html="'&#123;&#123;PROJECT_NAME&#125;&#125;'"></span>
                </li>
                <li class="list-group-item">
                    <span class="pull-right">Ссылка на сайт проекта</span>
                    <span class="label label-info" v-html="'&#123;&#123;PROJECT_LINK&#125;&#125;'"></span>
                </li>
                <li class="list-group-item">
                    <span class="pull-right">Ссылка на настройки (для отписки)</span>
                    <span class="label label-info" v-html="'&#123;&#123;CANCEL_SUB&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="cash === true">
                    <span class="pull-right">Одобренная сумма кешбека</span>
                    <span class="label label-info" v-html="'&#123;&#123;CASHBACK_APPROVED_SUM&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="cash === true">
                    <span class="pull-right">Магазин в котором совершена покупка</span>
                    <span class="label label-info" v-html="'&#123;&#123;CASHBACK_SHOP&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="cash === true">
                    <span class="pull-right">ID заказа в магазине</span>
                    <span class="label label-info" v-html="'&#123;&#123;CASHBACK_EXTID&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="cash === true">
                    <span class="pull-right">ID заказа в системе (для составления URL)</span>
                    <span class="label label-info" v-html="'&#123;&#123;CASHBACK_ORDER&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="tickets === true">
                    <span class="pull-right">Заголовок тикета</span>
                    <span class="label label-info" v-html="'&#123;&#123;TICKET_TITLE&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="tickets === true">
                    <span class="pull-right">Идентификатор тикета (для составления URL)</span>
                    <span class="label label-info" v-html="'&#123;&#123;TICKET_ID&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="wallets === true">
                    <span class="pull-right">Сумма для вывода</span>
                    <span class="label label-info" v-html="'&#123;&#123;WDS_SUM&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="wallets === true">
                    <span class="pull-right">Платежная система</span>
                    <span class="label label-info" v-html="'&#123;&#123;WDS_PROVIDER&#125;&#125;'"></span>
                </li>
                <li class="list-group-item" v-if="wallets === true">
                    <span class="pull-right">Реквизиты кошелька</span>
                    <span class="label label-info" v-html="'&#123;&#123;WDS_WALLET&#125;&#125;'"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
      computed: {
        cash: function () {
          if (this.types !== undefined && this.types !== null && this.types !== '') {
            if (this.types === 'CASHBACK_OPEN' || this.types === 'CASHBACK_APPROVE' || this.types === 'CASHBACK_REJECT') {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        },
        tickets: function () {
          if (this.types !== undefined && this.types !== null && this.types !== '') {
            if (this.types === 'TICKET_ANSWERED' || this.types === 'TICKET_CREATED' || this.types === 'TICKET_CLOSED') {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        },
        wallets: function () {
          if (this.types !== undefined && this.types !== null && this.types !== '') {
            if (this.types === 'WITHDRAW_SUCCESS' || this.types === 'WITHDRAW_REQUEST') {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        }
      },
      props: ['types']
    }
</script>