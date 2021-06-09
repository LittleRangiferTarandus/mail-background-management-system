<template>
  <div class="params">
    <breadcrumb :list="['商品管理','分类参数']"></breadcrumb>
    <el-card>
      <el-alert title="只能设置末级选项的参数"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <el-row class='headCard' :gutter="20">
        <el-col :span="8">
          <label>请选择分类</label>
          <el-cascader
            v-model="cascaderValue"
            :options="cascaderOptions"
            :props="{ 
              expandTrigger: 'hover' ,
              label:'cat_name',
              value:'cat_id'
            }"
            @change="handleChange"
            placeholder="请选择分类" 
            ref="cascader"
          ></el-cascader>
        </el-col>
      </el-row>
      <params-table-head ref="paramsTableHead"
        :categoryId='catId'
        @addAttr='addAttrAnserse'
        @tabsSwitch='tabsSwitchAnserse'
      >
        <template   slot="first">
          <params-table ref="paramsTable" 
            :column-label='"参数名称"'
            :dataId='catId'
            :dataSel='tabsSel'
            @edit='editAnserse'
            @delete='deleteAnserse'
          >
            <el-row :gutter="24" slot-scope="scope">
              <div v-for="(item,index) in scope.row.attr_vals.split(',')" :key="index" class="tagDiv">
                <el-tag class="attrTag" 
                  closable
                  v-if="item!==''"
                  @close='tagClose(index,scope.row)'
                >{{item}}</el-tag>
              </div>
              <el-input
                class="attrTagInput"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="attrTag" size="small" @click="showInput">+ New Tag</el-button>
            </el-row>
          </params-table>
        </template>
        <template  slot="second">
          <params-table ref="paramsTableStatic" 
            :column-label='"属性名称"'
            @delete='deleteAnserse'
            @edit='editAnserse'
            :dataId='catId'
            :dataSel='tabsSel'
          >
            <el-row :gutter="24" slot-scope="scope">
              <div v-for="(item,index) in scope.row.attr_vals.split(',')" :key="index" class="tagDiv">
                <el-tag class="attrTag" 
                  closable
                  v-if="item!==''"
                  @close='tagClose(index,scope.row)'
                >{{item}}</el-tag>
              </div>
            </el-row>
          </params-table>
        </template>
      </params-table-head>
    </el-card>
    <dialog-form :formList="{
        id:catId,
        attr_name:'',
        attr_sel:tabsSel,
        attr_vals:''
      }"
      :inputList="addInput"
      :metaText="201"
      :titleData="tabsSel==='many'?'添加动态参数':'添加静态属性'"
      :userNet="addAttr"
      @dialogRenewEmit="tabsSel==='many'?$refs.paramsTable.getData():$refs.paramsTableStatic.getData()"
      ref="addAttr"
    ></dialog-form>
    <delete ref="delete" 
      :metaText='200'
      :id="deleteId"
      :userNet='deleteAttr'
      @dialogRenewEmit="tabsSel==='many'?$refs.paramsTable.getData():$refs.paramsTableStatic.getData()"
    ></delete>
    <dialog-form :formList="editForm"
      :inputList="addInput"
      :metaText="200"
      :titleData="tabsSel==='many'?'修改动态参数':'修改静态属性'"
      :userNet="editAttr"
      @dialogRenewEmit="tabsSel==='many'?$refs.paramsTable.getData():$refs.paramsTableStatic.getData()"
      ref="editAttr"
    ></dialog-form>
    <delete ref="deleteAttrVal" 
      :metaText='200'
      :id="deleteAttrVal"
      :userNet='editAttr'
      @dialogRenewEmit="tabsSel==='many'?$refs.paramsTable.getData():$refs.paramsTableStatic.getData()"
    ></delete>
  </div>
</template>

