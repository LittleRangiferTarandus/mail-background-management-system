<template>
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible"  >
      <el-row :gutter="24">
        <el-col :span="6" align><el-tag type='info' >{{'用户名为：'+data.username}}</el-tag></el-col>
        <el-col :span="6" :offset="6"><el-tag type='info'>{{'角色为：'+data.role_name}}</el-tag></el-col>
      </el-row>
      <el-row :gutter="24" class="second">
        <el-col :span="12">
          <el-tag type='primary' class="selectTag">分配角色</el-tag>
          <el-select v-model="value" placeholder="请选择角色"
            @change='changeSelect'
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="yesClick">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import{roleTableNet} from '@/network/role.js'
import{userAllocateRoleNet} from '@/network/userList.js'
export default {
  name:'AllocateRoleDialog',
  data(){
    return{
      dialogFormVisible:false,
      options:[],
      value:'',
      selectValue:-1,
    }
  },
  created(){
    roleTableNet().then(res => {
      if(res.data.meta.status !== 200){
        this.$message.error(res.data.meta.msg)
      }else{
        this.$message.success(res.data.meta.msg)
        this.options = res.data.data
      }
    })
  },
  props:{
    data:{
      type:Object,
      default(){return{}}
    },
  },
  methods:{
    yesClick(){
      if(this.selectValue === -1) {
        this.$message.error('没有选择角色')
        return
      }
      userAllocateRoleNet(this.data.id,this.selectValue).then(res => {
        let status = res.data.meta.status
        let msg = res.data.meta.msg
        if(status !== 200){
          this.$message.error(msg)
        }else{
          this.dialogFormVisible = false
          this.$emit('dialogRenewEmit')
          this.$message.success(msg)
        }
      })
    },
    changeSelect(value){
      this.selectValue = value
    },
  }
}
</script>

<style scoped>
  .selectTag{
    margin-right: 20px;
  }
  .second{
    margin-top: 20px;
  }
</style>