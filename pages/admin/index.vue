<template>
  <section class="main-stat">
    <div class="panel">
      <div class="panel-heading"></div>
      <h3>Добавить карту</h3>
      <form>
        <div class="card">
          <h4 class="card-header">
            Для банды:
          </h4>
          <div class="card-body">
            <div class="form-group">
              <label>Название карты</label>
              <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="form-group">
              <label>Кому подходит</label>
              <select class="form-control">
                <option>Выберите банду</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label>Тип карты</label>
              <select class="form-control">
                <option>Выберите тип</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label>Текст на карте</label>
              <textarea class="form-control" placeholder=""></textarea>
            </div>
          </div>
        </div>
        <div class="action-group">
          <button type="submit" class="btn btn-primary">Сохранить</button>
          <button type="submit" class="btn btn-info">Распечатать</button>
        </div>
    </div>
  </section>
</template>
<script>
import { getFromApi } from '~/utils/api'
import moment from 'moment'
let miniToastr
if (process.browser) {
  miniToastr = require('mini-toastr')
}
export default {
  mounted () {
    miniToastr.init()
    this.chart = true
  },
  transition (to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  layout: 'default',
  head: {
    bodyAttrs: {
      class: 'theme-dark'
    },
    title: 'Cashback Wmr Panel',
    meta: [
      {
        hid: 'Cashback Wmr Panel',
        name: 'Cashback Wmr Panel',
        content: 'Cashback Wmr Panel'
      }
    ]
  },
  computed: {
    checkNewCustomers: function () {
      let val = 'col-lg-12'
      if (this.activedTab === 0 && this.data.orders.new.today.count.new_users > 0) {
        val = 'col-lg-6'
      } else if (this.activedTab === 1 && this.data.orders.new.yesterday.count.new_users > 0) {
        val = 'col-lg-6'
      } else if (this.activedTab === 2 && this.data.orders.new.month.count.new_users > 0) {
        val = 'col-lg-6'
      }
      return val
    },
    checkNewCustomers2: function () {
      let val = 'col-lg-4'
      if (this.activedTab === 0 && this.data.orders.new.today.count.new_users > 0) {
        val = 'col-lg-3'
      } else if (this.activedTab === 1 && this.data.orders.new.yesterday.count.new_users > 0) {
        val = 'col-lg-3'
      } else if (this.activedTab === 2 && this.data.orders.new.month.count.new_users > 0) {
        val = 'col-lg-3'
      }
      return val
    },
    checkNewCustomers3: function () {
      let val = 'col-lg-4'
      if (this.activedTab === 0 && this.data.orders.new.today.count.new_users > 0) {
        val = 'col-lg-6'
      } else if (this.activedTab === 1 && this.data.orders.new.yesterday.count.new_users > 0) {
        val = 'col-lg-6'
      } else if (this.activedTab === 2 && this.data.orders.new.month.count.new_users > 0) {
        val = 'col-lg-6'
      }
      return val
    }
  },
  data: function () {
    return {
      activedTab: 0,
      chart: false
    }
  },
  notifications: {
    showMessage: {
      title: '',
      message: '',
      type: 'error'
    }
  },
  methods: {
    createDay: function (dWeek) {
      dWeek = parseInt(dWeek)
      let day = ''
      switch (dWeek) {
        case 1:
          day = 'прошлым понедельником'
          break
        case 2:
          day = 'прошлым вторником'
          break
        case 3:
          day = 'прошлой средой'
          break
        case 4:
          day = 'прошлым четвергом'
          break
        case 5:
          day = 'прошлой пятницей'
          break
        case 6:
          day = 'прошлой субботой'
          break
        case 0:
          day = 'прошлым воскресеньем'
          break
      }
      return day
    },
    createD: function (date) {
      let self = this
      let val = ''
      switch (date) {
        case 'day':
          val = 'предыдущим днем по ' + moment(self.data.dates.yesterday.byCurrentTime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
          break
        case 'week':
          val = self.createDay(moment(self.data.dates.yesterdayPreviousWeek.from, 'YYYY-MM-DD HH:mm:ss').format('e')) + ' (' + moment(self.data.dates.yesterdayPreviousWeek.from, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY') + ')'
          break
        case 'month':
          val = 'предыдущим месяцем по ' + moment(self.data.dates.yesterday.byCurrentTime, 'YYYY-MM-DD HH:mm:ss').format('DD') + ' число'
          break
      }
      return val
    },
    getClass: function (tab) {
      if (this.activedTab === tab) {
        return 'btn-primary'
      } else {
        return 'btn-default'
      }
    },
    changeTab: function (tab) {
      this.activedTab = tab
    },
    getDate: function () {
      let temp = new Date()
      return temp.getDate() + '.' + (temp.getMonth() + 1) + '.' + temp.getFullYear()
    }
  },
  asyncData ({ req }) {
    return Promise.all([
      getFromApi(req, 'statistics', 'getMainPagestats2', {})
    ]).then((values) => {
      let defaultOptions = function () {
        let temp = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Структура заказов'
          },
          tooltip: {
            pointFormat: '{point.all}'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b>: {point.all}'
              },
              showInLegend: true
            }
          },
          credits: {
            enabled: false
          },
          series: []
        }
        return temp
      }
      let systemStat1 = defaultOptions()
      systemStat1.series = [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Заказов от текущих пользователей: ' + (values[0].data.message.orders.new.today.count.number - values[0].data.message.orders.new.today.count.new_users),
          color: '#46be8a',
          y: (values[0].data.message.orders.new.today.count.number - values[0].data.message.orders.new.today.count.new_users),
          all: (values[0].data.message.orders.new.today.count.number - values[0].data.message.orders.new.today.count.new_users)
        }, {
          name: 'Заказов от новых пользователей: ' + values[0].data.message.orders.new.today.count.new_users,
          color: '#0190da',
          y: values[0].data.message.orders.new.today.count.new_users,
          all: values[0].data.message.orders.new.today.count.new_users,
          sliced: true,
          selected: true
        }]
      }]
      let systemStat2 = defaultOptions()
      systemStat2.series = [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Заказов от текущих пользователей: ' + (values[0].data.message.orders.new.yesterday.count.number - values[0].data.message.orders.new.yesterday.count.new_users),
          color: '#46be8a',
          y: (values[0].data.message.orders.new.yesterday.count.number - values[0].data.message.orders.new.yesterday.count.new_users),
          all: (values[0].data.message.orders.new.yesterday.count.number - values[0].data.message.orders.new.yesterday.count.new_users)
        }, {
          name: 'Заказов от новых пользователей: ' + values[0].data.message.orders.new.yesterday.count.new_users,
          color: '#0190da',
          y: values[0].data.message.orders.new.yesterday.count.new_users,
          all: values[0].data.message.orders.new.yesterday.count.new_users,
          sliced: true,
          selected: true
        }]
      }]
      let systemStat3 = defaultOptions()
      systemStat3.series = [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Заказов от текущих пользователей: ' + (values[0].data.message.orders.new.month.count.number - values[0].data.message.orders.new.month.count.new_users),
          color: '#46be8a',
          y: (values[0].data.message.orders.new.month.count.number - values[0].data.message.orders.new.month.count.new_users),
          all: (values[0].data.message.orders.new.month.count.number - values[0].data.message.orders.new.month.count.new_users)
        }, {
          name: 'Заказов от новых пользователей: ' + values[0].data.message.orders.new.month.count.new_users,
          color: '#0190da',
          y: values[0].data.message.orders.new.month.count.new_users,
          all: values[0].data.message.orders.new.month.count.new_users,
          sliced: true,
          selected: true
        }]
      }]
      // [values[0].data.message.system_earned.approved.today.number]
      // [values[0].data.message.system_earned.holded.today.number]
      let data = {
        links: values[0].data.message.linkstats,
        registered: values[0].data.message.registered,
        orders: values[0].data.message.orders,
        money: values[0].data.message.system_earned,
        reviews: values[0].data.message.reviews,
        dates: values[0].data.message.dates
      }
      return {
        data: data,
        systemStat1: systemStat1,
        systemStat2: systemStat2,
        systemStat3: systemStat3,
        stats: (values[0].data !== undefined && values[0].data !== null && values[0].data.message !== undefined && values[0].data.message !== null ? values[0].data.message : {})
      }
    })
  }
}
</script>