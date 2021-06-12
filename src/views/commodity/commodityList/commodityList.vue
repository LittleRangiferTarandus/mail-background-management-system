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
      v-if="listData"
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
      let only ={} ,many = {}
      data.attrs.forEach( item => {
        if(item.attr_sel === 'only'){
          if(only[item.attr_id] === undefined){
            only[item.attr_id] = [item.attr_value]
          }else{
            only[item.attr_id].push(item.attr_value)
          }
        }else if(item.attr_sel === 'many'){
          if(many[item.attr_id] === undefined){
            many[item.attr_id] = [item.attr_value]
          }else{
            many[item.attr_id].push(item.attr_value)
          }
        }
      } )
      let pics =[]
      data.pics.forEach( item =>{
        pics.push({
          name:item.pics_id,
          pic:item.pics_big_url,
          url:item.pics_big_url
        })
      })
      let form = {
        goods_name : data.goods_name,
        goods_weight : data.goods_weight,
        goods_number : data.goods_number,
        goods_price : data.goods_price 
      }
      //console.log(many);
      return {
        only,
        many,
        form,
        introduce: data.goods_introduce,
        pics,
        cat:data.cat_three_id,
        id:data.goods_id,
        goods_cat:data.goods_cat
      }
    },
    async editClickR(data){
      let {data:res} = await searchCommodity(data.goods_id) 
      if(res.meta.status !== 200){
        this.$message.error(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
        console.log(res.data);
        let editData = this.editDataNotify(res.data) 
      //console.log(editData);
        this.$router.push({
          name:'AddPage',
          params:editData
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
        params:{}
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