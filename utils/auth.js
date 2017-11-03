import Cookie from 'js-cookie'
// import axios from 'axios'

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  // axios.defaults.headers.common['X-Access-Token'] = token
  Cookie.set('token', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  Cookie.remove('token')
  // axios.defaults.headers.common['X-Access-Token'] = 'none'
  window.location.reload()
}

export const getUserFromCookie = (req) => {
  if (req.headers === undefined || req.headers.cookie === undefined) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!jwtCookie) return
  const token = jwtCookie.split('=')[1]
  // axios.defaults.headers.common['X-Access-Token'] = token
  return token
}

export const getUserFromLocalStorage = () => {
  const token = window.localStorage.token
  // axios.defaults.headers.common['X-Access-Token'] = token
  return ((token !== null) ? token : undefined)
}
