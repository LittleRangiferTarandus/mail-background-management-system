<template>
  <el-table :data="tableData" height="500" border  style="width: 100%" stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="authName" label="权限名称"></el-table-column>
    <el-table-column prop="path" label="权限路径"></el-table-column>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.level === '0'" type="info">等级一</el-tag>
        <el-tag v-else-if="scope.row.level === '1'" type="success">等级二</el-tag>
        <el-tag v-else-if="scope.row.level === '2'"  >等级三</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {powerTableNet} from '@/network/power.js'
export default {
  name:'PowerTable',
  created(){
    this.getData()
  },
  data(){
    return{
      tableData:[]
    }
  },
  methods:{
    getData(){
      powerTableNet().then(res=>{
        console.log(res.data.data);
        let status = res.data.meta.status
        let msg = res.data.meta.msg
        if(status !== 200){
          this.$message.error(msg)
        }else{
          this.$message.success('权限列表数据获取完成')
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>