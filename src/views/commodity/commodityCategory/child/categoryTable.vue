<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      height="500"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop='cat_name' label="分类名称" ></el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <i v-if="scope.row.cat_deleted === false" class="el-icon-circle-check "></i>
          <i v-else class="el-icon-circle-close"></i>
        </template>
      </el-table-column>
      <el-table-column prop='cat_level' label="分类层次" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" type="success">等级一</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" >等级二</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 2" type="info">等级三</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
    <el-pagination :total="total" 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="netData.pagenum" 
      :page-size="netData.pagesize" 
      :page-sizes='[1,2,5,10]'>
    </el-pagination>
  </div>
</template>

<script>
import{getCategoryList} from '@/network/category.js'
export default {
  name:'CategoryTable',
  data(){
    return{
      netData:{
        type:undefined,
        pagenum:1,
        pagesize:1
      },
      tableData:[],
      total:0,
    }
  },
  methods:{
    getData(pageTo1 = false){
      if(pageTo1){
        this.netData.pagenum = 1
      }
      getCategoryList(this.netData.pagenum,this.netData.pagesize,this.netData.type).then(res => {
        if(res.data.meta.status !==200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          this.tableData = res.data.data.result
          this.total=res.data.data.total
        }
      })
    },
    handleSizeChange(val){
      this.netData.pagesize = val
      this.getData()
    },
    handleCurrentChange(val){
      this.netData.pagenum = val
      this.getData()
    },
    deleteClick(data){
      this.$emit('deleteClickEmit',data)
    },
    editClick(data){
      this.$emit('editClickEmit',data)
    }
  },
  created(){
    this.getData()
  },
}
</script>

<style scope>
</style>