import axios from 'axios'
// import Vuex from 'vuex'

import { getUserFromLocalStorage, getUserFromCookie } from '~/utils/auth'
export const sendImageToCash = function (url, image, extension, avatar) {
  return new Promise(function (resolve, reject) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    let fd = new FormData()
    fd.append('image', image)
    fd.append('extension', extension)

    axios.post(url, fd).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      console.warn(error)
    })
  })
}
export const getFromApi = function (req, module, action, data, token) {
  return new Promise(function (resolve, reject) {
    // if (axios.defaults.headers.common['X-Access-Token'] === undefined) {
    //  const token = window ? getUserFromCookie(req) : getUserFromLocalStorage()
    //  axios.defaults.headers.common['X-Access-Token'] = token
    // }

    var message = {module: module, action: action, data: data}
    if (token === undefined || token === null) {
      // if (this.$store.getters.guestToken !== null) {
      // token = this.$store.getters.guestToken
      // } else {
      token = !process.browser ? getUserFromCookie(req) : getUserFromLocalStorage()
      // }
    }

    /*
    if (token === undefined && token !== null) {
      token = !process.browser ? getUserFromCookie(req) : getUserFromLocalStorage()
    } */
    message.data.token = token

    let url
    let toServer

    if (process.browser) {
      url = process.env.urls[process.env.currentUrl].ajax
    } else {
      url = process.env.urls[process.env.currentUrl].local
    }

    if (process.env.urls[process.env.currentUrl].rawData === true) {
      message.ip = process.env.ip
      message.host = process.env.secretKey
      toServer = encodeURIComponent(JSON.stringify(message))
      toServer = ('data=' + toServer)
    } else {
      toServer = JSON.stringify(message)
    }

    if (process.env.urls[process.env.currentUrl].rawData === true) {
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json'
    }

    axios.post(url, toServer).then(function (res) {
      // if (res.data.status === 'undefined' || res.data.status !== 'success') {
      // throw new Error(JSON.stringify(res.data.message))
      // } else {
      resolve(res)
      // }
    }).catch(function (error) {
      reject(error)
    })
  })
}
