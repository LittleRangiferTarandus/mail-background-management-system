
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store'
import {
  Tree,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Button,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Message,
  TableColumn,
  Table,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step
} from 'element-ui'
import router from '@/router'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Step)
Vue.use(Steps)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Select),
Vue.use(Option)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.component(Message.name, Message)

Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)

import {timeTransition} from "@/common/timeTransition.js"

Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.filter('timeTransition',function(val){
  return timeTransition(val)
})

Vue.prototype.$bus={}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
