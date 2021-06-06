<template>
  <div class="commodityCategory">
    <breadcrumb :list="['商品管理','商品分类']"></breadcrumb>
    <el-row :gutter="20" >
      <el-col :span="6" >
        <el-button type="primary" 
          
        >添加分类
        </el-button>
      </el-col>
    </el-row>
    <category-table ref="table" 
      @deleteClickEmit='deleteClickEmitAnserse'
      @editClickEmit='editClickEmitAnserse'
    ></category-table>
    <delete :id='deleteId'
      ref="delete"
      @dialogRenewEmit='$refs.table.getData(true)'
      :metaText='200'
      :userNet='deleteCategory'
    ></delete>
    <dialog-form ref="edit"
      :optionList="editData"
      :metaText="200"
      titleData="修改分类信息"
      :userNet='editCategory'
      @dialogRenewEmit='$refs.table.getData(true)'
    ></dialog-form>
  </div>
</template>

<script>
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import Delete from '@/components/content/deleteDialog/delete.vue'
import CategoryTable from './child/categoryTable.vue'
import {
  deleteCategory,
  getCategory,
  editCategory
} from '@/network/category.js'
import DialogForm from '../../../components/content/dialogForm/dialogForm.vue'
export default {
  components: { 
    breadcrumb, 
    CategoryTable ,
    Delete,
    DialogForm,
  },
  name:'CommodityCategory',
  created(){
  },
  data(){
    return{
      deleteId : -1,
      deleteCategory:deleteCategory,
      //edit
      editData:{},
      editCategory:editCategory,
    }
  },
  methods:{
    deleteClickEmitAnserse(data){
      this.deleteId = data.cat_id
      console.log(data );
      this.$refs.delete.dialogFormVisible = true
    },
    editClickEmitAnserse(data){
      getCategory(data.cat_id).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error( res.data.meta.msg)
        }else{
          this.editData = {
            cat_name:res.data.data.cat_name,
            cat_id:res.data.data.cat_id
          }
          this.$message.success(res.data.meta.msg)
          this.$refs.edit.dialogFormVisible = true
        }
      })
    }
  }
}
</script>

<style scoped>
</style>