<template>
  <div class="home">
    <el-container class="outer" >
      <el-header>
        <p class="title">后台管理系统</p>
        <el-button type="info" class='exit' round  @click="exitClick">退出登录</el-button>
      </el-header>
      <el-container class="inner">
        <el-aside width='200px' ref="aside">
        <div class="toggle-button" @click="toggleClick">/**/</div>
          <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
          :collapse='isCollapse' :collapse-transition='false' :router="true" :default-active='$route.path.slice(-3)'>
            <el-submenu :index="index1+''" v-for="(item1,index1) in menuData" :key="index1">
              <template slot="title">
                <i :class="menuIconList[index1]"></i>
                <span>{{item1.authName}}</span>
              </template>
              <el-menu-item  v-for="(item2,index2)  in menuData[index1].children" :key="index1 + '-' + index2" :index="index1 + '-' + index2" >
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>{{item2.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {menuNet }from '@/network/menu.js'
export default {
  name:'Home',
  methods:{
    exitClick(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleClick(){
      this.isCollapse =! this.isCollapse
      this.$refs.aside.$el.style.width =this.isCollapse? '70px':'200px'
    }
  },
  created(){
    menuNet().then(res =>{
      if(res.data.meta.status !== 200){
        this.$message.error(res.data.meta.msg)
      }else{
        this.menuData = res.data.data
      }
    })
  },
  data(){
    return{
      menuData:[],
      menuIconList : ['el-icon-user','el-icon-remove-outline','el-icon-goods','el-icon-document','el-icon-cpu'],
      isCollapse :false,
    }
  }
}
</script>

<style scoped>
  .toggle-button{
    height: 30px;
    line-height: 30px;
    color: whitesmoke;
    border-bottom: white 1px solid;
  }
  .el-menu-item,.el-submenu{
    text-align: left;
  }
  .el-menu{
    overflow: visible;
    border: none;
  }
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title{
    font-size: 20px;
    font-family: 黑体;
  }
  .exit{
    font-size: 20px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    transition: 1s;
    background-color: #545c64;
    color: #333;
    width: 200px;
    text-align: center;
    line-height: 200px;
    overflow: hidden;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .outer,.home{
    height: 100%;
  }
  .inner{
    bottom: 0;
  }
</style>