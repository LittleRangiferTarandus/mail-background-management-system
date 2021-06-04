<template>
  <div class="login">
    <div class="box">
      <div class="avatar"></div>
      <el-form class="form" ref="form" :model="form"  :rules="rules" >
        <el-form-item   prop="name" >
          <el-input placeholder="用户名" ref="name" v-model="form.name" prefix-icon="el-icon-user"></el-input>
        </el-form-item> 
        <el-form-item  prop='password'>
          <el-input placeholder="密码" ref='password' v-model="form.password" show-password prefix-icon="el-icon-lock" ></el-input>
        </el-form-item> 
        <el-button type="info" round class="buttonReassignment"  @click="reassignmentClick">重置</el-button>
        <el-button type="primary" round class="buttonLogin" @click="loginClick">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import{loginNet}from '@/network/login.js'
export default {
  name:'Login',
  data(){
    return{
      form:{
        name:'',
        password:''
      },
      rules:{
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    reassignmentClick(){
      this.$refs.form.resetFields()
    },
    loginClick(){
      this.$refs.form.validate(flag => {
        if(flag){
          loginNet(this.form.name,this.form.password).then(res=>{
            if(res.data.meta.status !== 200){
              this.$message.error('Login Shippai !')
            }else{
              this.$message.success('Login Seikou !')
              //保存token
              //console.log(res.data.data.token);
              window.sessionStorage.setItem('token',res.data.data.token)
              
              //路由
              this.$router.push('/home')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  
  .buttonReassignment,.buttonLogin{
    float: right;
    margin: 10px;
  }
  .form{
    padding: 10px;
    position: relative;
    top: 30%;
  }
  .avatar{
    background-image: url('../../assets/img/login/avatar.svg');
    background-size: 200px 200px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    position: absolute;
  }
  .login{
    background-color:#2b4b6b;
    width: 100%;
    height: 100%;
  }
  .box{
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>