<template>
  <div class="paramsTable">
    <el-table :data="tableData" height="300" stripe >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <slot :row='scope.row'></slot>
        </template>
      </el-table-column>
      <el-table-column type='index'></el-table-column>
      <el-table-column :label='columnLabel' prop='attr_name'></el-table-column>
      <el-table-column label='操作' >
        <template slot-scope="scope">
          <el-tooltip  effect="dark" content="编辑信息" placement="top" :enterable='false'>
              <el-button class="operate" type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)">编辑</el-button>
          </el-tooltip>
          <el-tooltip   effect="dark" content="删除" placement="top" :enterable='false' >
              <el-button class="operate" type="danger" icon="el-icon-delete" size="mini" @click="deleteClick(scope.row)">删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getParamList} from '@/network/params.js'
export default {
  name:'ParamsTable',
  methods:{
    getData(id = this.dataId,sel = this.dataSel){
      getParamList(id,sel).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          this.tableData=res.data.data;
        }
      })
    },
    deleteClick(data){
      this.$emit('delete',data)
    },
    editClick(data){
      this.$emit('edit',data)
    }
  },
  data(){
    return{
      tableData : []
    }
  },
  created(){
  },
  props:{
    dataId:{
      type:Number,
      default:-1
    },
    dataSel:{
      type:String,
      default(){return ''}
    },
    columnLabel:{
      type:String,
      default(){return ''}
    }
  }
}
</script>

<style>

</style>