<script>
import {
  addAttr,
  deleteAttr,
  getAttr,
  editAttr,
} from '@/network/params.js'
import {
  getCategoryList,
} from '@/network/category.js'
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import ParamsTableHead from './child/paramsTableHead.vue'
import ParamsTable from './child/paramsTable.vue'
import DialogForm from '../../../components/content/dialogForm/dialogForm.vue'
import Delete from '../../../components/content/deleteDialog/delete.vue'
export default {
  components: { breadcrumb, ParamsTableHead, ParamsTable, DialogForm,Delete },
  name:'Params',
  data(){
    return{
      cascaderValue:[],
      cascaderOptions:[],
      //tabs
      tabsSel : 'many',
      //add
      addAttr:addAttr,
      addInput:[
        {
          prop:'attr_name',lable:'参数名称',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入参数名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'attr_vals',lable:'参数值',icon:'el-icon-files',
          desc:'多个参数值之间用英文半角逗号,隔开',
          rule:[ 
            { required: true, message: '请输入参数值', trigger: 'blur' },
            { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
          ]
        }
      ],
      //delete
      deleteAttr:deleteAttr,
      deleteId:{},
      //edit
      editForm:{},
      editAttr:editAttr,
      //delete attr val
      deleteAttrVal:{},
      //input tab
      inputVisible: false,
      inputValue: ''
    }
  },
  created(){
    getCategoryList().then(res => {
      if(res.data.meta.status !==200){
        this.$message.error(res.data.meta.msg)
      }else{
        this.$message.success(res.data.meta.msg)
        this.cascaderOptions=res.data.data
      }
    })
  },
  methods:{
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    handleInputConfirm(data) {
      let inputValue = this.inputValue;
      if (inputValue) {
        getAttr({id:this.catId,attrid:data.attr_id}).then(res => {
          if(res.data.meta.status !== 200){
            this.$message.error(res.data.meta.msg)
          }else{
            this.$message.success(res.data.meta.msg)
            let newVal = res.data.data.attr_vals+','+(inputValue+'') 
            data.attr_vals = newVal
            let addAttrVal = {
              attr_vals : newVal,
              id:this.catId,
              attrid:data.attr_id,
              attr_sel:res.data.data.attr_sel,
              attr_name:res.data.data.attr_name
            }
            editAttr(addAttrVal).then(res => {
              if(res.data.meta.status !== 200){
                this.$message.error(res.data.meta.msg)
              }else{
                this.$message.success(res.data.meta.msg)
              }
            })
          }
        })
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleChange(val){
      if(this.cascaderValue.length !== 0){
        if(this.tabsSel === 'many' ){
          this.$refs.paramsTable.getData(this.catId,'many')
        }else{
          this.$refs.paramsTableStatic.getData(this.catId,'only')
        }
      }
    },
    addAttrAnserse(){
      this.$refs.addAttr.dialogFormVisible = true
    },
    tabsSwitchAnserse(sel){
      this.tabsSel = sel
      if(this.cascaderValue.length !== 0){
        if(this.tabsSel === 'many' ){
          this.$refs.paramsTable.getData(this.catId,'many')
        }else{
          this.$refs.paramsTableStatic.getData(this.catId,'only')
        }
      }
    },
    deleteAnserse(data){
      this.deleteId = {
        attrid : data.attr_id,
        id : this.catId
      }
      this.$refs.delete.dialogFormVisible = true
    },
    editAnserse(data){
      getAttr({id:this.catId,attrid:data.attr_id}).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          this.editForm = {
            id:this.catId,
            attrid:data.attr_id,
            attr_name:res.data.data.attr_name,
            attr_sel:res.data.data.attr_sel,
            attr_vals:res.data.data.attr_vals
          }
          this.$refs.editAttr.dialogFormVisible = true
        }
      })
    },
    tagClose(index,data){
      getAttr({id:this.catId,attrid:data.attr_id}).then(res => {
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          let tmp = data.attr_vals.split(',')
          let deleteAttr = tmp[index]
          let vals = res.data.data.attr_vals.split(',')
          let currentIndex = vals.indexOf(deleteAttr)
          vals.splice(currentIndex,1)
          this.deleteAttrVal = {
            attr_vals : vals.join(','),
            id:this.catId,
            attrid:data.attr_id,
            attr_sel:res.data.data.attr_sel,
            attr_name:res.data.data.attr_name
          }
          this.$refs.deleteAttrVal.dialogFormVisible = true
        }
      })
    }
  },
  computed:{
    catId(){
      return this.cascaderValue[this.cascaderValue.length-1]
    }
  }
}
</script>

<style scoped>
.headCard{
  margin-top: 10px;
}
.headCard label{
  margin-right: 10px;
}
.headCard .el-cascader{
  width: 300px;
}
.attrTag{
  margin: 5px 10px;
  display: inline-block;
}
.tagDiv{
  display: inline-block;
}
.attrTagInput{
  margin: 5px 10px;
  display: inline-block;
  width: 200px;
}
</style>