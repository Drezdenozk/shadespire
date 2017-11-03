<template>
    <nav class="left-menu" id="left-menu" left-menu v-if="accessMenu">
        <div class="logo-container">
            <nuxt-link to="/" class="logo" style="max-width:100%">
                <img class="logo-inverse" src="~static/logo_wmr_w.svg" alt="Web masters rules!" />
            </nuxt-link>
        </div>
        <div class="left-menu-inner scroll-pane">
            <ul class="left-menu-list left-menu-list-root list-unstyled">
                <nuxt-link class="left-menu-link visible-xs-block" to="/" tag="li" active-class="left-menu-list-active">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-warning"></i>
                        Главная
                    </a>
                </nuxt-link>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.statistic) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-area-chart"><!-- --></i>
                        Статистика
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/statistic/all" tag="li" active-class="actived" v-if="accessMenu.admin.statistic['all'] === true">
                            <a href="#" class="left-menu-link">
                                Сводная
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/statistic/by-offers" tag="li" active-class="actived" v-if="accessMenu.admin.statistic['by-offers'] === true">
                            <a href="#" class="left-menu-link">
                                По офферам
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/statistic/by-time" tag="li" active-class="actived" v-if="accessMenu.admin.statistic['by-time'] === true">
                            <a href="#" class="left-menu-link">
                                По времени
                            </a>
                        </nuxt-link>
                        <li>
                            <nuxt-link class="left-menu-link" to="/404">
                                По реселлерам [dev]
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link class="left-menu-link" to="/404">
                                Финансовая [dev]
                            </nuxt-link>
                        </li>
                        <nuxt-link to="/admin/statistic/old-stuff" tag="li" active-class="actived" v-if="accessMenu.admin.statistic['old-stuff'] === true">
                            <a href="#" class="left-menu-link">
                                Забытые заказы
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/statistic/by-turn" tag="li" active-class="actived" v-if="accessMenu.admin.statistic['by-turn'] === true">
                            <a href="#" class="left-menu-link">
                                Оборот
                            </a>
                        </nuxt-link>
                    </ul>
                </li>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.shops) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-shopping-bag"><!-- --></i>
                        Магазины
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/shops" tag="li" active-class="actived" v-if="accessMenu.admin.shops['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список магазинов
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/shops/add" tag="li" active-class="actived" v-if="accessMenu.admin.shops['add'] === true">
                            <a href="#" class="left-menu-link">
                                Добавить новый
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/shops/categories" tag="li" active-class="actived" v-if="accessMenu.admin.shops['categories'] === true">
                            <a href="#" class="left-menu-link">
                                Категории
                            </a>
                        </nuxt-link>
                    </ul>
                </li>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.projects) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-list"><!-- --></i>
                        Проекты
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/projects" tag="li" active-class="actived" v-if="accessMenu.admin.projects['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список проектов
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/projects/add" tag="li" active-class="actived" v-if="accessMenu.admin.projects['add'] === true">
                            <a href="#" class="left-menu-link">
                                Добавить новый
                            </a>
                        </nuxt-link>
                    </ul>
                </li>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.users) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-users"><!-- --></i>
                        Люди
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/users/admins" tag="li" active-class="actived" v-if="accessMenu.admin.users['admins'] === true">
                            <a href="#" class="left-menu-link">
                                Сотрудники
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/users/resellers" tag="li" active-class="actived" v-if="accessMenu.admin.users['resellers'] === true">
                            <a href="#" class="left-menu-link">
                                Сотрудники проектов
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/users" tag="li" active-class="actived" v-if="accessMenu.admin.users['list'] === true">
                            <a href="#" class="left-menu-link">
                                Пользователи
                            </a>
                        </nuxt-link>
                    </ul>
                </li>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.finances) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-credit-card-alt"><!-- --></i>
                        Выплаты
                        <nuxt-link tag="span" to="/admin/finances/moderate" v-if="payCounters > 0" class="label left-menu-label label-warning">{{payCounters}}</nuxt-link>
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/finances" tag="li" active-class="actived" v-if="accessMenu.admin.finances['list'] === true">
                            <a href="#" class="left-menu-link">
                                Все
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/finances/moderate" tag="li" active-class="actived" v-if="accessMenu.admin.finances['moderate'] === true">
                            <a href="#" class="left-menu-link">
                                На рассмотрении
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/finances/approved" tag="li" active-class="actived" v-if="accessMenu.admin.finances['approved'] === true">
                            <a href="#" class="left-menu-link">
                                В процессе
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/finances/history" tag="li" active-class="actived" v-if="accessMenu.admin.finances['history'] === true">
                            <a href="#" class="left-menu-link">
                                История
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/finances/corrects" tag="li" active-class="actived" v-if="accessMenu.admin.finances['corrects'] === true">
                            <a href="#" class="left-menu-link">
                                Корректировки
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/finances/providers" tag="li" active-class="actived" v-if="accessMenu.admin.finances['providers'] === true">
                            <a href="#" class="left-menu-link">
                                Платежные системы
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <nuxt-link class="left-menu-link" to="/admin/orders" tag="li" active-class="left-menu-list-active" v-if="getTrue(accessMenu.admin.orders) > 0">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-shopping-cart"><!-- --></i>
                        Все заказы
                    </a>
                </nuxt-link>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.news) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-newspaper-o"><!-- --></i>
                        Новости
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/news" tag="li" active-class="actived" v-if="accessMenu.admin.news['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список новостей
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/news/add" tag="li" active-class="actived" v-if="accessMenu.admin.news['add'] === true">
                            <a href="#" class="left-menu-link">
                                Добавить новость
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.mails) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-envelope"><!-- --></i>
                        Рассылки
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/mails" tag="li" active-class="actived" v-if="accessMenu.admin.mails['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список рассылок
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/mails/add" tag="li" active-class="actived" v-if="accessMenu.admin.mails['add'] === true">
                            <a href="#" class="left-menu-link">
                                Добавить рассылку
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/mails/templates" tag="li" active-class="actived" v-if="accessMenu.admin.mails['templates'] === true">
                            <a href="#" class="left-menu-link">
                                Список шаблонов
                            </a>
                        </nuxt-link>
                    </ul>
                </li>
                
                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.tickets) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-question-circle"><!-- --></i>
                        Тикеты
                        <nuxt-link tag="span" to="/admin/tickets?filter=new" v-if="userCounters > 0" class="label left-menu-label label-warning">{{userCounters}}</nuxt-link>
                        <nuxt-link tag="span" to="/admin/tickets/from-partners" v-if="resellerCounters > 0" style="margin-right:2px" class="label left-menu-label label-danger">{{resellerCounters}}</nuxt-link>
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/tickets" tag="li" active-class="actived" v-if="accessMenu.admin.tickets['user-list'] === true">
                            <a href="#" class="left-menu-link">
                                От пользователей
                                <span v-if="userCounters > 0" class="label left-menu-label label-warning">{{userCounters}}</span>
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/tickets/from-partners" tag="li" active-class="actived" v-if="accessMenu.admin.tickets['partner-list'] === true">
                            <a href="#" class="left-menu-link">
                                От партнёров
                                <span v-if="resellerCounters > 0" class="label left-menu-label label-danger">{{resellerCounters}}</span>
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.settings) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-cog"><!-- --></i>
                        Настройки
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/settings/templates" tag="li" active-class="actived" v-if="accessMenu.admin.settings['templates'] === true">
                            <a href="#" class="left-menu-link">
                                Шаблоны
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/settings/messages" tag="li" active-class="actived" v-if="accessMenu.admin.settings['messages'] === true">
                            <a href="#" class="left-menu-link">
                                Оповещения
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/settings/tickets" tag="li" active-class="actived" v-if="accessMenu.admin.settings['tickets'] === true">
                            <a href="#" class="left-menu-link">
                                Ответы на тикеты
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <nuxt-link class="left-menu-link" to="/admin/logs" tag="li" active-class="left-menu-list-active" v-if="getTrue(accessMenu.admin.logs) > 0">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-calendar"></i>
                        Логи
                    </a>
                </nuxt-link>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.admin.system) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-cogs"><!-- --></i>
                        Система
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/admin/system/sync" tag="li" active-class="actived" v-if="accessMenu.admin.system['sync'] === true">
                            <a href="#" class="left-menu-link">
                                Синхронизация
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/system/migrations" tag="li" active-class="actived" v-if="accessMenu.admin.system['migrations'] === true">
                            <a href="#" class="left-menu-link">
                                Миграции
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/admin/system/test" tag="li" active-class="actived" v-if="accessMenu.admin.system['test'] === true">
                            <a href="#" class="left-menu-link">
                                Самотест
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <nuxt-link class="left-menu-link" to="/support" tag="li" active-class="left-menu-list-active" v-if="getTrue(accessMenu['support-agent'].tickets) > 0">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-calendar"></i>
                        Тикеты
                        <nuxt-link tag="span" to="/support?filter=new" v-if="userCounters > 0" class="label left-menu-label label-warning">{{userCounters}}</nuxt-link>
                    </a>
                </nuxt-link>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.partner.shops) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-shopping-bag"><!-- --></i>
                        Магазины
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/panel/shops" tag="li" active-class="actived" v-if="accessMenu.partner.shops['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список магазинов
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <li class="left-menu-list-submenu" v-if="accessMenu.partner.feedbacks['list'] === true">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon icmn-bullhorn"></i>
                        Отзывы
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/panel/feedbacks/moderate" tag="li" active-class="actived">
                            <a href="#" class="left-menu-link">
                                На модерации
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/panel/feedbacks/published" tag="li" active-class="actived">
                            <a href="#" class="left-menu-link">
                                Опубликованные
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/panel/feedbacks" tag="li" active-class="actived">
                            <a href="#" class="left-menu-link">
                                Все
                            </a>
                        </nuxt-link>
                    </ul>
                </li>

                <nuxt-link class="left-menu-link" to="/panel/orders" tag="li" active-class="left-menu-list-active" v-if="accessMenu.partner.orders['list'] === true">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-shopping-cart"><!-- --></i>
                        Все заказы
                    </a>
                </nuxt-link>

                <nuxt-link class="left-menu-link" to="/panel/tickets" tag="li" active-class="left-menu-list-active" v-if="accessMenu.partner.tickets['list'] === true">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon fa fa-calendar"></i>
                        Тикеты
                    </a>
                </nuxt-link>

                <li class="left-menu-list-submenu" v-if="getTrue(accessMenu.partner.news) > 0">
                    <a class="left-menu-link" href="#" v-on:click="toggleMenu($event)">
                        <i class="left-menu-link-icon fa fa-newspaper-o"><!-- --></i>
                        Новости
                    </a>
                    <ul class="left-menu-list list-unstyled">
                        <nuxt-link to="/panel/news" tag="li" active-class="actived" v-if="accessMenu.partner.news['list'] === true">
                            <a href="#" class="left-menu-link">
                                Список новостей
                            </a>
                        </nuxt-link>
                        <nuxt-link to="/panel/news/add" tag="li" active-class="actived" v-if="accessMenu.partner.news['add'] === true">
                            <a href="#" class="left-menu-link">
                                Добавить новость
                            </a>
                        </nuxt-link>
                    </ul>
                </li>


                <nuxt-link class="left-menu-link" to="/panel/faq" tag="li" active-class="left-menu-list-active" v-if="accessMenu.partner.faq['list'] === true">
                    <a href="#" class="left-menu-link">
                        <i class="left-menu-link-icon icmn-question2"></i>
                        ЧаВо
                    </a>
                </nuxt-link>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
      computed: mapGetters(['accessMenu', 'userCounters', 'resellerCounters', 'payCounters']),
      methods: {
        getTrue: function (object) {
          let temp = []
          Object.keys(object).map(function (item, index) {
            if (typeof object[item] !== 'object' && object[item]) {
              temp.push(index)
            }
          })
          return temp.length
        },
        toggleMenu (event) {
          event.preventDefault()
          let item = event.target
          if (!item.parentNode.classList.contains('left-menu-list-opened')) {
            let old = document.querySelectorAll('#left-menu .left-menu-list-opened')
            for (let i = 0; i < old.length; i++) {
              old[i].classList.remove('left-menu-list-opened')
              if (old[i].querySelector('.left-menu-list') !== null) {
                old[i].querySelector('.left-menu-list').style = 'display:none'
              }
            }
            item.parentNode.classList.add('left-menu-list-opened')
            if (item.nextSibling !== null) {
              item.nextSibling.style = 'display:block'
            }
          } else {
            item.parentNode.classList.remove('left-menu-list-opened')
            if (item.nextSibling !== null) {
              item.nextSibling.style = 'display:none'
            }
          }
        }
      }
    }
</script>
