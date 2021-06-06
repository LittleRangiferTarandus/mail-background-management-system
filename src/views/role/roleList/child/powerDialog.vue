<template>
  <el-dialog title="权限设置" :visible.sync="dialogFormVisible" class="powerDialog" >
    <el-tree
      ref="tree"
      :data='treeData'
      node-key='id'
      :props="{
        children: 'children',
        label: 'authName'
      }"
      :default-checked-keys='selectList'
      show-checkbox
    >
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="summarySelect">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {powerAllcateNet} from '@/network/role.js'
export default {
  name:'PowerDialog',
  data() {
    return {
      dialogFormVisible:false,
      selectList:[]
    };
  },
  methods: {
    summarySelect(){
      let data ={
        id:this.idData,
        right:[...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()].join(',')
      }
      powerAllcateNet(data).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.dialogFormVisible=false
          this.$emit('dialogRenewEmit')
          this.$message.success(res.data.meta.msg)
        }
      })
    },
    getSelectList(list){
      list.forEach(element => {
        this.selectList.push(element.id)
        element.children.forEach(element => {
          this.selectList.push(element.id)
          element.children.forEach(element => {
            this.selectList.push(element.id)
          })
        })
      })
    }
  },
  watch:{
    dialogFormVisible(a,b){
      if(a===true){
        this.getSelectList(this.selectData)
      }else{
        this.selectList = []
      }
    }
  },
  props:{
    treeData:{
      type:Array,
      default(){return[]}
    },
    selectData:{
      type:Array,
      default(){return[]}
    },
    idData:{
      type:Number,
      default:0
    }
  }
};
</script>

<style scoped>
.el-tree{
  height: 450px;
  overflow: auto;
}
</style>