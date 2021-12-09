// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// import 'mavon-editor/dist/markdown/github-markdown.min.css'
import {parse} from 'marked'

import util from './utils/util'

const baseUrl = 'http://localhost:1337'
export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(ElementUI)
  // Vue.use(mavonEditor)
  Vue.prototype.$util = util
  Vue.prototype.$markdown = function (value) {
    if(value.indexOf('(/uploads') > -1){
      value = value.replace(/\(\/uploads/g,'('+ baseUrl + '/uploads')
    }
    return parse(value)
  }
}
