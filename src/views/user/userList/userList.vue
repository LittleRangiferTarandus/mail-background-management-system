<template>
  <div class="userList">
    <breadcrumb :list='["用户管理","用户列表"]' class="breadcrumb"></breadcrumb>
    <el-card class="box-card">
      <search-and-add
        @addClick='addClickAnserse'
        @searchClick='searchClickAnserse'
        @searchClearClick='searchClearClickAnserse'
      ></search-and-add>
      <user-table :user-list-data='userListDataProp' 
        @editClickEmit='editClickEmitAnserse'
        @deleteClickEmit='deleteClickEmitAnserse'
        @allocateRoleEmit='allocateRoleEmitAnserse'
      ></user-table>
      <el-pagination :total="userListTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="userListNetProp.pagenum" :page-size="userListNetProp.pagesize" :page-sizes='[1,2,5,10]'>
      </el-pagination>
    </el-card>
    <dialog-form ref="dialogForm" 
      @dialogRenewEmit='getData()' 
      :userNet="userAddNet" 
      titleData="添加信息" 
      :formList='{username:"",password:"",email:"",mobile:""}'
      :inputList='addInput' 
      :metaText="201"
    ></dialog-form>
    <dialog-form ref="dialogEditForm" 
      @dialogRenewEmit='getData()' 
      :userNet="userEditNet" 
      titleData="修改信息" 
      :formList='editForm'
      :inputList='editInput'
      :metaText="200"
    ></dialog-form>
    <delete ref="delete" 
      :metaText="200" 
      :userNet='userDeleteNet' 
      :id='deleteId' 
      @dialogRenewEmit='getData()'
    ></delete>
    <allocate-role-dialog ref="allocateRole" 
      :data="allocateData"
      @dialogRenewEmit='getData()'
    ></allocate-role-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/content/breadcrumb/breadcrumb.vue'
import {userListNet ,userAddNet,userEditNet,userDeleteNet  } from '@/network/userList.js'
import UserTable from './child/userTable.vue'
import DialogForm from '@/components/content/dialogForm/dialogForm.vue'
import Delete from '@/components/content/deleteDialog/delete.vue'
import AllocateRoleDialog from './child/allocateRoleDialog.vue'
import SearchAndAdd from '../../../components/content/searchAndAdd/searchAndAdd.vue'
export default {
  name:'UserList',
  components:{
    Breadcrumb,
    UserTable,
    DialogForm,
    Delete,
    AllocateRoleDialog,
    SearchAndAdd,
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
    addClickAnserse(){
      this.$refs.dialogForm.dialogFormVisible = true
    },
    searchClickAnserse(query){
      //console.log(this.userListNetProp);
      this.userListNetProp.query = query
      this.userListNetProp.pagenum = 1
      this.getData()
    },
    searchClearClickAnserse(){
      this.userListNetProp.query = ''
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
    },
    allocateRoleEmitAnserse(data){
      this.$refs.allocateRole.dialogFormVisible = true
      this.allocateData = data
    },
  },
  created(){
    this.getData()
  },
  data(){
    return{
      //add
      addInput:[
        {
          prop:'username',lable:'用户名',icon:'el-icon-user',
          rule:[ 
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'password',lable:'密码',icon:'el-icon-lock',
          rule:[ 
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'email',lable:'邮箱',icon:'el-icon-paperclip',
          rule:[ 
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^\w+@\w+.\w+$/, message: '请输入格式正确的邮箱' , trigger: 'blur' }
          ]
        },
        {
          prop:'mobile',lable:'手机号码',icon:'el-icon-lock',
          rule:[ 
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' , trigger: 'blur' }
          ]
        },
      ],
      //add-end
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
      //edit
      editForm:{
        id:'',
        mobile:'',
        email:''
      },
      editInput:[
        {
          prop:'email',lable:'邮箱',icon:'el-icon-paperclip',
          rule:[ 
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^\w+@\w+.\w+$/, message: '请输入格式正确的邮箱' , trigger: 'blur' }
          ]
        },
        {
          prop:'mobile',lable:'手机号码',icon:'el-icon-lock',
          rule:[ 
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' , trigger: 'blur' }
          ]
        },
      ],
      //delete
      deleteId :-1,
      //allcate
      allocateData:{}
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