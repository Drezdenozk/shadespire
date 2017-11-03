import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, redirect, req, query }) {
  let token
  if (store.getters.guestToken !== null) {
    token = store.getters.guestToken
  } else if (query.token !== undefined && query.token !== null && query.token !== '') {
    token = decodeURIComponent(query.token)
  } else {
    token = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  }

  let checkPath = function (groups) {
    if (groups.indexOf(1) !== -1) {
      if (store.getters.guestToken !== null) {
        return redirect('/admin?token=' + encodeURIComponent(store.getters.guestToken))
      } else {
        return redirect('/admin')
      }
    }
    if (groups.indexOf(3) !== -1) {
      if (store.getters.guestToken !== null) {
        return redirect('/panel?token=' + encodeURIComponent(store.getters.guestToken))
      } else {
        return redirect('/panel')
      }
    }
    if (groups.indexOf(7) !== -1) {
      if (store.getters.guestToken !== null) {
        return redirect('/support?token=' + encodeURIComponent(store.getters.guestToken))
      } else {
        return redirect('/support')
      }
    }
  }

  if (token !== undefined && token !== null) {
    store.commit('SET_USER', token)
    if (store.getters.userId === null) {
      store.dispatch('updateProfile', token).then(
        function (userGroups) {
          if (userGroups.indexOf(1) !== -1) {
            store.dispatch('updateAdminTicketsCounter', token)
            store.dispatch('updateAdminOrdersCounter', token)
            store.dispatch('updateAdminBalance', token)
          } else if (userGroups.indexOf(3) !== -1) {
            store.dispatch('updateResellerBalance', token)
          }
          checkPath(userGroups)
        }
      )
    } else {
      checkPath(store.getters.userGroups)
    }
  } else {
    store.commit('SET_USER', token)
    store.commit('userProfile', {id: null, avatar: null, groups: []})
    return redirect('/sign/in')
  }
}
