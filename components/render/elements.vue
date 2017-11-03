<script>
  import moment from 'moment'

  export default {
    props: [
      'data',
      'column'
    ],
    methods: {
      clickHandler: function (event) {
        event.preventDefault()
        let positions = this.data.positions
        let html = '<div style="float:right">'
        if (this.data.requests !== undefined && this.data.requests.length > 0) {
          html += '<ul>'
          html += '<li style="display: block; text-align: left;"><strong>Последний переход: </strong>' + moment(this.data.requests[this.data.requests.length - 1]['date'], 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm') + '</li>'
          html += '<li style="display: block; text-align: left;"><strong>Метка: </strong>' + this.data.requests[this.data.requests.length - 1]['mark'] + '</li>'
          if (this.data.requests[this.data.requests.length - 1]['adblock'] !== undefined && this.data.requests[this.data.requests.length - 1]['adblock'] === 1) {
            html += '<li style="display: block; text-align: left;"><strong>AdBLock:</strong> Опознан</li>'
          }
          let self = this
          Object.keys(this.data.requests[this.data.requests.length - 1]['from_device']).map(function (key) {
            html += '<li style="display: block; text-align: left;"><strong>' + key + ': </strong>' + self.data.requests[self.data.requests.length - 1]['from_device'][key] + '</li>'
          })
          html += '</ul>'
        }
        html += '</div><h5 style="text-align:left;"><strong>Дата: </strong>' + moment(this.data.created, 'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY, HH:mm') + '</h5><h5 style="text-align:left;">Магазин: ' + this.data.offer.name + '</h5><h5 style="text-align:left;">Сумма заказа: ' + parseFloat(this.data.order_total, 10).toFixed(2) + ' \u20BD</h5><h5 style="text-align:left;">№ заказа: ' + this.data.extid + '</h5><div class="table-responsive"><table class="table table-hover nowrap table-striped dataTable">' +
                '<thead>' +
                '<tr>' +
                '<th>#</th>' +
                '<th>Категория [id]</th>' +
                '<th>Наименование</th>' +
                '<th>Кол-во</th>' +
                '<th>Стоимость</th>' +
                '<th>Рейтинг</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'
        for (let i = 0; i < positions.length; i++) {
          html += '<tr>' +
                  '<td>' + positions[i].id + '</td>' +
                  '<td>' + positions[i].product_category_name + ' [' + positions[i].product_category_id + ']' + '</td>' +
                  '<td><a href="' + positions[i].product_url + '">' + positions[i].product_name + '</a></td>' +
                  '<td>' + positions[i].amount + '</td>' +
                  '<td>' + positions[i].payment + '</td>' +
                  '<td>' + positions[i].rate + '</td>' +
                  '</tr>'
        }
        html += '</tbody></table></div>'
        if (positions !== undefined && positions !== null && positions.length > 0) {
          let self = this
          self.$swal({
            width: 900,
            title: 'Информация о заказе:',
            html: html,
            type: 'info'
          })
        }
      },
      dataToggle: function (event) {
        event.preventDefault()
        let target = event.target
        let targetFire = target.getAttribute('href')
        let element = document.querySelector(targetFire)
        element.classList.toggle('in')
      }
    },
    render: function (h) {
      var value = ''
      var oldValue = ''
      var tag = 'a'
      var attr = {}

      switch (this.column) {
        case 'secondname':
          value = []
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.id
            }
          }

          if (this.data.secondName !== undefined && this.data.secondName !== null && this.data.secondName !== '') {
            value.push(this.data.secondName)
          }
          if (this.data.firstName !== undefined && this.data.firstName !== null && this.data.firstName !== '') {
            value.push(this.data.firstName)
          }
          if (this.data.thirdName !== undefined && this.data.thirdName !== null && this.data.thirdName !== '') {
            value.push(this.data.thirdName)
          }
          if (this.data.is_reseller !== undefined && this.data.is_reseller !== null && this.data.is_reseller) {
            value.unshift('[Реселлер]')
          }
          if (value.length === 0) {
            value.push('-')
          }

          value = value.join(' ')
          break

        case 'email':
          value = (this.data.email ? this.data.email : '-')
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.id
            }
          }
          if (this.data.activated !== null && this.data.activated !== 0) {
            oldValue = value
            value = []
            value.push(oldValue)
            value.push(h('i', {style: {color: '#75ac00', 'margin-left': '5px'}, attrs: {title: 'Активирован'}, 'class': {fa: true, 'fa-check-square': true}}))
          }
          break
        case 'groups':
          tag = 'span'
          if (this.data.groups !== undefined && this.data.groups !== null) {
            let self = this
            let tempArray = []
            Object.keys(this.data.groups).map(function (key, index) {
              tempArray.push(self.data.groups[key].name)
            })
            value = tempArray.join(', ')
          } else {
            value = '-'
          }
          break
        case 'withdraw_wallets':
          tag = 'span'
          if (this.data.holdername !== undefined && this.data.holdername !== null && this.data.holdername !== '') {
            value = []
            value.push(h('div', {}, this.data.holdername))
            value.push(h('div', {}, this.data.walletid))
          } else {
            value = this.data.walletid
          }
          break
        case 'withdraw_provider':
          tag = 'span'
          switch (this.data.provider) {
            case 0:
              value = 'Демо провайдер'
              break
            case 1:
              value = 'YandexMoney'
              break
            case 2:
              value = 'Webmoney'
              break
            case 3:
              value = 'Qiwi'
              break
            case 4:
              value = 'Банковская карта'
              break
            case 5:
              value = 'Tele2'
              break
            case 6:
              value = 'MTS'
              break
            case 7:
              value = 'Beeline'
              break
            case 8:
              value = 'Megafon'
              break
          }
          break
        case 'arr_type':
          tag = 'span'
          value = (this.data.type === 'add' ? 'зачисление' : 'списание')
          break
        case 'correct_from':
          tag = 'nuxt-link'
          value = []

          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.from.info.id
            }
          }

          if (this.data.from.info.secondName !== undefined && this.data.from.info.secondName !== null && this.data.from.info.secondName !== '') {
            value.push(this.data.from.info.secondName)
          }
          if (this.data.from.info.firstName !== undefined && this.data.from.info.firstName !== null && this.data.from.info.firstName !== '') {
            value.push(this.data.from.info.firstName)
          }
          if (this.data.from.info.thirdName !== undefined && this.data.from.info.thirdName !== null && this.data.from.info.thirdName !== '') {
            value.push(this.data.from.info.thirdName)
          }
          if (value.length === 0) {
            value.push(this.data.from.info.email)
          }
          break
        case 'correct_to':
          tag = 'nuxt-link'
          value = []

          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.to.info.id
            }
          }

          if (this.data.to.info.secondName !== undefined && this.data.to.info.secondName !== null && this.data.to.info.secondName !== '') {
            value.push(this.data.to.info.secondName)
          }
          if (this.data.to.info.firstName !== undefined && this.data.to.info.firstName !== null && this.data.to.info.firstName !== '') {
            value.push(this.data.to.info.firstName)
          }
          if (this.data.to.info.thirdName !== undefined && this.data.to.info.thirdName !== null && this.data.to.info.thirdName !== '') {
            value.push(this.data.to.info.thirdName)
          }
          if (value.length === 0) {
            value.push(this.data.to.info.email)
          }
          break
        case 'sum':
          tag = 'span'
          value = this.data.sum + ' \u20BD'
          break
        case 'comission':
          tag = 'span'
          value = this.data.comission + ' \u20BD'
          break
        case 'migration_date':
          tag = 'span'
          if (this.data.date !== undefined && this.data.date !== null && this.data.date !== '-') {
            value = moment(this.data.date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'sync_date':
          tag = 'span'
          if (this.data.date !== undefined && this.data.date !== null && this.data.date !== '-') {
            value = moment(this.data.date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'created':
          tag = 'span'
          if (this.data.from_device !== undefined) {
            if (this.data.created !== undefined && this.data.created !== null && this.data.created !== '-') {
              value = moment(this.data.created, 'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY, HH:mm')
            } else {
              value = '-'
            }
          } else {
            if (this.data.created !== undefined && this.data.created !== null && this.data.created !== '-') {
              value = moment(this.data.created, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
            } else {
              value = '-'
            }
          }
          break
        case 'date':
          tag = 'span'
          if (this.data.date !== undefined && this.data.date !== null && this.data.date !== '-') {
            value = moment(this.data.date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'updated':
          tag = 'span'
          if (this.data.updated !== undefined && this.data.updated !== null && this.data.updated !== '-') {
            value = moment(this.data.updated, 'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'updated_offer':
          tag = 'span'
          if (this.data.updated !== undefined && this.data.updated !== null && this.data.updated !== '-') {
            value = moment(this.data.updated, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'lastActivity':
          tag = 'span'
          if (this.data.lastActivity === null) {
            value = '-'
          } else {
            value = moment(this.data.created, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
            if (this.data.activity.mobile_date === this.data.lastActivity) {
              attr = {
                attrs: {
                  'v-tooltip': 'Система: ' + this.data.activity.mobile_os + ' ' + this.data.activity.mobile_os_version + ', Приложение: v.' + this.data.activity.mobile_app_version
                },
                'class': {
                  last_activity: true,
                  last_browser: true
                }
              }
              attr['class'][(this.data.activity.mobile_os).toLowerCase()] = true
            } else if (this.data.activity.plugin_date === this.data.lastActivity) {
              attr = {
                attrs: {
                  'v-tooltip': 'Система: ' + this.data.activity.plugin_os + ', Плагин: v.' + this.data.activity.plugin_version
                },
                'class': {
                  last_activity: true,
                  last_plugin: true
                }
              }
              attr['class'][(this.data.activity.plugin_browser).toLowerCase()] = true
            } else if (this.data.activity.site_date === this.data.lastActivity) {
              attr = {
                attrs: {
                  'v-tooltip': 'Cтраница: ' + this.data.activity.site_page + ', Сайт: v.' + this.data.activity.site_version
                },
                'class': {
                  last_activity: true,
                  last_site: true,
                  site: true
                }
              }
            } else {
              value = '-'
            }
          }
          break
        case 'reff_balance':
          tag = 'span'
          value = []
          if (this.data.approved !== undefined) {
            value.push(this.data.approved)
          } else {
            value.push(0)
          }
          value.push(' / ')
          if (this.data.hold !== undefined) {
            value.push(h('span', {'class': {'text-primary': true}}, this.data.hold))
          } else {
            value.push(h('span', {'class': {'text-primary': true}}, 0))
          }
          value.push('\u20BD')
          break
        case 'balance':
          tag = 'span'
          value = []
          if (this.data.balance.approved.RUB !== undefined) {
            value.push(this.data.balance.approved.RUB)
          } else {
            value.push(0)
          }
          value.push(' / ')
          if (this.data.balance.hold.RUB !== undefined) {
            value.push(h('span', {'class': {'text-primary': true}}, this.data.balance.hold.RUB))
          } else {
            value.push(h('span', {'class': {'text-primary': true}}, 0))
          }
          value.push(' \u20BD')
          value.push(h('br', {}))

          if (this.data.balance.approved.USD !== undefined) {
            value.push(this.data.balance.approved.USD)
          } else {
            value.push(0)
          }
          value.push(' / ')
          if (this.data.balance.hold.USD !== undefined) {
            value.push(h('span', {'class': {'text-primary': true}}, this.data.balance.hold.USD))
          } else {
            value.push(h('span', {'class': {'text-primary': true}}, 0))
          }
          value.push(' $')
          value.push(h('br', {}))

          if (this.data.balance.approved.EUR !== undefined) {
            value.push(this.data.balance.approved.EUR)
          } else {
            value.push(0)
          }
          value.push(' / ')
          if (this.data.balance.hold.EUR !== undefined) {
            value.push(h('span', {'class': {'text-primary': true}}, this.data.balance.hold.EUR))
          } else {
            value.push(h('span', {'class': {'text-primary': true}}, 0))
          }
          value.push(' \u20AC')

          break
        case 'order_projectName':
          if (this.data.user.projectName !== undefined && this.data.user.projectName !== null) {
            tag = 'nuxt-link'
            value = this.data.user.projectName
            attr = {
              attrs: {
                to: '/admin/project/edit/' + this.data.user.project
              }
            }
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'projectName':
          if (this.data.projectName !== undefined && this.data.projectName !== null) {
            tag = 'nuxt-link'
            value = this.data.projectName
            attr = {
              attrs: {
                to: '/admin/project/edit/' + this.data.project
              }
            }
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'referedBy':
          if (this.data.referedBy !== null && this.data.referedBy.email !== null) {
            tag = 'nuxt-link'
            value = this.data.referedBy.email
            attr = {
              attrs: {
                to: ('/user/profile' + this.data.referedBy.id),
                title: this.data.referedBy.email
              },
              'class': {
                'clip-text': true
              }
            }
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'rcpa':
          tag = 'span'
          value = this.data.syscpa + '% / ' + (100 - parseInt(this.data.syscpa, 10)) + '%'
          break
        case 'remindersCount':
          tag = 'span'
          value = []
          value.push(h('span', {}, this.data.remindersCount + ' / '))
          value.push(h('span', {'class': {'text-success': true}}, this.data.processingCount))
          break
        case 'withdraw_created':
          tag = 'span'
          value = moment(this.data.created, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          break
        case 'news_created_at':
          tag = 'span'
          value = moment(this.data.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          break
        case 'createdAt':
          tag = 'span'
          if (this.data.createdAt !== null) {
            value = moment(this.data.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'startedAt':
          tag = 'span'
          if (this.data.startedAt !== null) {
            value = moment(this.data.startedAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'finishedAt':
          tag = 'span'
          if (this.data.finishedAt !== null) {
            value = moment(this.data.finishedAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            value = '-'
          }
          break
        case 'news_is_global':
          tag = 'i'
          value = ''

          if (this.data.is_global === 0) {
            attr = {
              'class': {
                fa: true,
                'fa-ban': true
              },
              style: {
                color: '#da1021'
              }
            }
          } else {
            attr = {
              'class': {
                fa: true,
                'fa-check-square': true
              },
              style: {
                color: '#75ac00'
              }
            }
          }
          break
        case 'news_status':
          tag = 'span'
          switch (this.data.status) {
            case 0:
              value = 'Снята с публикации'
              break
            case 1:
              value = 'Опубликована'
              break
            case 2:
              value = 'На модерации'
              break
            case 3:
              value = 'Удалена'
              break
            default :
              value = this.data.status
              break
          }
          break
        case 'news_category':
          tag = 'span'
          if (this.data.category !== undefined && this.data.category !== null && this.data.category.category_name !== null) {
            value = this.data.category.category_name
          } else {
            value = '-'
          }
          break
        case 'news_title_reseller':
          tag = 'nuxt-link'
          value = this.data.title
          attr = {
            attrs: {
              to: '/panel/news/edit/' + this.data.id
            }
          }
          break
        case 'news_title':
          tag = 'nuxt-link'
          value = this.data.title
          attr = {
            attrs: {
              to: '/admin/news/edit/' + this.data.id
            }
          }
          break
        case 'news_project_name':
          tag = 'nuxt-link'
          if (this.data.project_name !== undefined && this.data.project_name !== null && this.data.project_name !== '') {
            value = this.data.project_name
            attr = {
              attrs: {
                to: '/admin/news/edit/' + this.data.project_id
              }
            }
          } else {
            value = '-'
          }
          break
        case 'news_created_by':
          value = []
          tag = 'span'

          if (this.data.created_by.secondName !== undefined && this.data.created_by.secondName !== null && this.data.created_by.secondName !== '') {
            value.push(this.data.created_by.secondName)
          }
          if (this.data.created_by.firstName !== undefined && this.data.created_by.firstName !== null && this.data.created_by.firstName !== '') {
            value.push(this.data.created_by.firstName)
          }
          if (this.data.created_by.thirdName !== undefined && this.data.created_by.thirdName !== null && this.data.created_by.thirdName !== '') {
            value.push(this.data.created_by.thirdName)
          }
          if (value.length === 0) {
            value.push('-')
          }
          value = value.join(' ')
          break
        case 'user_mail':
          value = []
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.user.id
            }
          }

          if (this.data.user.email !== undefined && this.data.user.email !== null && this.data.user.email !== '') {
            value.push(this.data.user.email)
          } else {
            value.push('-')
          }

          value = value.join(' ')
          break
        case 'review_rating':
          value = this.data.rating + ' из 5'
          tag = 'span'
          break
        case 'review_text':
          value = this.data.text
          tag = 'div'
          break
        case 'enter_column':
          tag = 'span'
          switch (this.data.type) {
            case 'site':
              value = 'Сайт'
              break
            case 'plugin':
              value = 'Плагин'
              break
            case 'mobile':
              value = 'Приложение'
              break
          }
          break
        case 'enter_tooltip_type':
          value = []
          tag = 'div'
          switch (this.data.type) {
            case 'site':
              value.push(h('div', {}, 'Страница: ' + this.data.site_page))
              value.push(h('div', {}, 'Версия сайта: ' + this.data.site_version))
              break
            case 'plugin':
              value.push(h('div', {}, 'Браузер: ' + this.data.plugin_browser))
              value.push(h('div', {}, 'Платформа: ' + this.data.plugin_os))
              value.push(h('div', {}, 'Версия плагина: ' + this.data.plugin_version))
              break
            case 'mobile':
              value.push(h('div', {}, 'Платформа: ' + this.data.mobile_os))
              value.push(h('div', {}, 'Версия платформы: ' + this.data.mobile_os_version))
              value.push(h('div', {}, 'Версия приложения: ' + this.data.mobile_app_version))
              break
          }
          break
        case 'enter_type':
          value = []
          tag = 'div'
          switch (this.data.type) {
            case 'site':
              value.push(h('div', {}, 'Страница: ' + this.data.site_page))
              value.push(h('div', {}, 'Версия сайта: ' + this.data.site_version))
              break
            case 'plugin':
              value.push(h('div', {}, 'Браузер: ' + this.data.plugin_browser))
              value.push(h('div', {}, 'Платформа: ' + this.data.plugin_os))
              value.push(h('div', {}, 'Версия плагина: ' + this.data.plugin_version))
              break
            case 'mobile':
              value.push(h('div', {}, 'Платформа: ' + this.data.mobile_os))
              value.push(h('div', {}, 'Версия платформы: ' + this.data.mobile_os_version))
              value.push(h('div', {}, 'Версия приложения: ' + this.data.mobile_app_version))
              break
          }
          break
        case 'provider_number':
          value = []
          tag = 'div'
          value.push(h('div', {}, this.data.number))
          if (this.data.holdername !== undefined && this.data.holdername !== null && this.data.holdername !== '') {
            value.push(h('div', {}, 'Держатель: ' + this.data.holdername))
          }
          break
        case 'app_info':
          value = []
          tag = 'div'
          if (this.data.platform !== undefined && this.data.platform !== null) {
            value.push(h('div', {}, 'Платформа: ' + this.data.platform))
          }
          if (this.data.os !== undefined && this.data.os !== null) {
            value.push(h('div', {}, 'Система: ' + this.data.os))
          }
          if (this.data.browser !== undefined && this.data.browser !== null) {
            value.push(h('div', {}, 'Браузер: ' + this.data.browser))
          }
          if (this.data.browser_version !== undefined && this.data.browser_version !== null) {
            value.push(h('div', {}, 'Версия браузера: ' + this.data.browser_version))
          }
          if (this.data.mobile_addid !== undefined && this.data.mobile_addid !== null) {
            value.push(h('div', {}, 'Mobile add id: ' + this.data.mobile_addid))
          }
          if (this.data.mobile_manufacturer !== undefined && this.data.mobile_manufacturer !== null) {
            value.push(h('div', {}, 'Mobile manufacturer: ' + this.data.mobile_manufacturer))
          }
          if (this.data.mobile_model !== undefined && this.data.mobile_model !== null) {
            value.push(h('div', {}, 'Mobile model: ' + this.data.mobile_model))
          }
          if (this.data.mobile_appversion !== undefined && this.data.mobile_appversion !== null) {
            value.push(h('div', {}, 'Mobile app version: ' + this.data.mobile_appversion))
          }
          if (this.data.os_version !== undefined && this.data.os_version !== null) {
            value.push(h('div', {}, 'Os version: ' + this.data.os_version))
          }
          if (this.data.mobile_lang !== undefined && this.data.mobile_lang !== null) {
            value.push(h('div', {}, 'Mobile lang: ' + this.data.mobile_lang))
          }
          if (this.data.mobile_cpu !== undefined && this.data.mobile_cpu !== null) {
            value.push(h('div', {}, 'Mobile cpu: ' + this.data.mobile_cpu))
          }
          if (this.data.mobile_vendoruuid !== undefined && this.data.mobile_vendoruuid !== null) {
            value.push(h('div', {}, 'Mobile vendor uuid: ' + this.data.mobile_vendoruuid))
          }
          if (this.data.mobile_adsuuid !== undefined && this.data.mobile_adsuuid !== null) {
            value.push(h('div', {}, 'Mobile ads uuid: ' + this.data.mobile_adsuuid))
          }
          if (this.data.hash !== undefined && this.data.hash !== null) {
            value.push(h('div', {}, 'Hash: ' + this.data.hash))
          }
          if (this.data.firebaseuuid !== undefined && this.data.firebaseuuid !== null) {
            value.push(h('div', {}, 'Firebase uuid: ' + this.data.firebaseuuid))
          }
          if (this.data.plugin_browser !== undefined && this.data.plugin_browser !== null) {
            value.push(h('div', {}, 'Браузер: ' + this.data.plugin_browser))
          }
          if (this.data.plugin_os !== undefined && this.data.plugin_os !== null) {
            value.push(h('div', {}, 'Операционная система: ' + this.data.plugin_os))
          }
          if (this.data.plugin_version !== undefined && this.data.plugin_version !== null) {
            value.push(h('div', {}, 'Версия плагина: ' + this.data.plugin_version))
          }
          if (this.data.last_activity !== undefined && this.data.last_activity !== null) {
            value.push(h('div', {}, 'Последняя активность: ' + this.data.last_activity))
          }
          break
        case 'review_shop':
          value = []
          tag = 'div'

          value.push(h('nuxt-link', {attrs: {to: '/admin/shops/edit/' + this.data.offer.id}}, this.data.offer.name))
          break
        case 'review_shop_reseller':
          value = []
          tag = 'div'

          value.push(h('nuxt-link', {attrs: {to: '/panel/shops/edit/' + this.data.offer.id}}, this.data.offer.name))
          break
        case 'order_shop':
          value = []
          tag = 'div'

          value.push(h('div', {}, [
            h('span', {}, 'Магазин: '),
            h('nuxt-link', {attrs: {to: '/admin/shops/edit/' + this.data.offer.id}}, this.data.offer.name)
          ]))
          if (this.data.order_total !== undefined && this.data.order_total !== null) {
            value.push(h('div', {}, 'Сумма заказа: ' + parseFloat(this.data.order_total, 10).toFixed(2) + ' \u20BD'))
          }
          if (this.data.extid !== undefined) {
            if (this.data.positions !== undefined && this.data.positions !== null) {
              value.push(h('a', {attrs: {href: '#'}, on: {click: this.clickHandler}}, '№ заказа: ' + this.data.extid))
            } else {
              value.push(h('div', {}, '№ заказа: ' + this.data.extid))
            }
          }
          break
        case 'create_all':
          tag = 'span'
          switch (this.data.status) {
            case 'wait':
              value = (parseFloat(this.data.system_hold) + parseFloat(this.data.ref_hold) + parseFloat(this.data.user_hold) + parseFloat(this.data.reseller_hold)).toFixed(2) + ' \u20BD'
              break
            case 'success':
              value = (parseFloat(this.data.system_approved) + parseFloat(this.data.ref_approved) + parseFloat(this.data.user_approved) + parseFloat(this.data.reseller_approved)).toFixed(2) + ' \u20BD'
              break
            case 'rejected':
              value = (parseFloat(this.data.system_rejected) + parseFloat(this.data.ref_rejected) + parseFloat(this.data.user_rejected) + parseFloat(this.data.reseller_rejected)).toFixed(2) + ' \u20BD'
              break
            default:
              value = status
              break
          }
          break
        case 'create_our':
          tag = 'span'
          switch (this.data.status) {
            case 'wait':
              value = (parseFloat(this.data.system_hold)).toFixed(2) + ' \u20BD'
              break
            case 'success':
              value = (parseFloat(this.data.system_approved)).toFixed(2) + ' \u20BD'
              break
            case 'rejected':
              value = (parseFloat(this.data.system_rejected)).toFixed(2) + ' \u20BD'
              break
            default:
              value = status
              break
          }
          break
        case 'create_partner':
          tag = 'span'
          switch (this.data.status) {
            case 'wait':
              value = (parseFloat(this.data.reseller_hold)).toFixed(2) + ' \u20BD'
              break
            case 'success':
              value = (parseFloat(this.data.reseller_approved)).toFixed(2) + ' \u20BD'
              break
            case 'rejected':
              value = (parseFloat(this.data.reseller_rejected)).toFixed(2) + ' \u20BD'
              break
            default:
              value = status
              break
          }
          break
        case 'create_user':
          tag = 'span'
          switch (this.data.status) {
            case 'wait':
              value = (parseFloat(this.data.user_hold)).toFixed(2) + ' \u20BD'
              break
            case 'success':
              value = (parseFloat(this.data.user_approved)).toFixed(2) + ' \u20BD'
              break
            case 'rejected':
              value = (parseFloat(this.data.user_rejected)).toFixed(2) + ' \u20BD'
              break
            default:
              value = status
              break
          }
          break
        case 'create_reff':
          tag = 'span'
          switch (this.data.status) {
            case 'wait':
              value = (parseFloat(this.data.ref_hold)).toFixed(2) + ' \u20BD'
              break
            case 'success':
              value = (parseFloat(this.data.ref_approved)).toFixed(2) + ' \u20BD'
              break
            case 'rejected':
              value = (parseFloat(this.data.ref_rejected)).toFixed(2) + ' \u20BD'
              break
            default:
              value = status
              break
          }
          break
        case 'statusName':
          value = this.data.statusName
          switch (this.data.status) {
            case 0:
              attr = {
                'style': {
                  'min-width': '130px'
                },
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            case 1:
              attr = {
                'style': {
                  'min-width': '120px'
                },
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-warning': true
                }
              }
              break
            case 2:
              attr = {
                'style': {
                  'min-width': '120px'
                },
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-danger': true
                }
              }
              break
            case 3:
              attr = {
                'style': {
                  'min-width': '120px'
                },
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            default:
              attr = {
                'style': {
                  'min-width': '120px'
                },
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-default': true
                }
              }
              break
          }
          break
        case 'withdraw_status':
          switch (this.data.status) {
            case 'wait':
              value = 'На рассмотрении'
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-info': true
                }
              }
              break
            case 'success':
              value = 'Завершена'
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            case 'rejected':
              value = 'Отклонена'
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-danger': true
                }
              }
              break
            case 'processing':
              value = 'В процессе'
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-info': true
                }
              }
              break
            default:
              value = status
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-default': true
                }
              }
              break
          }
          break
        case 'order_status':
          tag = 'div'
          value = []
          let attr2 = {}
          let value2 = ''

          switch (this.data.status) {
            case 'wait':
              value2 = 'В ожидании'
              attr2 = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-info': true
                }
              }
              break
            case 'success':
              value2 = 'Зачислен'
              attr2 = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            case 'rejected':
              value2 = 'Отклонен'
              attr2 = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-danger': true
                }
              }
              break
            default:
              value2 = this.data.status
              attr2 = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-default': true
                }
              }
              break
          }
          value.push(h('strong', attr2, value2))
          if (this.data.ticket !== undefined && this.data.ticket !== null) {
            value.push(h('nuxt-link', {attrs: {to: '/admin/tickets/view/' + this.data.ticket}}, 'Перейти к тикету'))
          }
          break
        case 'reff_id':
          tag = 'span'
          value = this.data.profile.id
          break
        case 'reff_user':
          value = []
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.profile.id
            }
          }

          if (this.data.profile.secondName !== undefined && this.data.profile.secondName !== null && this.data.profile.secondName !== '') {
            value.push(this.data.profile.secondName)
          }
          if (this.data.profile.firstName !== undefined && this.data.profile.firstName !== null && this.data.profile.firstName !== '') {
            value.push(this.data.profile.firstName)
          }
          if (this.data.profile.thirdName !== undefined && this.data.profile.thirdName !== null && this.data.profile.thirdName !== '') {
            value.push(this.data.profile.thirdName)
          }
          if (this.data.profile.is_reseller !== undefined && this.data.profile.is_reseller !== null && this.data.profile.is_reseller) {
            value.unshift('[Реселлер]')
          }

          value = value.join(' ')

          if (this.data.profile.email !== undefined && this.data.profile.email !== null && this.data.profile.email !== '') {
            let value2 = value
            value = []
            value.push(h('div', {}, [
              h('div', {}, value2),
              h('div', {}, this.data.profile.email)
            ]))
          }
          break
        case 'order_user_name':
          value = []
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.user.id
            }
          }

          if (this.data.user.secondName !== undefined && this.data.user.secondName !== null && this.data.user.secondName !== '') {
            value.push(this.data.user.secondName)
          }
          if (this.data.user.firstName !== undefined && this.data.user.firstName !== null && this.data.user.firstName !== '') {
            value.push(this.data.user.firstName)
          }
          if (this.data.user.thirdName !== undefined && this.data.user.thirdName !== null && this.data.user.thirdName !== '') {
            value.push(this.data.user.thirdName)
          }
          if (this.data.user.is_reseller !== undefined && this.data.user.is_reseller !== null && this.data.user.is_reseller) {
            value.unshift('[Реселлер]')
          }

          value = value.join(' ')

          if (this.data.user.email !== undefined && this.data.user.email !== null && this.data.user.email !== '') {
            let value2 = value
            value = []
            value.push(h('div', {}, [
              h('div', {}, value2),
              h('div', {}, this.data.user.email)
            ]))
          }
          break
        case 'user_name':
          value = []
          tag = 'nuxt-link'
          attr = {
            attrs: {
              to: '/admin/users/edit/' + this.data.user.id
            }
          }

          if (this.data.user.secondName !== undefined && this.data.user.secondName !== null && this.data.user.secondName !== '') {
            value.push(this.data.user.secondName)
          }
          if (this.data.user.firstName !== undefined && this.data.user.firstName !== null && this.data.user.firstName !== '') {
            value.push(this.data.user.firstName)
          }
          if (this.data.user.thirdName !== undefined && this.data.user.thirdName !== null && this.data.user.thirdName !== '') {
            value.push(this.data.user.thirdName)
          }
          if (this.data.user.is_reseller !== undefined && this.data.user.is_reseller !== null && this.data.user.is_reseller) {
            value.unshift('[Реселлер]')
          }
          if (value.length === 0) {
            value.push('Не указаны')
          }

          value = value.join(' ')
          break
        case 'titleAt':
          value = this.data.title
          tag = 'span'
          // tag = 'nuxt-link'
          // attr = {
          // attrs: {
          // to: '/admin/mails/edit/' + this.data.id
          // }
          // }
          break
        case 'tickets_moderator':
          value = []
          tag = 'nuxt-link'

          if (this.data.agent.secondName !== undefined && this.data.agent.secondName !== null && this.data.agent.secondName !== '') {
            value.push(this.data.agent.secondName)
          }
          if (this.data.agent.firstName !== undefined && this.data.agent.firstName !== null && this.data.agent.firstName !== '') {
            value.push(this.data.agent.firstName)
          }
          if (this.data.agent.thirdName !== undefined && this.data.agent.thirdName !== null && this.data.agent.thirdName !== '') {
            value.push(this.data.agent.thirdName)
          }
          if (this.data.agent.is_reseller !== undefined && this.data.agent.is_reseller !== null && this.data.agent.is_reseller) {
            value.unshift('[Реселлер]')
          }
          if (value.length === 0) {
            if (this.data.agent.email !== undefined && this.data.agent.email !== null && this.data.agent.email !== '') {
              value.push(this.data.agent.email)
            } else {
              value.push('-')
            }
          }

          value = value.join(' ')

          attr = {
            'class': {
              'clipped': true,
              'max-width-200': true
            },
            attrs: {
              title: value,
              to: '/admin/users/edit/' + this.data.agent.id
            }
          }
          break
        case 'tickets_title_reseller':
          tag = 'nuxt-link'
          attr = {
            'class': {
              'clipped': true,
              'max-width-200': true
            },
            attrs: {
              title: this.data.title,
              to: '/panel/tickets/view/' + this.data.id
            }
          }
          value = this.data.title
          break
        case 'tickets_title_support':
          tag = 'nuxt-link'
          attr = {
            'class': {
              'clipped': true,
              'max-width-200': true
            },
            attrs: {
              title: this.data.title,
              to: '/support/view/' + this.data.id
            }
          }
          value = this.data.title
          break
        case 'tickets_title':
          tag = 'nuxt-link'
          attr = {
            'class': {
              'clipped': true,
              'max-width-200': true
            },
            attrs: {
              title: this.data.title,
              to: '/admin/tickets/view/' + this.data.id
            }
          }
          value = this.data.title
          break
        case 'order_project':
          if (this.data.user !== undefined && this.data.user !== null && this.data.user.project !== undefined && this.data.user.project !== null) {
            tag = 'nuxt-link'
            attr = {
              attrs: {
                to: '/admin/project/edit/' + this.data.user.project
              }
            }
            value = this.data.user.project_name
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'tickets_from_project':
          if (this.data.user !== undefined && this.data.user !== null && this.data.user.uproject !== undefined && this.data.user.uproject !== null && this.data.user.uproject.id !== undefined && this.data.user.uproject.id !== null) {
            tag = 'nuxt-link'
            attr = {
              attrs: {
                to: '/admin/project/edit/' + this.data.user.uproject.id
              }
            }
            value = this.data.user.uproject.name
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'tickets_creator':
          value = []
          tag = 'nuxt-link'

          if (this.data.user.secondName !== undefined && this.data.user.secondName !== null && this.data.user.secondName !== '') {
            value.push(this.data.user.secondName)
          }
          if (this.data.user.firstName !== undefined && this.data.user.firstName !== null && this.data.user.firstName !== '') {
            value.push(this.data.user.firstName)
          }
          if (this.data.user.thirdName !== undefined && this.data.user.thirdName !== null && this.data.user.thirdName !== '') {
            value.push(this.data.user.thirdName)
          }
          if (this.data.user.is_reseller !== undefined && this.data.user.is_reseller !== null && this.data.user.is_reseller) {
            value.unshift('[Реселлер]')
          }

          value = value.join(' ')

          attr = {
            'class': {
              'clipped': true,
              'max-width-200': true
            },
            attrs: {
              title: value,
              to: '/admin/users/edit/' + this.data.user.id
            }
          }

          if (this.data.user.email !== undefined && this.data.user.email !== null && this.data.user.email !== '') {
            let value2 = value
            value = []
            value.push(h('div', {}, [
              h('div', {}, value2),
              h('div', {}, this.data.user.email)
            ]))
          }
          break
        case 'tickets_status':
          tag = 'nuxt-link'
          value = this.data.status

          switch (this.data.status_id) {
            case 0:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-warning': true
                }
              }
              break
            case 1:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-warning': true
                }
              }
              break
            case 2:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            case 3:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-primary': true
                }
              }
              break
            case 4:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-primary': true
                }
              }
              break
            case 5:
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-danger': true
                }
              }
              break
            default:
              value = '-'
              break
          }
          attr.attrs = {
            to: '/admin/tickets/view/' + this.data.id
          }
          break
        case 'logs_type':
          tag = 'div'
          value = this.data.type
          switch (this.data.type) {
            case 'INFO':
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-info': true
                }
              }
              break
            case 'WARNING':
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-warning': true
                }
              }
              break
            case 'SUCCESS':
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-success': true
                }
              }
              break
            case 'ERROR':
              attr = {
                'class': {
                  'btn': true,
                  'btn-sm': true,
                  'btn-danger': true
                }
              }
              break
          }
          break
        case 'payload':
          tag = 'div'
          var parsed = this.data.payload
          value = []
          value.push(h('a', {style: {color: '#75ac00', 'margin-left': '5px'}, attrs: {'data-toggle': 'collapse', 'aria-controls': ('seeLogId' + this.data.id), href: '#seeLogId' + this.data.id}, on: {click: this.dataToggle}, 'class': {btn: true, 'btn-sm': true, 'btn-primary': true}}, 'Показать payload'))
          value.push(h('div', {attrs: {id: 'seeLogId' + this.data.id}, 'class': {'collapse': true}}, [h('div', {style: {'text-align': 'left', 'padding': '5px', 'margin': '0px', 'word-break': 'break-word', 'white-space': 'normal'}, 'class': {'well': true}}, [h('div', {style: {'padding-left': 0}}, parsed)])]))

          break
        case 'screenshot_r':
          value = []
          tag = 'div'
          attr = {
            style: {
              height: '40px',
              overflow: 'hidden'
            }
          }
          if (this.data.image === undefined || this.data.image === null || this.data.image === '') {
            value.push(h('img', {attrs: {width: 110, src: 'http://placehold.it/110x40'}}))
          } else {
            value.push(h('img', {attrs: {width: 110, src: process.env.urls[process.env.currentUrl].site + (this.data.image).substr(1), onerror: 'this.src = "http://placehold.it/110x40"'}}))
          }
          break
        case 'screenshot':
          value = []
          tag = 'div'
          attr = {
            style: {
              height: '40px',
              overflow: 'hidden'
            }
          }
          if (this.data.image === undefined || this.data.image === null || this.data.image === '') {
            value.push(h('img', {attrs: {width: 110, src: 'http://placehold.it/110x40'}}))
          } else {
            value.push(h('img', {attrs: {width: 110, src: process.env.urls[process.env.currentUrl].site + (this.data.image).substr(1), onerror: 'this.src = "http://placehold.it/110x40"'}}))
          }
          break
        case 'name_r':
          value = []
          tag = 'div'
          value.push(h('nuxt-link', {attrs: {to: '/panel/shops/edit/' + this.data.id}}, this.data.name))
          if (this.data.rawCpa !== undefined && this.data.rawCpa !== null && this.data.rawCpa !== '') {
            value.push(h('div', {}, ('Кэшбэк: ' + this.data.rawCpa + (this.data.cpa_type === 'dynamic' ? '%' : ' \u20BD') + ' [наша доля: ' + this.data.system_part + '%]')))
          }
          break
        case 'faq_elements':
          value = []
          tag = 'div'
          value.push(h('nuxt-link', {attrs: {to: '/panel/faq/view/' + this.data.id}}, '[Записи в разделе]'))
          break
        case 'name':
          value = []
          tag = 'div'
          value.push(h('nuxt-link', {attrs: {to: '/admin/shops/edit/' + this.data.id}}, this.data.name))
          if (this.data.rawCpa !== undefined && this.data.rawCpa !== null && this.data.rawCpa !== '') {
            value.push(h('div', {}, ('Кэшбэк: ' + this.data.rawCpa + (this.data.cpa_type === 'dynamic' ? '%' : ' \u20BD') + ' [наша доля: ' + this.data.system_part + '%]')))
          }
          break
        case 'country':
          tag = 'span'
          value = (this.data.country !== undefined && this.data.country !== '' && this.data.country !== null && this.data.country !== 'NULL' ? this.data.country : '-')
          break
        case 'aggregator':
          tag = 'span'
          value = (this.data.aggregator.name !== undefined && this.data.aggregator.name !== null ? this.data.aggregator.name : '-')
          break
        case 'deleted':
          if (this.data.deleted === 1) {
            tag = 'i'
            attr = {
              'class': {
                fa: true,
                'fa-check-square': true
              },
              style: {
                color: '#da1021'
              }
            }
          } else {
            tag = 'span'
            value = '-'
          }
          break
        case 'available':
          if (this.data.available === 1) {
            tag = 'i'
            attr = {
              'class': {
                fa: true,
                'fa-check-square': true
              },
              style: {
                color: '#75ac00'
              }
            }
          } else {
            tag = 'i'
            attr = {
              'class': {
                fa: true,
                'fa-ban': true
              },
              style: {
                color: '#da1021'
              }
            }
          }
          break
        case 'shop_categories':
          try {
            let categories = this.data.categories
            if (!Array.isArray(categories)) {
              if (Object.keys(categories).length > 0) {
                let temp = []
                Object.keys(categories).map(function (item) {
                  temp.push(h('li', {style: {'list-style-position': 'inside'}}, categories[item]))
                })

                tag = 'div'
                value = []
                value.push(h('a', {attrs: {'data-toggle': 'collapse', 'role': 'button', href: '#seeCat' + this.data.id}, on: {click: this.dataToggle}, 'class': {btn: true, 'btn-sm': true, 'btn-primary': true}}, [h('i', {'class': {fa: true, 'fa-list-ul': true}}), ' Показать категории']))
                value.push(h('div', {attrs: {id: 'seeCat' + this.data.id}, 'class': {'collapse': true}}, [h('div', {style: {'text-align': 'left', 'padding': '5px', 'margin': '0px', 'max-width': '200px'}, 'class': {'well': true}}, [h('ul', {style: {'padding-left': 0}}, temp)])]))
              } else {
                tag = 'span'
                value = '-'
              }
            } else {
              tag = 'span'
              value = '-'
            }
          } catch (e) {
            tag = 'span'
            value = '-'
          }
          break
      }
      return h(tag, attr, value)
    }
  }
</script>