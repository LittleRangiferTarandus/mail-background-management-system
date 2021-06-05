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
export default {
  name:'DeleteDialog',
  data(){
    return{
      dialogFormVisible:false
    }
  },
  props:{
    id:{
      default:-1
    },
    userNet:{
      type:Function,
      default(){return function(){}}
    },
    metaText:{
      type:Number,
      default: -1
    },
  },
  methods:{
    yesClick(){
      this.userNet(this.id).then(res => {
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
  },
}
</script>

<style scoped>

</style>