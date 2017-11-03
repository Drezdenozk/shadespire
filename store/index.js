import Vuex from 'vuex'
import { getFromApi } from '~/utils/api'
import { getUserFromCookie } from '~/utils/auth'

const store = () => new Vuex.Store({

  state: {
    guestToken: null,
    user: null,
    userProfile: {
      id: null,
      avatar: null,
      groups: []
    },
    balance: {
      holded: {RUB: 0, EUR: 0, USD: 0},
      approved: {RUB: 0, EUR: 0, USD: 0}
    },
    mRules: {
      admin: {
        access: false,
        statistic: {
          all: false,
          'by-offers': false,
          'by-time': false,
          'old-stuff': false,
          'by-turn': false
        },
        shops: {
          list: false,
          add: false,
          edit: false,
          categories: false
        },
        projects: {
          list: false,
          add: false,
          edit: false
        },
        users: {
          resellers: false,
          list: false,
          add: false,
          edit: false,
          admins: false
        },
        finances: {
          list: false,
          moderate: false,
          approved: false,
          history: false,
          corrects: false,
          providers: false
        },
        orders: {
          list: false
        },
        news: {
          list: false,
          add: false,
          edit: false
        },
        mails: {
          list: false,
          add: false,
          edit: false,
          templates: {
            list: false,
            add: false,
            edit: false
          }
        },
        tickets: {
          'user-list': false,
          'partner-list': false,
          'user-read': false
        },
        settings: {
          templates: false,
          messages: false,
          tickets: false
        },
        logs: {
          list: false
        },
        system: {
          sync: false,
          migrations: false,
          test: false
        }
      },
      'partner': {
        access: false,
        shops: {
          list: false,
          edit: false
        },
        feedbacks: {
          list: false
        },
        orders: {
          list: false
        },
        news: {
          list: false,
          add: false
        },
        tickets: {
          list: false
        },
        faq: {
          list: false
        }
      },
      'support-agent': {
        access: false,
        tickets: {
          'user-list': false,
          'user-read': false
        }
      }
    },
    counters: {
      'tickets-from-users': 0,
      'tickets-from-resellers': 0,
      'orders-to-approve': 0
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user || null
    },
    SET_GUEST (state, token) {
      state.guestToken = token || null
    },
    SET_UCOUNTER (state, counter) {
      state.counters['tickets-from-users'] = counter || 0
    },
    SET_RCOUNTER (state, counter) {
      state.counters['tickets-from-resellers'] = counter || 0
    },
    SET_PCOUNTER (state, counter) {
      state.counters['orders-to-approve'] = counter || 0
    },
    SET_PROFILE (state, object) {
      state.userProfile = object || {id: null, avatar: null, groups: []}
    },
    SET_BALANCE (state, object) {
      state.balance = object || {holded: {RUB: 0, EUR: 0, USD: 0}, approved: {RUB: 0, EUR: 0, USD: 0}}
    },
    SET_MRULES (state, rules) {
      if (rules !== undefined && rules.length > 0) {
        for (let i = 0; i < rules.length; i++) {
          if (rules[i] === 1) {
            Object.keys(state.mRules['admin']).map(function (item) {
              if (typeof state.mRules['admin'][item] !== 'object') {
                state.mRules['admin'][item] = true
              } else {
                Object.keys(state.mRules['admin'][item]).map(function (item2) {
                  if (typeof state.mRules['admin'][item][item2] !== 'object') {
                    state.mRules['admin'][item][item2] = true
                  } else {
                    Object.keys(state.mRules['admin'][item][item2]).map(function (item3) {
                      state.mRules['admin'][item][item2][item3] = true
                    })
                  }
                })
              }
            })
            break
          } else if (rules[i] === 3) {
            Object.keys(state.mRules['partner']).map(function (item) {
              if (typeof state.mRules['partner'][item] !== 'object') {
                state.mRules['partner'][item] = true
              } else {
                Object.keys(state.mRules['partner'][item]).map(function (item2) {
                  if (typeof state.mRules['partner'][item][item2] !== 'object') {
                    state.mRules['partner'][item][item2] = true
                  } else {
                    Object.keys(state.mRules['partner'][item][item2]).map(function (item3) {
                      state.mRules['partner'][item][item2][item3] = true
                    })
                  }
                })
              }
            })
          } else if (rules[i] === 7) {
            Object.keys(state.mRules['support-agent']).map(function (item) {
              if (typeof state.mRules['support-agent'][item] !== 'object') {
                state.mRules['support-agent'][item] = true
              } else {
                Object.keys(state.mRules['support-agent'][item]).map(function (item2) {
                  if (typeof state.mRules['support-agent'][item][item2] !== 'object') {
                    state.mRules['support-agent'][item][item2] = true
                  } else {
                    Object.keys(state.mRules['support-agent'][item][item2]).map(function (item3) {
                      state.mRules['support-agent'][item][item2][item3] = true
                    })
                  }
                })
              }
            })
          }
        }
      }
    }
  },
  actions: {
    nuxtServerInit ({ dispatch, getters }, { req, redirect, query }) {
      return new Promise((resolve, reject) => {
        let token
        if (query.token !== undefined && query.token !== null && query.token !== '') {
          dispatch('updateGuestToken', decodeURIComponent(query.token))
          token = decodeURIComponent(query.token)
        } else if (getters.guestToken !== null) {
          token = getUserFromCookie(getters.guestToken)
        } else {
          token = getUserFromCookie(req)
        }
        if (token !== undefined && token !== null) {
          return Promise.all([
            dispatch('updateProfile', token)
          ]).then((groups) => {
            let promiseList = []
            if (groups[0].indexOf(1) !== -1) {
              promiseList.push(dispatch('updateAdminTicketsCounter', token))
              promiseList.push(dispatch('updateAdminOrdersCounter', token))
              promiseList.push(dispatch('updateAdminBalance', token))
            } else if (groups[0].indexOf(3) !== -1) {
              promiseList.push(dispatch('updateResellerBalance', token))
            } else if (groups[0].indexOf(7) !== -1) {
            }
            if (promiseList.length > 0) {
              return Promise.all(promiseList).then((res2) => {
                resolve(true)
              })
            } else {
              resolve(true)
            }
          })
        } else {
          redirect('/sign/in')
          resolve(true)
        }
      })
    },
    updateGuestToken ({commit}, token) {
      commit('SET_GUEST', token)
    },
    updateProfile ({commit}, token) {
      return new Promise((resolve, reject) => {
        getFromApi(null, 'user-public', 'getProfile', {}, token)
          .then((res) => {
            let groups = []
            if (Object.keys(res.data.message.groups).length > 0) {
              groups = Object.keys(res.data.message.groups).map(function (item) {
                return res.data.message.groups[item].id
              })
              commit('SET_MRULES', groups)
            }
            commit('SET_PROFILE', res.data.message)
            resolve(groups)
          })
      })
    },
    updateAdminBalance ({commit}, token) {
      return new Promise((resolve, reject) => {
        getFromApi(null, 'finance', 'getBalance', {}, token)
          .then((res) => {
            let balance = {
              approved: 0,
              holded: 0
            }
            if (res.data.message.approved !== undefined && res.data.message.approved !== null) {
              balance.approved = res.data.message.approved
            } else {
              balance.approved = {RUB: 0, EUR: 0, USD: 0}
            }
            if (res.data.message.hold !== undefined && res.data.message.hold !== null) {
              balance.holded = res.data.message.hold
            } else {
              balance.holded = {RUB: 0, EUR: 0, USD: 0}
            }
            commit('SET_BALANCE', balance)
            resolve(true)
          })
      })
    },
    updateResellerBalance ({commit}, token) {
      return new Promise((resolve, reject) => {
        getFromApi(null, 'reseller-finance-public', 'getBalance', {}, token)
          .then((res) => {
            let balance = {
              approved: 0,
              holded: 0
            }
            if (res.data.message.approved !== undefined && res.data.message.approved !== null) {
              balance.approved = res.data.message.approved
            } else {
              balance.approved = {RUB: 0, EUR: 0, USD: 0}
            }
            if (res.data.message.hold !== undefined && res.data.message.hold !== null) {
              balance.holded = res.data.message.hold
            } else {
              balance.holded = {RUB: 0, EUR: 0, USD: 0}
            }
            commit('SET_BALANCE', balance)
            resolve(true)
          })
      })
    },
    updateAdminTicketsCounter ({commit}, token) {
      return new Promise((resolve, reject) => {
        getFromApi(null, 'tickets', 'getCounters', {}, token)
          .then((res) => {
            if (res.data.message !== undefined && res.data.message !== null && res.data.message.counters !== undefined && res.data.message !== null) {
              if (res.data.message.counters.users !== undefined && res.data.message.counters.users !== null) {
                commit('SET_UCOUNTER', res.data.message.counters.users)
              }
              if (res.data.message.counters.resellers !== undefined && res.data.message.counters.resellers !== null) {
                commit('SET_RCOUNTER', res.data.message.counters.resellers)
              }
            }
            resolve(true)
          })
      })
    },
    updateSupportTicketsCounter ({commit}) {

    },
    updateAdminOrdersCounter ({commit}, token) {
      return new Promise((resolve, reject) => {
        getFromApi(null, 'withdraws', 'listWdsToApprove', {}, token)
          .then((res) => {
            if (res.data.message !== undefined && res.data.message !== null && res.data.message.withdraws !== undefined && res.data.message.withdraws !== null) {
              commit('SET_PCOUNTER', Object.keys(res.data.message.withdraws).length)
            }
            resolve(true)
          })
      })
    }
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user
    },
    loggedUser (state) {
      return state.user
    },
    guestToken (state) {
      return state.guestToken
    },
    userCounters (state) {
      return state.counters['tickets-from-users']
    },
    resellerCounters (state) {
      return state.counters['tickets-from-resellers']
    },
    payCounters (state) {
      return state.counters['orders-to-approve']
    },
    accessMenu (state) {
      return state.mRules
    },
    userProfile (state) {
      return state.userProfile
    },
    userGroups (state) {
      let groups = []
      if (Object.keys(state.userProfile.groups).length > 0) {
        groups = Object.keys(state.userProfile.groups).map(function (item) {
          return state.userProfile.groups[item].id
        })
      }
      return groups
    },
    userBalance (state) {
      return state.balance
    },
    userAvatar (state) {
      return state.userProfile.avatar
    },
    userId (state) {
      return state.userProfile.id
    }
  }
})

export default store
