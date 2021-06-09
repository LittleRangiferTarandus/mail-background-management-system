<template>
  <div class="commodityCategory">
    <breadcrumb :list="['商品管理','商品分类']"></breadcrumb>
    <el-card>
      <el-row :gutter="20" slot="header">
        <el-col :span="6" >
          <el-button type="primary" 
            @click="addClick"
          >添加分类
          </el-button>
        </el-col>
      </el-row>
      <category-table ref="table" 
        @deleteClickEmit='deleteClickEmitAnserse'
        @editClickEmit='editClickEmitAnserse'
      >
      </category-table>
    </el-card>
    
    <delete :id='deleteId'
      ref="delete"
      @dialogRenewEmit='$refs.table.getData(true)'
      :metaText='200'
      :userNet='deleteCategory'
    ></delete>
    <dialog-form ref="edit"
      :formList="editData"
      :inputList="editInput"
      :metaText="200"
      titleData="修改分类信息"
      :userNet='editCategory'
      @dialogRenewEmit='$refs.table.getData(true)'
    ></dialog-form>
    <dialog-form ref="add"
      :formList="addList"
      :inputList="addInput"
      :metaText="201"
      titleData="添加分类信息"
      :userNet='addCategory'
      @dialogRenewEmit='
        $refs.table.getData(true);
        addList={
          cat_pid:0,
          cat_name:"",
          cat_level:0,
        }
      '
    >
      <el-form-item label="上级分类" >
        <el-cascader
          v-model="cascaderValue"
          :options="cascaderOptions"
          :props="{ 
            checkStrictly: true,
            expandTrigger: 'hover' ,
            label:'cat_name',
            value:'cat_id'
          }"
          @change="handleChange"
          placeholder="无上级分类" 
          style="width:100%"
          clearable
          ref="cascader"
        ></el-cascader>
      </el-form-item>
    </dialog-form>
  </div>
</template>

<script>
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import Delete from '@/components/content/deleteDialog/delete.vue'
import CategoryTable from './child/categoryTable.vue'
import {
  deleteCategory,
  getCategory,
  editCategory,
  getCategoryList,
  addCategory
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
      editInput:[
        {
          prop:'cat_name',lable:'分类名称',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
      ],
      //add
      addInput:[
        {
          prop:'cat_name',lable:'分类名称',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        }
      ],
      addList:{
        cat_pid:0,
        cat_name:'',
        cat_level:0,
      },
      addCategory: addCategory,
      //cascader
      cascaderValue:-1,
      cascaderOptions:[],
    }
  },
  methods:{
    handleChange(value) {
      let parent = this.$refs.cascader.getCheckedNodes(false)
      this.addList = {
        cat_pid:value[value.length-1],
        cat_name:this.$refs.add.form.cat_name,
        cat_level:parent.length === 0 ? 0 :parent[0].data.cat_level +1,
      }
    },
    addClick(){
      getCategoryList(undefined,undefined,2).then(res => {
        if(res.data.meta.status !==200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          this.$refs.add.dialogFormVisible = true
          this.cascaderOptions=res.data.data
        }
      })
    },
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