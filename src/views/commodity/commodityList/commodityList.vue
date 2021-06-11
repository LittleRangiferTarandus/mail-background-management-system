<template>
  <div class="commodityList">
    <breadcrumb :list="['商品管理','商品列表']"></breadcrumb>
    <el-card>
      <search-and-add content="添加商品"
        @addClick='addClickAnserse'
        @searchClick='searchClickAnserse'
        @searchClearClick='searchClearClickAnserse'
      ></search-and-add>
      <commodity-table :tableData="listData"
        @deleteClick='deleteClickAnserse'
        @editClick='editClickR'
      ></commodity-table>
      <el-pagination :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="getListProp.pagenum" :page-size="getListProp.pagesize" :page-sizes='[1,2,5,10]'>
      </el-pagination>
    </el-card>
    <delete ref="delete"
      :id="deleteId"
      :metaText="200"
      :userNet="deleteCommodity"
      @dialogRenewEmit='getData()'
    ></delete>
  </div>
</template>

<script>
import {
  getCommodityList,
  deleteCommodity,
  searchCommodity,
} from '@/network/commodityList'
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import SearchAndAdd from '../../../components/content/searchAndAdd/searchAndAdd.vue'
import CommodityTable from './child/commodityTable.vue'
import Delete from '../../../components/content/deleteDialog/delete.vue'
export default {
  components: { breadcrumb, SearchAndAdd, CommodityTable, Delete,   },
  name:'CommodityList',
  data(){
    return{
      //get list
      getListProp:{
        query:'',
        pagenum:1,
        pagesize:10,
      },
      listData:[],
      total :0,
      //delete
      deleteCommodity:deleteCommodity,
      deleteId:-1,
    }
  },
  created(){
    this.getData()
  },
  methods:{
    editDataNotify(data){

    },
    async editClickR(data){
      let {data:res} = await searchCommodity(data.goods_id) 
      if(res.meta.status !== 200){
        this.$message.error(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
        let editData = this.editDataNotify(res.data)
        this.$router.push({
        name:'AddPage',
        query:editData
      })
      }
    },
    deleteClickAnserse(data){
      this.deleteId = data.goods_id
      this.$refs.delete.dialogFormVisible = true
    },
    handleCurrentChange(val){
      this.getListProp.pagenum = val
      this.getData()
    },
    handleSizeChange(val){
      this.getListProp.pagesize = val
      this.getData()
    },
    addClickAnserse(){
      this.$router.push({
        name:'AddPage',
        query:{}
      })
    },
    searchClickAnserse(query){
      this.getListProp.query = query
      this.getListProp.pagenum = 1
      this.getData()
    },
    searchClearClickAnserse(){
      this.getListProp.query = ''
      this.getListProp.pagenum = 1
      this.getData()
    },
    async getData(){
      let {data:data} = await  getCommodityList(this.getListProp)
      if(data.meta.status !== 200){
        this.$message.error(data.meta.msg)
      }else{
        this.$message.success(data.meta.msg)
        this.listData = data.data.goods
        this.total  = data.data.total
        
      }
    }
  },
}
</script>

<style scoped>

</style>