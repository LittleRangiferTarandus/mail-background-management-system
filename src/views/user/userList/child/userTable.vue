<template>
    <el-table :data="userListData" height="400" border  style="width: 100%" stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="mobile" label="电话" ></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="role_name" label="角色"></el-table-column>
    <el-table-column  label="状态">
        <template slot-scope="scope">
        <el-switch v-model="scope.row.mg_state" @change="switchClick(scope.row)" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        </template>
    </el-table-column>
    <el-table-column   label="操作">
        <template slot-scope="scope">
        <el-tooltip  effect="dark" content="编辑信息" placement="top" :enterable='false'>
            <el-button class="operate" type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)"></el-button>
        </el-tooltip>
        <el-tooltip   effect="dark" content="删除元素" placement="top" :enterable='false' >
            <el-button class="operate" type="danger" icon="el-icon-delete" size="mini" @click="deleteClick(scope.row)"></el-button>
        </el-tooltip>
        <el-tooltip   effect="dark" content="分配角色" placement="top" :enterable='false'>
            <el-button class="operate" type="warning" icon="el-icon-setting" size="mini" @click="allocateRole(scope.row)"></el-button>
        </el-tooltip>
        </template>
    </el-table-column>
    </el-table>
</template>

<script>
import {userStateChangeNet,userGetNet} from '@/network/userList.js'
export default {
  name:'UserTable',
  props:{
    userListData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    switchClick(data){
      userStateChangeNet(data).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error('Hennkou Shippai !')
          data.mg_state = !data.mg_state
        }else{
          this.$message.success('Hennkou Seikou !')
        }
      })
    },
    editClick(data){
      userGetNet(data).then(res =>{
        if (res.data.meta.status === 200) {
          this.$emit('editClickEmit',res.data.data)
        }
      })
    },
    deleteClick(data){
      this.$emit("deleteClickEmit",data)
    },
    allocateRole(data){
      this.$emit('allocateRoleEmit',data)
    }
  }
}
</script>

<style scoped>

</style>