
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store'
import router from '@/router'


import {timeTransition} from "@/common/timeTransition.js"
Vue.config.productionTip = false



Vue.use(VueRouter)

Vue.filter('timeTransition',function(val){
  return timeTransition(val)
})

import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.prototype.$bus={}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
