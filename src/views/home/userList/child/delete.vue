<template>
    <el-dialog title="删除信息" :visible.sync="dialogFormVisible"  >
      <span>真的要删除吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="yesClick">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {userDeleteNet} from '@/network/userList.js';
export default {
  name:'DeleteDialog',
  data(){
    return{
      dialogFormVisible:false
    }
  },
  props:{
    id:{
      type:Number,
      default:-1
    }
  },
  methods:{
    yesClick(){
      userDeleteNet(this.id).then(res =>{
        let status = res.data.meta.status
        if(status === 200){
          this.$message.success('Delete Seikou !')
          this.dialogFormVisible = false
          this.$emit('dialogRenewEmit')
        }else if (status === 400){
          this.$message.error('Admin cannot be deleted !')
        }else{
          this.$message.error('Delete Shipai !')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>