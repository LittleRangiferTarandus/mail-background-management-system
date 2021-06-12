<template>
  <el-form v-model="attrs">
    <el-form-item v-for="(item,index) in selectData" :key="index"
    >
      <div class="label">{{item.attr_name}}</div>
      <el-checkbox-group v-model="attrs[item.attr_id]" >
        <div v-for="(item1,index1) in selectData[index].attr_vals" :key="index1" class="checkbox" >
          <el-checkbox v-if="item1!==''" :label='item1' border size="mini"></el-checkbox>
        </div>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  getParamList
} from '@/network/params.js'
export default {
  name:'params',
  data(){
    return{
      selectData:[],
      attrs:{}
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
    },
  },
  methods:{
    async getData (){
      let {data:data} = await getParamList(this.id,'many')
      if(data.meta.status !== 200){
        this.$message.error(data.meta.msg)
      }else{
        this.$message.success(data.meta.msg)
        let attrs = {}
        data.data.forEach( item => {
          if(item.attr_vals.length !== 0){
            item.attr_vals = item.attr_vals.split(',')
          }
          if(Object.keys(this.$route.params).length !== 0){
            if(this.editData[item.attr_id]){
              attrs[item.attr_id] = this.editData[item.attr_id]
            }else{
              attrs[item.attr_id] = []
            }
          }else{
            attrs[item.attr_id] =  item.attr_vals
          }
        })
        this.attrs = attrs
        this.selectData = data.data
      }
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
    },
  }
}
</script>

<style scoped>
.checkbox{
  display: inline-block;
  margin: 5px 0 0 5px;
}
.el-checkbox-group{
  display: flex;
  flex-wrap: wrap;
} 
.label{
  text-align: start;
}
</style>