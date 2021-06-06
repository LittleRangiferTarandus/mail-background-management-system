<template>
    <el-table :data="tableData" height="450" border  style="width: 100%" stripe  class="roleTable">
      <el-table-column type="expand">
        <template slot-scope="scope" >
          <expand-col :rowData="scope.row" @removeRightEmit='removeRightEmitAnserse'></expand-col>
        </template>    
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-tooltip  effect="dark" content="编辑信息" placement="top" :enterable='false'>
              <el-button class="operate" type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)">编辑</el-button>
          </el-tooltip>
          <el-tooltip   effect="dark" content="删除" placement="top" :enterable='false' >
              <el-button class="operate" type="danger" icon="el-icon-delete" size="mini" @click="deleteClick(scope.row)">删除</el-button>
          </el-tooltip>
          <el-tooltip   effect="dark" content="分配权限" placement="top" :enterable='false'>
              <el-button class="operate" type="warning" icon="el-icon-setting" size="mini" @click="allocateClick(scope.row)">分配权限</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import {roleTableNet,roleGetNet} from '@/network/role.js'
import expandCol from './expandCol.vue'
import Delete from '@/components/content/deleteDialog/delete.vue'
export default {
  components: { expandCol, Delete },
  name:'RoleTable',
  data(){
    return{
      tableData:[],
      deleteId:{powerId:-1,roleId:-1}, 
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      roleTableNet().then(res=>{
        let status = res.data.meta.status
        let msg = res.data.meta.msg
        if (status !== 200){
          this.$message.error(msg);
        }else{
          this.tableData = res.data.data
          this.$message.success('获取信息完成');
        }
      })
    },
    editClick(data){
      roleGetNet(data.id).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$emit('editClickEmit',res.data.data)
        }
      })
    },
    deleteClick(data){
      this.$emit('deleteClickEmit',data.id)
    },
    removeRightEmitAnserse(data){
      this.$emit('removeRightEmit2',data)
    }, 
    allocateClick(data){
      this.$emit('allocateClickEmit',data)
    }
  }
}
</script>

<style scoped>

.el-table{
  margin-top: 20px;
}
</style>