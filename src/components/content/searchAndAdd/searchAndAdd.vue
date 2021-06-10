<template>
  <el-row :gutter="20"  slot="header" >
    <el-col :span="16">
      <el-input placeholder="请输入内容"  v-model="query" clearable @clear='searchClearClick'>
        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button  type="info" @click="addClick">{{content}}</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:'searchAndAdd',
  data(){
    return{
      query:''
    }
  },
  methods:{
    searchClearClick(){
      this.$emit('searchClearClick')
    },
    searchClick(){
      this.$emit('searchClick',this.query)
    },
    addClick(){
      this.$emit('addClick')
    }
  },
  props:{
    content:{
      type:String,
      default(){return'添加人员'}
    }
  }
}
</script >

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
</style>