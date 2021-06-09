<template>
  <div class="roleList">
    <breadcrumb :list='["权限管理","角色列表"]' class="breadcrumb"></breadcrumb>
    <el-card>
      <el-row :gutter="20" ><el-col :span="6" ><el-button type="primary" 
      @click="$refs.addForm.dialogFormVisible = true">添加角色</el-button></el-col></el-row>
      <role-table ref="roleTable" 
        @editClickEmit='editClickEmitAnserse'
        @deleteClickEmit="deleteClickEmitAnserse"
        @removeRightEmit2="removeRightEmit2Anserse"
        @allocateClickEmit='allocateClickEmitAnserse'
      ></role-table>
    </el-card>
    <dialog-form ref='editForm' 
      titleData='修改角色' 
      :formList='editData' 
      :metaText="200" 
      :userNet='roleEditNet'
      :inputList='editInput'
      @dialogRenewEmit='$refs.roleTable.getData()'
    ></dialog-form>
    <dialog-form ref='addForm' titleData='添加角色' 
      :formList='{roleName:"",roleDesc:""}' 
      :inputList='addInput'
      :metaText="201" 
      :userNet='roleAddNet' 
      @dialogRenewEmit='$refs.roleTable.getData()'
    ></dialog-form>
    <delete ref='deleteDialog' :userNet='roleDeleteNet'  :id="deleteIdRole" 
      @dialogRenewEmit='$refs.roleTable.getData()'
      :metaText='200'
    ></delete>
    <delete ref='deleteDialogRemoveRight' :userNet='roleDeletePowerNet'  :id="deleteIdPower" 
      @dialogRenewEmit='$refs.roleTable.getData()'
      :metaText='200'
    ></delete>
    <power-dialog ref="powerDialog" 
      @dialogRenewEmit='$refs.roleTable.getData()'
      :treeData='powerTree'  
      :selectData='powerSelect'
      :idData='powerId'
    ></power-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/content/breadcrumb/breadcrumb.vue'
import RoleTable from './child/roleTable'
import DialogForm from '@/components/content/dialogForm/dialogForm.vue'
import{
  roleEditNet,
  roleAddNet,
  roleDeleteNet,
  roleDeletePowerNet,
  powerTableTreeNet
} from '@/network/role'
import Delete from '@/components/content/deleteDialog/delete.vue'
import PowerDialog from './child/powerDialog.vue'
export default {
  name:'RoleList',
  components:{
    RoleTable,
    Breadcrumb,
    DialogForm,
    Delete,
    PowerDialog,
  },
  methods:{
    editClickEmitAnserse(data){
      this.editData = data
      this.$refs.editForm.dialogFormVisible= true
    },
    deleteClickEmitAnserse(id){
      this.deleteIdRole = id
      this.$refs.deleteDialog.dialogFormVisible = true
    },
    removeRightEmit2Anserse(data){
      this.$refs.deleteDialogRemoveRight.dialogFormVisible = true
      this.deleteIdPower = data
    }, 
    allocateClickEmitAnserse(data){
      console.log(data);
      powerTableTreeNet().then(res=>{
        if(res.data.meta.status !== 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.$message.success(res.data.meta.msg)
          this.powerTree = res.data.data
          this.powerSelect = data.children
          this.powerId = data.id
          this.$refs.powerDialog.dialogFormVisible = true
        }
      })
    }
  },
  data(){
    return{
      //edit
      editData:{},
      editInput:[
        {
          prop:'roleName',lable:'角色名称',icon:'el-icon-user',
          rule:[ 
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'roleDesc',lable:'角色描述',icon:'el-icon-paperclip',
          rule:[ 
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
      ],
      //add
      addInput:[
        {
          prop:'roleName',lable:'角色名称',icon:'el-icon-user',
          rule:[ 
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'roleDesc',lable:'角色描述',icon:'el-icon-paperclip',
          rule:[ 
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        },
      ],
      //add end
      roleEditNet:roleEditNet,
      roleAddNet:roleAddNet,
      roleDeleteNet:roleDeleteNet,
      roleDeletePowerNet:roleDeletePowerNet,
      deleteIdRole : -1,
      deleteIdPower :{powerId:-1,roleId:-1},
      powerTree :[],
      powerSelect:[],
      powerId:-1,

    }
  }
}
</script>

<style scoped>

</style>