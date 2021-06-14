<template>
    <el-dialog :title="titleData" :visible.sync="dialogFormVisible" :before-close='noClick'>
      <el-form :model="form" :rules="rules" label-width="120px" ref="form">
        <el-form-item v-for="(item,index) in inputList" 
          :key="index" 
          :prop="item.prop"  
          :label="item.lable" 
        >
          <el-input :placeholder="item.desc?item.desc:item.lable"   
            v-if="!item.type || item.type === 'input'"
            v-model="form[item.prop]" 
            :prefix-icon="item.icon"
            :show-password="item.prop === 'password'"
          ></el-input>
          <el-select :placeholder="item.desc?item.desc:item.lable" 
            v-model="form[item.prop]" 
            v-else-if="item.type === 'select'"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-cascader
            v-if="item.type ==='cascader'"
            v-model="form[item.prop]" 
            :options="item.options"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item> 
        <slot :formDataOfDialog='form'></slot>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noClick">取 消</el-button>
        <el-button type="primary" @click="yesClick">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name:'DialogForm',
  created(){
    this.renew()
    for (let i of this.inputList){
      this.rules[i.prop] = i.rule
    }
  },
  watch:{
    formList(a,b){
      this.renew()
      //console.log(this.inputList);
      //console.log(this.form);
    },
  },
  data(){
    return{
      dialogFormVisible:false,
      form: {
      },
      rules:{
      }
    }
  },
  methods:{
    yesClick(){
      console.log(this.userNet);
      if(this.userNet===null){
        this.$refs.form.validate(flag=>{
          if(flag){
            this.dialogFormVisible = false
            this.$emit('dialogRenewEmit')
            this.$message.success('更新完成')
            return
          }
        })
      }
      this.$refs.form.validate(flag => {
        if(flag){
          this.userNet(this.form).then(res => {
            let status = res.data.meta.status
            let msg = res.data.meta.msg
            if(status !== this.metaText){
              this.$message.error(msg)
            }else{
              this.dialogFormVisible = false
              this.$emit('dialogRenewEmit')
              this.$message.success(msg)
            }
          })
        }
      })
    },
    noClick(){
      this.$refs.form.resetFields()
      this.dialogFormVisible =false
    },
    renew(){
      this.form = JSON.parse(JSON.stringify(this.formList))
    }
  },
  props:{
    userNet:{
      default(){return null}
    },
    titleData:{
      type:String,
      default(){return ''}
    },
    inputList:{
      type:Array,
      default(){return []}
    },
    formList:{
      type:Object,
      default(){return {}}
    },
    metaText:{
      type:Number,
      default:0
    },
  }
}
</script>
<style scoped>
.el-select,.el-cascader{
  width: 100%;
}
</style>