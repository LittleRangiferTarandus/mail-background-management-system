<template>
  <el-table
    :data="tableData"
    border
    height="400"
  >
    <el-table-column type="index"></el-table-column>
    <el-table-column prop='order_number' label="订单编号"  width='200' ></el-table-column>
    <el-table-column prop='order_price' label="订单价格"></el-table-column>
    <el-table-column label="是否付款" >
      <template slot-scope="scope">
        <el-tag type="danger" v-if="scope.row.pay_status==='0'">否</el-tag>
        <el-tag type="success" v-else>是</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop='is_send' label="是否发货"></el-table-column>
    <el-table-column   label="下单时间" >
      <template slot-scope="scope">
        {{scope.row.create_time|timeTransition}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width='300'>
      <template slot-scope="scope">
        <el-tooltip  effect="dark" content="编辑信息" placement="top" :enterable='false'>
            <el-button class="operate" type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)">编辑</el-button>
        </el-tooltip>
        <el-tooltip   effect="dark" content="修改地址" placement="top" :enterable='false' >
            <el-button class="operate" type="success" icon="el-icon-edit-outline" size="mini" @click="addrClick(scope.row)">地址</el-button>
        </el-tooltip>
        <el-tooltip   effect="dark" content="物流信息" placement="top" :enterable='false' >
            <el-button class="operate" type="primary" icon="el-icon-office-building" size="mini" @click="postClick(scope.row)">物流</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name:'orderTable',
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
    addrClick(data){
      this.$emit('addrClick',data)
    },
    postClick(data){
      this.$emit('postClick',data)
    }
  }
}
</script>

<style>

</style>