<template>
  <el-table
    :data="tableData"
    border
    height="400"
  >
    <el-table-column type="index"></el-table-column>
    <el-table-column prop='goods_name' label="商品名称" width="400"></el-table-column>
    <el-table-column prop='goods_price' label="商品价格"></el-table-column>
    <el-table-column prop='goods_weight' label="商品重量" ></el-table-column>
    <el-table-column   label="创建时间" >
      <template slot-scope="scope">
        {{scope.row.add_time|timeTransition}}
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
</template>

<script>
export default {
  name:'commpdityTable',
  data(){
    return{

    }
  },
  props:{
    tableData:{
      type:Array,
      default(){return[]}
    }
  },
  methods:{
    editClick(data){
      this.$emit('editClick',data)
    },
    deleteClick(data){
      this.$emit('deleteClick',data)
    }
  }
}
</script>

<style>

</style>