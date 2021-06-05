import Vue from 'vue'   //引入Vue
import Router from 'vue-router'
const homeChildren = [
  {
    path:'0-0',
    name:'UserList',
    component: () => import('@/views/home/userList/userList.vue')
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
    component: () => import('@/views/home/powerList/powerList.vue')
  },
  {
    path:'1-0',
    name:'RoleList',
    component: () => import('@/views/home/roleList/roleList.vue')
  },
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