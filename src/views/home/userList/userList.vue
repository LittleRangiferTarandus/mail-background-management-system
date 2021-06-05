<template>
  <div class="userList">
    <breadcrumb :list='["用户管理","用户列表"]' class="breadcrumb"></breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20"  slot="header" >
        <el-col :span="16">
          <el-input placeholder="请输入内容"  v-model="userListNetProp.query" clearable @clear='searchClearClick'>
            <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button  type="info" @click="$refs.dialogForm.dialogFormVisible = true">添加人员</el-button>
        </el-col>
      </el-row>
      <user-table :user-list-data='userListDataProp' @editClickEmit='editClickEmitAnserse'
      @deleteClickEmit='deleteClickEmitAnserse'></user-table>
      <el-pagination :total="userListTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="userListNetProp.pagenum" :page-size="userListNetProp.pagesize" :page-sizes='[1,2,5,10]'>
      </el-pagination>
    </el-card>
    <dialog-form ref="dialogForm" @dialogRenewEmit='getData()' :userNet="userAddNet" titleData="添加信息" 
    :optionList='{username:"",password:"",email:"",mobile:""}' 
    :metaText="201"></dialog-form>
    <dialog-form ref="dialogEditForm" @dialogRenewEmit='getData()' :userNet="userEditNet" titleData="修改信息" 
    :optionList='editForm'
    :metaText="200"></dialog-form>
    <delete ref="delete" :metaText="200" :userNet='userDeleteNet' :id='deleteId' @dialogRenewEmit='getData()'></delete>
  </div>
</template>

<script>
import Breadcrumb from '@/components/content/breadcrumb/breadcrumb.vue'
import {userListNet ,userAddNet,userEditNet,userDeleteNet } from '@/network/userList.js'
import UserTable from './child/userTable.vue'
import DialogForm from '@/components/content/dialogForm/dialogForm.vue'
import Delete from '@/components/content/deleteDialog/delete.vue'
export default {
  name:'UserList',
  components:{
    Breadcrumb,
    UserTable,
    DialogForm,
    Delete,
  },
  methods:{
    handleSizeChange(val){
      this.userListNetProp.pagesize = val
      this.getData()
    },
    handleCurrentChange(val){
      this.userListNetProp.pagenum = val
      this.getData()
    },
    getData(){
      userListNet(this.userListNetProp).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error('Data Getto Shippai !')
        }else{
          this.$message.success('Data Getto Seikou !')
          this.userListDataProp = res.data.data.users
          this.userListTotal = res.data.data.total
        }
      })
    },

    searchClick(){
      //console.log(this.userListNetProp);
      this.userListNetProp.pagenum = 1
      this.getData()
    },
    searchClearClick(){
      this.userListNetProp.pagenum = 1
      this.getData()
    },
    editClickEmitAnserse(data){
      this.editForm={
        id:data.id,
        mobile:data.mobile,
        email:data.email
      }
      this.$refs.dialogEditForm.dialogFormVisible = true
    },
    deleteClickEmitAnserse(data){
      this.$refs.delete.dialogFormVisible = true
      this.deleteId = data.id
    }
  },
  created(){
    this.getData()
  },
  data(){
    return{
      userListDataProp : [],
      userListTotal: 0,
      userListNetProp : {
        query:'',
        pagenum:1,
        pagesize:5
      },
      userEditNet:userEditNet,
      userDeleteNet:userDeleteNet,
      userAddNet:userAddNet,
      editForm:{
        id:'',
        mobile:'',
        email:''
      },
      //delete
      deleteId :-1
    }
  }
}
</script>

<style scoped>
  .item{
    height: 30px;
    line-height: 30px;
  }
  .breadcrumb{
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>