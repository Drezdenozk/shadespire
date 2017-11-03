<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div class="dataTables_length" v-if="widgets !== undefined && widgets.limit !== undefined && widgets.limit === true">
                    <label>Показывать по <select v-model="limit" class="form-control input-sm paginator-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select> записей</label>
                </div>
            </div>
            <div class="col-md-9 text-right">
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.dataRange !== undefined && widgets.dataRange === true">
                    <div class="input-group" style="max-width:380px">
                        <span class="input-group-addon"><i class="icmn-calendar"></i></span>
                        <input type="date" class="form-control input-sm filter-search" v-model="from" style="display: inline-block; width: 50%;">
                        <input type="date" class="form-control input-sm filter-search" v-model="to" style="display: inline-block; width: 50%;">
                    </div>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.aggregators !== undefined && Object.keys(widgets.aggregators).length > 0">
                    <label>По провайдеру: <select v-model="searchByProvider" class="form-control input-sm paginator-select">
                        <option value="all">Все</option>
                        <template v-for="provider in widgets.aggregators">
                          <option :value="provider.id">{{provider.name}}</option>
                        </template>
                    </select></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.filterByProject !== undefined && Object.keys(widgets.filterByProject).length > 0">
                    <label>По проекту: <select v-model.number="registeredby" class="form-control input-sm paginator-select">
                        <option value="0" selected>Все</option>
                        <template v-for="projects in widgets.filterByProject">
                            <option :value="projects.id">{{projects.name}}</option>
                        </template>
                    </select></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByTicketDate !== undefined && widgets.searchByTicketDate === true">
                    <label>По дате: &nbsp;<select v-model="searchByTicketDate" class="form-control input-sm paginator-select">
                        <option value="all">Все</option>
                        <option value="today">За сегодня</option>
                        <option value="yesterday">За вчера</option>
                    </select></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByTicketStatus !== undefined && widgets.searchByTicketStatus === true">
                    <label>По статусу: &nbsp;</label>
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-primary-outline btn-sm" :class="{'active' : searchByTicketStatus.indexOf(0) !== -1}">
                            <input type="checkbox" value="0" v-model.number="searchByTicketStatus">
                            Новый
                        </label>
                        <label class="btn btn-primary-outline btn-sm" :class="{'active' : searchByTicketStatus.indexOf(1) !== -1}">
                            <input type="checkbox" value="1" v-model.number="searchByTicketStatus">
                            Требуется ответ
                        </label>
                        <label class="btn btn-primary-outline btn-sm" :class="{'active' : searchByTicketStatus.indexOf(2) !== -1}">
                            <input type="checkbox" value="2" v-model.number="searchByTicketStatus">
                            Дан ответ
                        </label>
                        <label class="btn btn-primary-outline btn-sm" :class="{'active' : searchByTicketStatus.indexOf(5) !== -1}">
                            <input type="checkbox" value="5" v-model.number="searchByTicketStatus">
                            Закрыт
                        </label>
                    </div>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByUserId !== undefined && widgets.searchByUserId === true">
                    <label>Поиск по userId: <input v-model="searchByID" class="form-control input-sm filter-search" placeholder="" type="search"></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByOfferId !== undefined && widgets.searchByOfferId === true">
                    <label>Поиск по offerId: <input v-model="searchByOfferID" class="form-control input-sm filter-search" placeholder="" type="search"></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByText !== undefined && widgets.searchByText === true">
                    <label>Поиск по тексту: <input v-model="searchBy" class="form-control input-sm filter-search" placeholder="" type="search"></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByTextV2 !== undefined && widgets.searchByTextV2.aggregators !== undefined">
                    <label>По провайдеру: <select v-model.number="searchByV2.aggregator" class="form-control input-sm paginator-select">
                        <option value="all">Все</option>
                        <template v-for="provider in widgets.searchByTextV2.aggregators">
                            <option :value="provider.id">{{provider.name}}</option>
                        </template>
                    </select></label>
                </div>
                <div class="display-inline-block margin-left-20 dataTables_filter text-right vertical-align-top" v-if="widgets !== undefined && widgets.searchByTextV2 !== undefined && widgets.searchByTextV2.offers !== undefined">
                    <label>По магазину: <select v-model.number="searchByV2.offer" class="form-control input-sm paginator-select">
                        <option value="all">Все</option>
                        <template v-for="offer in widgets.searchByTextV2.offers">
                            <option :value="offer.id">{{offer.name}}</option>
                        </template>
                    </select></label>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-hover no2wrap table-striped dataTable" width="100%">
                <thead>
                    <tr>
                        <template v-for="column in columns">
                            <th v-if="column.sortable !== undefined && column.sortable === true" v-on:click="sortByColumn(column.key)" :width="column.width ? column.width : 'auto'" :class="classObject(column)">{{column.name}}</th>
                            <th v-else-if="column.key === 'massAprove'">
                                <input type="checkbox" v-on:change="toggleMassApprove($event)"/>
                            </th>
                            <th v-else :width="column.width ? column.width : 'auto'">{{column.name}}</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!model || Object.keys(model).length === 0">
                        <td :colspan="columns.length">По вашему запросу информация не найдена</td>
                    </tr>
                    <tr v-else :id="'item-' + (item.id === undefined ? key : item.id)" v-for="(item, key) in model">
                        <template v-for="column in columns" :width="column.width ? column.width : 'auto'">
                            <td v-if="expansion !== undefined && item.included !== undefined && column.key === 'included'">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-primary-outline" :class="{'active' : model[key].included === 1}">
                                        <input v-on:click="toggleShop($event, key)" type="radio" v-bind:value="1" v-model.number="model[key].included">
                                        Да
                                    </label>
                                    <label class="btn btn-primary-outline" :class="{'active' : model[key].included === 0}">
                                        <input v-on:click="toggleShop($event, key)" type="radio" v-bind:value="0" v-model.number="model[key].included">
                                        Нет
                                    </label>
                                </div>
                            </td>
                            <td v-else-if="column.key === 'massAprove'">
                                <input type="checkbox" :value="key" name="massApprove" v-model="massApprove"/>
                            </td>
                            <td v-else-if="column.needRender !== undefined && column.needRender">
                                <Elements :data="item" :column="column.key"></Elements>
                            </td>
                            <td v-else-if="column.lastActivity !== undefined">
                                <span :class="lastActivityClass(key)" v-tooltip.top-center="lastActivityTooltip(key)">{{lastActivity(key)}}</span>
                            </td>
                            <td class="nowrap" v-else-if="column.command !== undefined">
                                <div>
                                    <nuxt-link v-if="column.command.edit !== undefined" class="btn btn-info btn-rounded btn-icon margin-inline" style="margin-bottom:0" v-tooltip.top-center="edit_button" :to="column.command.edit + item.id">
                                        <i class="fa fa-pencil"></i>
                                    </nuxt-link>
                                    <button v-if="column.command['edit-mails'] !== undefined" class="btn btn-info btn-rounded btn-icon margin-inline" style="margin-bottom:0" v-tooltip.top-center="edit_button" v-on:click="editMails(key)">
                                        <i class="fa fa-pencil"></i>
                                    </button>
                                    <button v-tooltip.top-center="'Войти на сайт'" v-if="column.command.site" type="button" class="btn btn-primary btn-rounded btn-icon margin-inline" v-on:click="siteAuth($event, key)" style="margin-bottom:0"><i class="icmn-enter"></i></button>
                                    <button v-tooltip.top-center="'Войти в панель реселлера'" v-if="column.command.reseller" type="button" class="btn btn-warning btn-rounded btn-icon margin-inline" v-on:click="adminAuth($event, key)" style="margin-bottom:0"><i class="icmn-loop"></i></button>
                                    <nuxt-link v-tooltip.top-center="read_button" :to="column.command.view + item.id" v-if="column.command.view !== undefined" class="btn btn-primary btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="icmn-eye2"></i></nuxt-link>
                                    <button v-tooltip.top-center="close_button" v-on:click="close_event(key, column.command.close)" v-if="column.command.close" type="button" class="btn btn-warning btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="icmn-lock"></i></button>
                                    <button v-tooltip.top-center="start_button" v-on:click="start_event(key)" v-if="column.command.play && item.available !== 1" type="button" class="btn btn-success btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-play"></i></button>
                                    <button v-tooltip.top-center="stop_button" v-on:click="stop_event(key)" v-if="column.command.stop && item.available === 1" type="button" class="btn btn-warning btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-stop"></i></button>
                                    <button v-tooltip.top-center="mail_stop" v-on:click="mail_event(key)" v-if="column.command.mail_stop && item.status === 1" type="button" class="btn btn-danger btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-pause"></i></button>
                                    <button v-tooltip.top-center="remove_button" v-on:click="remove_event(key, column.command.remove)" v-if="column.command.remove !== undefined && column.command.remove !== false" type="button" class="btn btn-danger btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-trash"></i></button>
                                    <button v-tooltip.top-center="approve_button" v-on:click="approve_event(key)" v-if="column.command.approve" type="button" class="btn btn-success btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="icmn-checkmark"></i></button>
                                    <button v-tooltip.top-center="mail_play" v-on:click="mail_event(key)" v-if="column.command.mail_play && item.status === 0" type="button" class="btn btn-success btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-play"></i></button>
                                    <button v-tooltip.top-center="mail_resend" v-on:click="mail_event(key)" v-if="column.command.mail_resend && item.status === 2" type="button" class="btn btn-success btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-play"></i></button>
                                    <button v-tooltip.top-center="mail_replay" v-on:click="mail_event(key)" v-if="column.command.mail_replay && item.status === 3" type="button" class="btn btn-warning btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="fa fa-refresh"></i></button>
                                    <button v-tooltip.top-center="decline_button" v-on:click="decline_event(key)" v-if="column.command.decline" type="button" class="btn btn-danger btn-rounded btn-icon margin-inline" style="margin-bottom:0"><i class="icmn-cross"></i></button>

                                    <div data-toggle="buttons" class="btn-group" v-if="column.command.feedbackModerate !== undefined">
                                        <label class="btn btn-default-outline" :class="{'active': item.status === 0}">
                                            <input type="radio" value="0" v-on:click="moderateFeedback(item, column.command.feedbackModerate, key, 0)">
                                            Нет
                                        </label>
                                        <label class="btn btn-success-outline" :class="{'active': item.status === 1}">
                                            <input type="radio" value="1" v-on:click="moderateFeedback(item, column.command.feedbackModerate, key, 1)">
                                            Да
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td v-else>{{item[column.key]}}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
            <div v-if="columns[0].key === 'massAprove'" class="text-right">
                <p>&nbsp;</p>
                <template v-if="massApprove.length > 0">
                    <button class="btn btn-primary" type="button" v-on:click="massApproved()"><i class="icmn-thumbs-up2"></i> Массовое одобрение</button>
                </template>
                <template v-else>
                    <button class="btn btn-primary disabled" disabled="disabled" type="button"><i class="icmn-thumbs-up2"></i> Массовое одобрение</button>
                </template>
            </div>
        </div>
        <div class="text-right" v-if="pager !== null && widgets.pager !== undefined && widgets.pager === true">
            <ul class="pagination">
                <template v-if="page === 1">
                    <li class="paginate_button page-item previous disabled">
                        <a disabled class="page-link disabled">Предыдущая</a>
                    </li>
                </template>
                <template v-else>
                    <li class="paginate_button page-item previous">
                        <a href="#" v-on:click="changePage((page - 1), $event)" class="page-link">Предыдущая</a>
                    </li>
                </template>

                <template v-for="pageLink in pager">
                    <template v-if="pager.length > 4 && ((page + 2 < pageLink && pageLink < pager.length - 1) || (page - 2 > pageLink && pageLink > 1))">
                        <li class="paginate_button page-item disabled-page-link">
                            <a disabled class="page-link">...</a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="paginate_button page-item" :class="{ 'active' : pageLink === page }">
                            <a href="#" v-on:click="changePage(pageLink, $event)" class="page-link">{{pageLink}}</a>
                        </li>
                    </template>
                </template>


                    <template v-if="page === pager.length">
                    <li class="paginate_button page-item next disabled">
                        <a disabled class="page-link disabled">Следующая</a>
                    </li>
                </template>
                <template v-else>
                    <li class="paginate_button page-item next">
                        <a href="#" v-on:click="changePage((page + 1), $event)" class="page-link">Следующая</a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    import Elements from '~/components/render/elements.vue'
    import moment from 'moment'
    import { getFromApi } from '~/utils/api'

    export default {
      props: ['data', 'columns', 'query', 'modelKey', 'widgets', 'lastPage', 'expansion', 'project'],
      updated: function () {
        let self = this
        if (self.expansion !== undefined && self.trigger === true) {
          let temp = this.data
          Object.keys(temp).map(function (item) {
            if (self.expansion[item] !== undefined) {
              temp[item].included = 1
            } else {
              temp[item].included = 0
            }
          })
          self.data = temp
          self.trigger = false
        }
      },
      created: function () {
        // if (this.$route.query.filter !== undefined && this.$route.query.filter === 'new') {
        //  this.searchByTicketStatus = [0, 1]
        // }
        let self = this
        if (self.expansion !== undefined) {
          let temp = this.data
          Object.keys(temp).map(function (item) {
            if (self.expansion[item] !== undefined) {
              temp[item].included = 1
            } else {
              temp[item].included = 0
            }
          })
          this.data = temp
        }
        self.model = self.data
        if (self.columns !== undefined && self.columns.length > 0) {
          for (let i = 0; i < self.columns.length; i++) {
            if (self.columns[i].sortByDefault !== undefined && self.columns[i].sortByDefault === true) {
              self.sortBy = self.columns[i].key
            }
          }
        }
        if (self.lastPage && self.lastPage > 1) {
          self.updatePager(self.lastPage)
        }
      },
      data: function () {
        return {
          registeredby: 0,
          massApprove: [],
          trigger: false,
          mail_stop: 'Остановить',
          mail_play: 'Запустить',
          mail_resend: 'Возобновить',
          mail_replay: 'Запустить снова',
          close_button: 'Закрыть',
          edit_button: 'Редактировать',
          stop_button: 'Остановить',
          start_button: 'Запустить',
          remove_button: 'Удалить',
          approve_button: 'Одобрить',
          decline_button: 'Отклонить',
          read_button: 'К переписке',
          model: null,
          sortBy: null,
          searchByV2: {
            aggregator: '',
            offer: ''
          },
          searchByProvider: 'all',
          sortByDirection: 'DESC',
          searchBy: '',
          searchByID: '',
          searchByTicketDate: 'all',
          pager: null,
          page: 1,
          searchByOfferID: '',
          searchByTicketStatus: [0, 1],
          limit: 100,
          from: moment(moment().format('YYYY-MM') + '-01', 'YYYY-MM-DD').format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD')
        }
      },
      watch: {
        searchByProvider: {
          deep: true,
          handler: 'updateData'
        },
        searchByOfferID: {
          deep: true,
          handler: 'updateData'
        },
        from: {
          deep: true,
          handler: 'updateData'
        },
        to: {
          deep: true,
          handler: 'updateData'
        },
        page: {
          deep: true,
          handler: 'updateData'
        },
        registeredby: {
          deep: true,
          handler: 'updateData'
        },
        limit: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        },
        searchBy: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        },
        searchByV2: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        },
        searchByTicketStatus: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        },
        searchByTicketDate: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        },
        searchByID: {
          deep: true,
          handler: function () {
            if (this.page !== 1) {
              this.page = 1
            } else {
              this.updateData()
            }
          }
        }
      },
      methods: {
        moderateFeedback: function (item, type, key, status) {
          let self = this
          this.$swal({
            title: 'Вы уверены?',
            text: 'Вы пытаетесь ' + (item.status ? 'снять с публикации' : 'опубликовать') + ' отзыв',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Подтверждаю',
            cancelButtonText: 'Отмена'
          }).then(function () {
            return getFromApi(null, 'reseller-offers-reviews-public', 'moderate', {id: item.id, status: status})
              .then(function (res) {
                self.model[key].status = (status === 1 ? 1 : 0)
                if (res.data.status === 'success' && res.data.message !== 'review_unmount_success') {
                  self.$swal({
                    title: 'Успех!', text: 'Отзыв успешно опубликован', type: 'success', timer: 2000
                  })
                } else if (res.data.status === 'success' && res.data.message === 'review_unmount_success') {
                  self.$swal({
                    title: 'Успех!', text: 'Отзыв успешно снят с публикации', type: 'success', timer: 2000
                  })
                } else {
                  self.$swal({
                    title: 'Ошибка!', text: res.data.message, type: 'danger', timer: 2000
                  })
                }
              })
          })
        },
        toggleMassApprove: function (event) {
          let direction = event.currentTarget.checked
          let checkBoxList = document.querySelectorAll('.table-responsive tbody > tr > td:first-child > input')
          let self = this
          if (checkBoxList !== null) {
            for (let i = 0; i < checkBoxList.length; i++) {
              checkBoxList[i].checked = direction
              if (direction) {
                self.massApprove.push(checkBoxList[i].value)
              }
            }
            if (!direction) {
              self.massApprove = []
            }
          }
        },
        massApproved: function () {
          let id = this.massApprove.map(function (item) {
            return item.substr(4)
          })
          this.$swal({
            title: 'Вы уверены?',
            text: 'Вы пытаетесь массово одобрить выплаты!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, меня предупреждали!',
            cancelButtonText: 'Отмена'
          }).then(function () {
            return getFromApi(null, 'withdraws', 'massApprove', {withdraws: id})
              .then(function (res) {
                if (res.data.status === 'success') {
                  self.$swal({
                    title: 'Успех!',
                    text: 'Выплаты успешно одобрены',
                    type: 'success',
                    timer: 2000
                  })

                  if (id.length > 0) {
                    for (let x = 0; x <= id.length; x++) {
                      let approved = document.querySelector('tr#item-wds-' + id[x])
                      if (approved !== null) {
                        approved.style.opacity = 0.5
                      }
                    }
                  }
                } else {
                  self.$swal({
                    title: 'Системная ошибка!',
                    text: 'Произошла при попытке одобрить выплаты',
                    type: 'error',
                    timer: 2000
                  })
                }
              })
          })
        },
        adminAuth: function (event, key) {
          let sha256 = require('js-sha256').sha256
          return getFromApi(null, 'sign', 'siteFantomAuth', {'hash': '11;' + sha256(this.model[key].id + this.model[key].project_host)})
            .then(function (res) {
              if (res.data.status === 'success') {
                window.open(location.origin + '?token=' + encodeURIComponent(res.data.message), '_blank')
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке получить токен',
                  type: 'error',
                  timer: 2000
                })
              }
            })
        },
        siteAuth: function (event, key) {
          return getFromApi(null, 'sign', 'getSiteFantomAuthLink', {'user': this.model[key].id})
            .then(function (res) {
              if (res.data.status === 'success') {
                window.open(process.env.urls[process.env.currentUrl].site + 'sign/fantomauth?hash=' + res.data.message, '_blank')
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке получить токен для пользователя',
                  type: 'error',
                  timer: 2000
                })
              }
            })
        },
        toggleShop: function (event, key) {
          let self = this
          let allShops = this.data
          let allSelected = this.expansion

          if (allShops[key].included === 1) {
            if (allSelected[key] !== undefined) {
            } else {
              self.expansion[key] = {id: parseInt(key.substr(2), 10)}
              // console.warn('добавляю')
            }
          } else {
            if (allSelected[key] !== undefined) {
              delete self.expansion[key]
              // console.warn('удаляю')
            } else {
            }
          }

          return getFromApi(null, 'offers', 'give', {projects: [parseInt(self.project, 10)], offers: Object.keys(self.expansion).map(function (item) { return self.expansion[item].id })})
            .then(function (res) {
              if (res.data.status === 'success') {
                self.$swal({
                  title: 'Успех!',
                  text: 'Магазины были успешно назначены',
                  type: 'success',
                  timer: 2000
                })
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке назначить магазины проекту',
                  type: 'error',
                  timer: 2000
                })
              }
            })
        },
        lastActivityClass: function (key, test) {
          let val = {}
          if (this.model[key].lastActivity !== undefined && this.model[key].lastActivity !== null && this.model[key].lastActivity !== '') {
            if (this.model[key].activity.mobile_date === this.model[key].lastActivity) {
              val['last_browser'] = true
              val['last_activity'] = true
              val[(this.model[key].activity.mobile_os).toLowerCase()] = true
            } else if (this.model[key].activity.plugin_date === this.model[key].lastActivity) {
              val['last_plugin'] = true
              val[(this.model[key].activity.plugin_browser).toLowerCase()] = true
            } else if (this.model[key].activity.site_date === this.model[key].lastActivity) {
              val['site'] = true
              val['last_activity'] = true
            }
          }
          return val
        },
        lastActivityTooltip: function (key) {
          let val = ''
          if (this.model[key].lastActivity !== undefined && this.model[key].lastActivity !== null && this.model[key].lastActivity !== '') {
            if (this.model[key].activity.mobile_date === this.model[key].lastActivity) {
              val = 'Система: ' + this.model[key].activity.mobile_os + ' ' + this.model[key].activity.mobile_os_version + ', Приложение: v.' + this.model[key].activity.mobile_app_version
            } else if (this.model[key].activity.plugin_date === this.model[key].lastActivity) {
              val = 'Система: ' + this.model[key].activity.plugin_os + ', Плагин: v.' + this.model[key].activity.plugin_version
            } else if (this.model[key].activity.site_date === this.model[key].lastActivity) {
              val = 'Cтраница: ' + this.model[key].activity.site_page + ', Сайт: v.' + this.model[key].activity.site_version
            }
          }
          return val
        },
        lastActivity: function (key) {
          if (this.model[key].lastActivity !== undefined && this.model[key].lastActivity !== null && this.model[key].lastActivity !== '') {
            return moment(this.model[key].lastActivity, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
          } else {
            return '-'
          }
        },
        editMails: function (key) {
          this.$emit('updateContent', this.model[key])
        },
        mail_event: function (key) {
          let self = this
          let id = self.model[key].id
          let title = ''
          let status = 0
          switch (self.model[key].status) {
            case 0 :
              title = 'запустить рассылку'
              status = 1
              break
            case 1 :
              title = 'остановить рассылку'
              status = 2
              break
            case 2 :
              title = 'возобновить рассылку'
              status = 1
              break
            case 3 :
              title = 'запустить снова'
              status = 1
              break
          }
          self.$swal({
            title: 'Вы уверены?',
            text: 'Вы пытаетесь ' + title + '!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, ' + title + '!',
            cancelButtonText: 'Отмена'
          }).then(function () {
            return getFromApi(null, 'mailing', 'update', {id: id, status: status})
              .then(function (res) {
                if (res.data.status === 'success') {
                  self.model[key].status = res.data.message.status
                  self.model[key].statusName = res.data.message.statusName
                  self.$swal({
                    title: 'Успех!',
                    text: 'Статус рассылки с id "' + self.model[key].id + '" был успешно изменен',
                    type: 'success',
                    timer: 2000
                  })
                } else {
                  self.$swal({
                    title: 'Системная ошибка!',
                    text: 'Произошла при попытке ' + title + ' id ' + self.model[key].id,
                    type: 'error',
                    timer: 2000
                  })
                }
              })
          })
        },
        close_event: function (key, invoker) {
          let self = this
          let module = 'tickets'
          if (invoker === 'tickets-reseller') {
            module = 'reseller-tickets-public'
          }
          self.$swal({
            title: 'Вы уверены?',
            text: 'Вы пытаетесь закрыть тикет!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, закрыть тикет!',
            cancelButtonText: 'Отмена'
          }).then(function () {
            return getFromApi(null, module, 'close', {ticket: self.model[key].id})
              .then(function (res) {
                if (res.data.message === 'ticket_closed_success') {
                  self.$swal({
                    title: 'Успех!',
                    text: 'Тикет с id "' + self.model[key].id + '" был успешно закрыт',
                    type: 'success',
                    timer: 2000
                  })
                  document.querySelector('tr#item-' + self.model[key].id + ' .btn').innerText = 'Закрыт'
                  document.querySelector('tr#item-' + self.model[key].id + ' .btn').className = 'btn btn-danger'
                } else {
                  self.$swal({
                    title: 'Системная ошибка!',
                    text: 'Произошла при попытке закрыть тикет c id ' + self.model[key].id,
                    type: 'error',
                    timer: 2000
                  })
                }
              })
          })
        },
        approve_event: function (id) {
          let self = this
          self.$swal({
            title: 'Вы уверены?',
            type: 'warning',
            input: 'text',
            text: 'Укажите комментарий, если он нужен',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Подтвердить выплату',
            cancelButtonText: 'Отмена'
          }).then(function (reason) {
            return getFromApi(null, 'withdraws', 'approve', {withdraw: id.substr(4), comment: reason})
              .then(function (res) {
                if (res.data.message === 'withdraw_approved_success') {
                  self.$swal({
                    title: 'Успех!',
                    text: 'Операция успешно одобрена',
                    type: 'success',
                    timer: 2000
                  })
                  document.querySelector('tr#' + id).style.opacity = 0.5
                } else {
                  self.$swal({
                    title: 'Системная ошибка!',
                    text: 'Произошла при попытке одобрения операции',
                    type: 'error',
                    timer: 2000
                  })
                }
              })
          })
        },
        decline_event: function (id) {
          let self = this
          self.$swal({
            title: 'Вы уверены?',
            type: 'warning',
            input: 'text',
            text: 'Укажите причину',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Отклонить выплату',
            cancelButtonText: 'Отмена'
          }).then(function (reason) {
            return getFromApi(null, 'withdraws', 'reject', {withdraw: id.substr(4), comment: reason})
              .then(function (res) {
                if (res.data.message === 'withdraw_rejected_success') {
                  self.$swal({
                    title: 'Успех!',
                    text: 'Операция успешно отклонена',
                    type: 'success',
                    timer: 2000
                  })
                  document.querySelector('tr#' + id).style.opacity = 0.5
                } else {
                  self.$swal({
                    title: 'Системная ошибка!',
                    text: 'Произошла при попытке отклонения операции',
                    type: 'error',
                    timer: 2000
                  })
                }
              })
          })
        },
        stop_event: function (key) {
          let self = this
          self.model[key].available = 0

          return getFromApi(null, 'offers', 'swithStatus', {id: self.model[key].id})
            .then(function (res) {
              if (res.data.message === 'status_changed') {
                self.$swal({
                  title: 'Успех!',
                  text: 'Магазин "' + self.model[key].name + '" был успешно остановлен',
                  type: 'success',
                  timer: 2000
                })
              } else if (res.data.message === 'offer_not_found') {
                self.$swal({
                  title: 'Ошибка!',
                  text: 'Магазин c id ' + self.model[key].id + ' - не найден в системе',
                  type: 'error',
                  timer: 2000
                })
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке остановить магазин c id ' + self.model[key].id,
                  type: 'error',
                  timer: 2000
                })
              }
            })
        },
        start_event: function (key) {
          let self = this
          self.model[key].available = 1

          return getFromApi(null, 'offers', 'swithStatus', {id: self.model[key].id})
            .then(function (res) {
              if (res.data.message === 'status_changed') {
                self.$swal({
                  title: 'Успех!',
                  text: 'Магазин "' + self.model[key].name + '" был успешно запущен',
                  type: 'success',
                  timer: 2000
                })
              } else if (res.data.message === 'offer_not_found') {
                self.$swal({
                  title: 'Ошибка!',
                  text: 'Магазин c id ' + self.model[key].id + ' - не найден в системе',
                  type: 'error',
                  timer: 2000
                })
              } else {
                self.$swal({
                  title: 'Системная ошибка!',
                  text: 'Произошла при попытке запустить магазин c id ' + self.model[key].id,
                  type: 'error',
                  timer: 2000
                })
              }
            })
        },
        remove_event: function (key, invoker) {
          let module
          let action
          let data
          let entity
          let self = this
          switch (invoker) {
            case 'faq-reseller':
              module = 'reseller-faq-public'
              action = 'delete'
              data = {faq: self.model[key].id}
              entity = 'раздел'
              break
            case 'faq-element-reseller':
              module = 'reseller-faq-public'
              action = 'deleteItem'
              data = {item: self.model[key].id}
              entity = 'запись в разделе'
              break
            case 'projects-admin':
              module = 'projects'
              action = 'delete'
              data = {project: self.model[key].id}
              entity = 'проект'
              break
            case 'tickets-templates-admin':
              module = 'tickets'
              action = 'deleteTemplate'
              data = {template: self.model[key].id}
              entity = 'шаблон'
              break
            case 'users-admin':
              module = 'users'
              action = 'delete'
              data = {id: self.model[key].id}
              entity = 'пользователя'
              break
            case 'news-admin':
              module = 'news'
              action = 'deleteNews'
              data = {news: {id: self.model[key].id}}
              entity = 'новость'
              break
            case 'news-reseller':
              module = 'reseller-news-public'
              action = 'deleteNews'
              data = {news: {id: self.model[key].id}}
              entity = 'новость'
              break
            case 'shops-categories-admin':
              module = 'categories'
              action = 'deleteCategory'
              data = {category: self.model[key].id}
              entity = 'категорию'
              break
            case 'shops-admin':
              module = 'offers'
              action = 'deletePerm'
              data = {offer: self.model[key].id}
              entity = 'магазин'
              break
            case 'tickets-admin':
              module = 'tickets'
              action = 'delete'
              data = {id: self.model[key].id}
              entity = 'тикет'
              break
          }
          self.$swal({
            title: 'Вы уверены?',
            text: 'Вы пытаетесь удалить ' + entity + '!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить ' + entity + '!',
            cancelButtonText: 'Отмена'
          }).then(function () {
            return getFromApi(null, module, action, data)
              .then(function (res) {
                if (invoker === 'shops-categories-admin') {
                  if (res.data.message === 'category_deleted_success') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Категория "' + self.model[key].name + '" была успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'category_not_found') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Категория c id ' + self.model[key].id + ' - не найден в системе',
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Ошибка!',
                      text: res.data.message,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'faq-reseller') {
                  if (res.data.message === 'deleted_success') {
                    self.model[key].available = 0
                    self.$swal({
                      title: 'Успех!',
                      text: 'Раздел "' + self.model[key].title + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'faq_not_found') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Не найден раздел c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить раздел c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'faq-element-reseller') {
                  if (res.data.message === 'deleted_success') {
                    self.model[key].available = 0
                    self.$swal({
                      title: 'Успех!',
                      text: 'Запись "' + self.model[key].title + '" была успешно удалена',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'entity_not_found') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Не найдена запись c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить запись c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'shops-admin') {
                  if (res.data.message === 'offer_deleted_successfull') {
                    self.model[key].available = 0
                    self.$swal({
                      title: 'Успех!',
                      text: 'Магазин "' + self.model[key].name + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'offer_not_found') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Магазин c id ' + self.model[key].id + ' - не найден в системе',
                      type: 'error',
                      timer: 2000
                    })
                  } else if (res.data.message === 'failed_to_delete_offer') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Произошла при попытке удалить магазин c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else if (res.data.message === 'projects_unlink_failed') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Произошла при попытке отлинковать магазин c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить магазин c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'tickets-templates-admin') {
                  if (res.data.message === 'deleted_success') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Шаблон "' + self.model[key].title + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить шаблон c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'projects-admin') {
                  if (res.data.message === 'project_deleted_successfull') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Проект "' + self.model[key].name + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить новость c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'news-reseller') {
                  if (res.data.message === 'news_delete_successfully') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Новость "' + self.model[key].title + '" была успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'news_delete_failed') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Произошла при попытке удалить новость c id "' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить новость c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'news-admin') {
                  if (res.data.message === 'news_delete_successfully') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Новость "' + self.model[key].title + '" была успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else if (res.data.message === 'news_delete_failed') {
                    self.$swal({
                      title: 'Ошибка!',
                      text: 'Произошла при попытке удалить новость c id "' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить новость c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'tickets-admin') {
                  if (res.data.message === 'ticket_delete_succesfully') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Тикет с id "' + self.model[key].id + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить тикет c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                } else if (invoker === 'users-admin') {
                  if (res.data.message === 'deleted_successfull') {
                    self.$swal({
                      title: 'Успех!',
                      text: 'Пользователь с id "' + self.model[key].id + '" был успешно удален',
                      type: 'success',
                      timer: 2000
                    })
                    if (document.querySelector('table #item-' + self.model[key].id) !== null) {
                      document.querySelector('table #item-' + self.model[key].id).style.opacity = 0.5
                    }
                  } else {
                    self.$swal({
                      title: 'Системная ошибка!',
                      text: 'Произошла при попытке удалить пользователя c id ' + self.model[key].id,
                      type: 'error',
                      timer: 2000
                    })
                  }
                }
              })
          })
        },
        changePage: function (page, event) {
          event.preventDefault()
          this.page = page
        },
        updatePager: function (data) {
          var tempPager = []
          for (let i = 0; i < data; i++) {
            tempPager.push(i + 1)
          }
          this.pager = tempPager
        },
        sortByColumn: function (key) {
          if (this.sortBy === key) {
            if (this.sortByDirection === 'DESC') {
              this.sortByDirection = 'ASC'
            } else {
              this.sortByDirection = 'DESC'
            }
          } else {
            this.sortByDirection = 'DESC'
          }
          this.sortBy = key
          this.updateData()
        },
        classObject: function (column) {
          if (column.sortByDefault !== undefined && this.sortBy === column.key) {
            if (this.sortByDirection === 'DESC') {
              return 'sorting_desc'
            } else {
              return 'sorting_asc'
            }
          } else {
            return 'sorting'
          }
        },
        updateData: function () {
          let module = this.query[0]
          let action = this.query[1]
          let options = this.query[2]
          var self = this

          if (self.sortBy !== null) {
            options.orderBy = self.sortBy + ' ' + self.sortByDirection
          }

          if (this.page !== null) {
            options.paginator = {
              limit: this.limit,
              page: this.page
            }
          }

          // toDO узнать сколько символов до запуска поиска. Код закоменчен ниже
          if (this.searchBy !== '') {
            options.search = this.searchBy
          } else {
            delete options['search']
          }
          if (Object.keys(this.searchByV2).length > 0 && this.widgets !== undefined && this.widgets.searchByTextV2 !== undefined && this.widgets.searchByTextV2.aggregators !== undefined) {
            options.search = {}
            if (this.searchByV2.aggregator !== 'all' && this.searchByV2.aggregator !== '' && this.searchByV2.aggregator !== null) {
              options.search.aggregator = this.searchByV2.aggregator
            }
            if (this.searchByV2.offer !== 'all' && this.searchByV2.offer !== '' && this.searchByV2.offer !== null) {
              options.search.offer = this.searchByV2.offer
            }
          } else {
            if (this.searchBy === '') {
              delete options['search']
            }
          }

          if (this.searchByID !== '') {
            options.user = this.searchByID
          } else {
            delete options['user']
          }

          if (this.registeredby !== 0) {
            options.registeredby = this.registeredby
          } else {
            delete options['registeredby']
          }

          if (this.widgets !== undefined && this.widgets.searchByTicketDate !== undefined && this.widgets.searchByTicketDate === true && this.searchByTicketDate !== '' && this.searchByTicketDate !== 'all') {
            options.dateRange = this.searchByTicketDate
          } else {
            delete options['dateRange']
          }

          if (this.widgets !== undefined && this.widgets.searchByTicketStatus !== undefined && this.widgets.searchByTicketStatus === true && this.searchByTicketStatus !== '' && this.searchByTicketStatus.length > 0) {
            options.status = this.searchByTicketStatus
          } else {
            delete options['status']
          }

          if (this.widgets !== undefined && this.widgets.dataRange !== undefined && this.widgets.dataRange === true && this.from !== this.to) {
            options.dateRange = {
              from: this.from,
              to: this.to
            }
          } else {
            delete options['dateRange']
          }

          if (this.widgets !== undefined && this.widgets.searchByOfferId !== undefined && this.widgets.searchByOfferId === true && this.searchByOfferID !== '') {
            options.offer_id = this.searchByOfferID
          } else {
            delete options['offer_id']
          }

          if (this.widgets !== undefined && this.widgets.aggregators !== undefined && Object.keys(this.widgets.aggregators).length > 0 && this.searchByProvider !== 'all') {
            options.aggregator_id = this.searchByProvider
          } else {
            delete options['aggregator_id']
          }

          // if (this.searchBy !== '' && this.searchBy.length > 2) {
          // options.search = this.searchBy
          // } else {
          // delete options.search
          // }

          return getFromApi(null, module, action, options)
            .then(function (res) {
              self.trigger = true
              if (self.modelKey !== undefined && self.modelKey !== null && self.modelKey !== '') {
                self.model = res.data.message[self.modelKey]
              } else {
                self.model = res.data.message
              }
              if (res.data.message && res.data.message.lastPage && res.data.message.lastPage > 1) {
                self.updatePager(res.data.message.lastPage)
              }
            })
        }
      },
      components: {
        Elements
      }
    }
</script>
