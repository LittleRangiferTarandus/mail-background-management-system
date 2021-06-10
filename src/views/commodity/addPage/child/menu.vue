<template>
  <div class="menu">
      <el-alert title="添加商品"
        center
        show-icon
        :closable="false"
      ></el-alert>
      <el-steps align-center :active="activeName-0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs v-model="activeName" tab-position="left" 
        @tab-click="handleClick"
        :before-leave='leaveCheck'
      >
        <el-tab-pane label="基本信息" name="0"><slot name="0"></slot></el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品图片</el-tab-pane>
        <el-tab-pane label="完成" name="5">完成</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
  name:'Menu',
  data(){
    return{
      activeName:'0',
    }
  },
  methods:{
    handleClick(tab){
    },
    leaveCheck(newTab,oldTab){
      if(oldTab  === '0'){
        return this.$bus.addPageCheck()
      }
    }
  }
}
</script>

<style scoped>
.el-steps{
  margin-top: 20px;
}
</style>