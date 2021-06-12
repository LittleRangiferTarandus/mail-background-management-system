<template>
  <el-form :model="form"   ref="form"  >
    <el-form-item v-for="(item,index) in inputData" 
        :key="index"
        :label="item.attr_name" 
    >
        <el-input   :placeholder="item.attr_name"   
        v-model="form[item.attr_id ]" 
        :prefix-icon="item.icon"
        ></el-input>
    </el-form-item> 
  </el-form>
</template>

<script>
import {
  getParamList
} from '@/network/params.js'
export default {
  name:'basicMessage',
  data(){
    return {
      form:{},
      inputData:[]
    }
  },
  created(){
    if(this.$route.params){
      this.getData()
    } 
  },
  watch:{ 
    id(a,b){
      this.getData()
    }
  },
  props:{
    editData:{
      type:Object,
      default(){return{}}
    },
    id:{
      type:Number,
      default:-1
    }
  },
  methods:{
    async getData ( ){
      let {data:data} = await getParamList(this.id,'only')
      if(data.meta.status !== 200){
        this.$message.error(data.meta.msg)
      }else{
        this.$message.success(data.meta.msg)
        let form = {}
        data.data.forEach( item => {
          if(Object.keys(this.$route.params).length !== 0){
            if(this.editData[item.attr_id]){
              form[item.attr_id] = this.editData[item.attr_id].toString()
            }else{
              form[item.attr_id] = ''
            }
          }else{
            form[item.attr_id] =  item.attr_vals
          }
        })
        this.form = form
        this.inputData = data.data
      }
    },
  },
  computed:{

  }
}
</script>

<style>

</style>