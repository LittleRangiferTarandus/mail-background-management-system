import Vue from 'vue'   //引入Vue
import Router from 'vue-router'
const homeChildren = [
  {
    path:'0-0',
    name:'UserList',
    component: () => import('@/views/user/userList/userList.vue')
  },
  {
    path:'',
    redirect:'welcome'
  },
  {
    path:'welcome',
    name:'Welcome',
    component: () => import('@/views/home/welcome/welcome.vue')
  },
  {
    path:'1-1',
    name:'PowerList',
    component: () => import('@/views/role/powerList/powerList.vue')
  },
  {
    path:'1-0',
    name:'RoleList',
    component: () => import('@/views/role/roleList/roleList.vue')
  },
  {
    path:'2-0',
    name:'CommodityList',
    component: () => import('@/views/commodity/commodityList/commodityList.vue')
  },
  {
    path:'2-2',
    name:'CommodityCategory',
    component: () => import('@/views/commodity/commodityCategory/commodityCategory.vue')
  },
  {
    path:'2-1',
    name:'CommodityParams',
    component: () => import('@/views/commodity/params/params.vue')
  }
]

const routes = [
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/login/login.vue')
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/home',
    component: () => import('@/views/home/home.vue'),
    children : homeChildren,
  }
]

const myRouter = new Router({
  routes,
  mode:'history', 
})

myRouter.beforeEach((to,from,next) => {
  //console.log([window.sessionStorage.getItem('token')]);
  if(to.path === '/login'){
    return next()
  }else if('null'===(window.sessionStorage.getItem('token'))||null===(window.sessionStorage.getItem('token'))){
    return next('/login')
  }else{
    next( )
  }
})

export default myRouter