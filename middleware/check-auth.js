import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, redirect, req, route, query }) {
  if (isServer && !req) return
  let token = ''

  if (store.getters.guestToken !== null) {
    token = store.getters.guestToken
  } else if (query.token !== undefined && query.token !== null && query.token !== '') {
    token = decodeURIComponent(query.token)
  } else {
    token = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  }
  if (token !== undefined && token !== null) {
    store.commit('SET_USER', token)
  } else {
    store.commit('SET_USER', null)
    return redirect('/sign/in')
  }
}
