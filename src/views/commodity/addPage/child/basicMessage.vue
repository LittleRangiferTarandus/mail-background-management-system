<template>
  <el-form :model="form" :rules="rules" ref="form"  >
    <el-form-item v-for="(item,index) in input" 
        :key="index" 
        :prop="item.prop"  
        :label="item.lable" 
    >
        <el-input v-if="item.prop != 'goods_cat'" :placeholder="item.desc?item.desc:item.lable"   
        v-model="form[item.prop]" 
        :prefix-icon="item.icon"
        ></el-input>
        <el-cascader v-else 
            v-model="form.goods_cat"
            :options="cascaderData"
            :props="{ 
              expandTrigger: 'hover' ,
              label:'cat_name',
              value:'cat_id'
            }"
            placeholder="请选择分类" 
            ref="cascader"
            @change="handleChange"
        ></el-cascader>
    </el-form-item> 
  </el-form>
</template>

<script>
import{
  getCategoryList
} from '@/network/category.js'
export default {
  name:'basicMessage',
  data(){
    return {
      input:[
        {
          prop:'goods_name',lable:'商品名称',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'goods_price',lable:'商品价格',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'goods_weight',lable:'商品重量',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'goods_number',lable:'商品数量',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入商品数量', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          prop:'goods_cat',lable:'商品分类',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入商品分类', trigger: 'blur' },
          ]
        }
      ],
      form:{
        goods_cat:[]
      },
      rules:{},
      //cascader
      cascaderData:[],
    }
  },
  created(){
    for(let item of this.input){
      this.rules[item.prop] = item.rule
    }
    this.getCascader()
  },
  methods:{
    async getCascader(){
      let {data:data} = await getCategoryList()
      if(data.meta.status !== 200){
        this.$message.error(data.meta.msg)
      }else{
        this.$message.success(data.meta.msg)
        this.cascaderData = data.data
      }
    },
    check(){
      if(this.form.goods_cat.length === 3){
        return true
      }else{
        this.$message.error('请选择末级分类')
        return false
      }
    },
    handleChange(value) {
      this.$emit('handleChange',value[value.length-1])
    },
    returnCheck(){
      let form = []
      this.$refs.form.validate(flag => {
        if(flag){
          form = this.form
        }else{
          this.$message.error('请完善基础信息')
          form = false
        }
      })
      return form
    }
  },
  computed:{

  }
}
</script>

<style scoped>
.el-cascader{
  width: 100%;
}
</style>