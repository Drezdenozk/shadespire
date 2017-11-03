import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, redirect, req, route, query }) {
  let token
  if (store.getters.guestToken !== null) {
    token = store.getters.guestToken
  } else if (query.token !== undefined && query.token !== null && query.token !== '') {
    token = decodeURIComponent(query.token)
  } else {
    token = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  }
  if (token !== undefined && token !== null) {
    store.commit('SET_USER', token)
    if (store.getters.userId === null) {
      store.dispatch('updateProfile', token).then(
        function (userGroups) {
          let path = route.path.split('/')
          let fact = false
          if (path[1] !== '' && path[1] !== 'sign' && path[1] !== '404' && path[1] !== '_nuxt') {
            switch (path[1]) {
              case 'admin':
                fact = userGroups.indexOf(1) !== -1
                break
              case 'panel':
                fact = userGroups.indexOf(3) !== -1
                break
              case 'support':
                fact = userGroups.indexOf(7) !== -1
                break
            }
            if (!fact) {
              redirect('/404')
            }
          }
          if (userGroups.indexOf(1) !== -1) {
            store.dispatch('updateAdminTicketsCounter', token)
            store.dispatch('updateAdminOrdersCounter', token)
            store.dispatch('updateAdminBalance', token)
          } else if (userGroups.indexOf(3) !== -1) {
            store.dispatch('updateResellerBalance', token)
          }
        }
      )
    } else {
      let path = route.path.split('/')
      let fact = false
      if (path[1] !== '' && path[1] !== 'sign' && path[1] !== '404' !== '_nuxt') {
        switch (path[1]) {
          case 'admin':
            fact = store.getters.userGroups.indexOf(1) !== -1
            break
          case 'panel':
            fact = store.getters.userGroups.indexOf(3) !== -1
            break
          case 'support':
            fact = store.getters.userGroups.indexOf(7) !== -1
            break
        }
        if (!fact) {
          redirect('/404')
        }
      }
    }
  } else {
    store.commit('SET_USER', token)
    store.commit('userProfile', {id: null, avatar: null, groups: []})
    redirect('/sign/in')
  }
}
