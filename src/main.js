
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import store from './store'
import {
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
  Dialog
} from 'element-ui'
import router from '@/router'
import 'element-ui/lib/theme-chalk/index.css';

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
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')