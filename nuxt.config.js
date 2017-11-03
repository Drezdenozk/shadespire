module.exports = {
  plugins: [{src: '~plugins/vue-tiny.js', ssr: false},{src: '~plugins/vue-validate.js', ssr: true},{src: '~plugins/vue-tooltip.js', ssr: false},{src: '~plugins/vue-sweetmodal.js', ssr: false}, {src: '~plugins/vue-notifications.js', ssr: false}, '~plugins/vue-moment.js'],
  build: {
    extractCSS: true,
    vendor: ['js-sha256', '~/utils/api.js', '~/utils/auth.js', '~/plugins/vue-tooltip.js', '~/plugins/vue-notifications.js', '~/plugins/vue-sweetmodal.js', 'js-cookie', 'axios', 'vee-validate', 'vue-notifications', 'sweetalert2', 'mini-toastr'],
    extend (config) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      })
    }
  },
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    bodyAttrs: {
      class: 'menu-fixed single-page single-page-inverse'
    },
    title: 'Admin Theme',
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Admin theme' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~assets/theme/assets/vendors/bootstrap/dist/css/bootstrap.min.css',
    '~assets/theme/assets/vendors/ladda/dist/ladda-themeless.min.css',
    '~assets/theme/assets/vendors/datatables/media/css/dataTables.bootstrap4.min.css',
    '~assets/theme/assets/common/css/source/main.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    'sweetalert2/dist/sweetalert2.min.css',
    '~assets/custom.css'
  ],
  js: [],
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3B8070',
    height: '5px'
  },
  router: {
    linkActiveClass: 'left-menu-link-active'
  },
  /*
  ** Build configuration
  */
  env: {
    secretKey: 'Z86grVpKmtnSn3pT2Q4SsZ',
    baseUrl: process.env.BASE_URL || 'http://localhost:3333',
    ip: '127.0.0.1',
    currentUrl: 'dev',
    urls: {
      prod: {
        site: 'https://backmy.cash/',
        rawData: true,
        local: 'http://192.168.92.101:8089',
        ajax: 'https://cashback.wmr.ru:8085'
      },
      dev: {
        site: 'https://backmy.cash/',
        rawData: true,
        local: 'http://127.0.0.1:8089',
        ajax: 'http://dev.cashback.wmr.ru:8091'
      },
      vlad: {
        site: 'http://site/',
        rawData: false,
        local: 'http://cashback/api',
        ajax: 'http://cashback/api'
      },
      anton: {
        site: 'http://192.168.1.145/',
        rawData: false,
        local: 'http://192.168.1.145:8989/api',
        ajax: 'http://192.168.1.145:8989/api'
      }
    }
  }
}
