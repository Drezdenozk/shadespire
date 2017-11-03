import Vue from 'vue'
import TinyMCE from 'vue2-tinymce-adapter'
import tinymce from 'tinymce/tinymce.min.js'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/image'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/code'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/imagetools'

Vue.use(tinymce)
Vue.component('tiny-mce', TinyMCE)
