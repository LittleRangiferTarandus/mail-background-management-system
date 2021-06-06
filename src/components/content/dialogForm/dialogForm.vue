<template>
    <el-dialog :title="titleData" :visible.sync="dialogFormVisible" :before-close='noClick'>
      <el-form :model="form" :rules="rules" label-width="120px" ref="form">
        <el-form-item   prop="username"  label="用户名" v-if="optionListKey.includes('username')" >
            <el-input placeholder="用户名"   v-model="form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item> 
        <el-form-item  prop='password' label="密码" v-if="optionListKey.includes('password')" >
            <el-input placeholder="密码"   v-model="form.password" show-password prefix-icon="el-icon-lock" ></el-input>
        </el-form-item> 
        <el-form-item  prop='email' label="邮箱" v-if="optionListKey.includes('email')" >
            <el-input placeholder="邮箱"  v-model="form.email"  prefix-icon="el-icon-paperclip" ></el-input>
        </el-form-item> 
        <el-form-item  prop='mobile' label="手机号码" v-if="optionListKey.includes('mobile')" >
            <el-input placeholder="手机号码"   v-model="form.mobile" prefix-icon="el-icon-phone-outline" ></el-input>
        </el-form-item> 
        <el-form-item   prop="roleName"  label="角色名称" v-if="optionListKey.includes('roleName')" >
            <el-input placeholder="角色名称"   v-model="form.roleName" prefix-icon="el-icon-user"></el-input>
        </el-form-item> 
        <el-form-item   prop="roleDesc"  label="角色描述" v-if="optionListKey.includes('roleDesc')" >
            <el-input placeholder="角色描述"   v-model="form.roleDesc" prefix-icon="el-icon-user"></el-input>
        </el-form-item> 
        <el-form-item   prop="cat_name"  label="分类名称" v-if="optionListKey.includes('cat_name')" >
            <el-input placeholder="分类名称"   v-model="form.cat_name" prefix-icon="el-icon-user"></el-input>
        </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noClick">取 消</el-button>
        <el-button type="primary" @click="yesClick">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name:'DialogForm',
  created(){
    this.renew()
  },
  watch:{
    optionList(a,b){
      this.renew()
    }
  },
  data(){
    return{
      optionListKey:[],
      dialogFormVisible:false,
      form: {
      },
      rules:{
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^\w+@\w+.\w+$/, message: '请输入格式正确的邮箱' , trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' , trigger: 'blur' }
        ],
        cat_name:[
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    yesClick(){
      this.$refs.form.validate(flag => {
        if(flag){
          this.userNet(this.form).then(res => {
            let status = res.data.meta.status
            let msg = res.data.meta.msg
            if(status !== this.metaText){
              this.$message.error(msg)
            }else{
              this.dialogFormVisible = false
              this.$emit('dialogRenewEmit')
              this.$message.success(msg)
            }
          })
        }
      })
    },
    noClick(){
      this.$refs.form.resetFields()
      this.dialogFormVisible =false
    },
    renew(){
      let tmp = Object.keys(this.optionList)
      this.optionListKey=tmp
      let tmp2 = {}
      for(let i = 0; i<tmp.length; i++){
      tmp2[tmp[i]] = this.optionList[tmp[i]]
      }
      this.form = tmp2
    }
  },
  props:{
    userNet:{
      type:Function,
      default(){return function(){}}
    },
    titleData:{
      type:String,
      default(){return ''}
    },
    optionList:{
      type:Object,
      default(){return {}}
    },
    metaText:{
      type:Number,
      default:0
    },
  }
}
</script>