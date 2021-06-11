<template>
  <div class="addPage">
    <breadcrumb :list="['商品管理','添加商品']"></breadcrumb>
    <el-card>
      <menu2  >
        <basic-message slot="0" ref="basicMessage"
          @handleChange='handleChangeAnserse'
        ></basic-message>
        <params slot="1" ref="params"  :id="currentId"></params>
        <attr slot="2" ref="attr"  :id="currentId"></attr>
        <upload-pic slot="3" ref="pic"></upload-pic>
        <text-area slot="4" ref="text"></text-area>
        <el-button slot="5" 
          type="primary"
          @click="addCommodityClick"
        > 添加商品 </el-button>
      </menu2>
    </el-card>

  </div>
</template>

<script>
import {addCommodity} from '@/network/commodityList.js'
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import Attr from './child/attr.vue'
import BasicMessage from './child/basicMessage.vue'
import Menu2 from './child/menu.vue'
import Params from './child/params.vue'
import TextArea from './child/textArea.vue'
import UploadPic from './child/uploadPic.vue'
export default {
  components: { breadcrumb, Menu2, BasicMessage, Params, Attr, UploadPic, TextArea },
  name:'AddPage',
  mounted(){
    this.$bus.check = this.$refs.basicMessage.check
  },
  data(){
    return{
      currentId : -1
    }
  },
  methods:{
    handleChangeAnserse(id){
      this.currentId = id
    },
    async addCommodityClick(){
      let postForm = {}
      let first = await this.$refs.basicMessage.returnCheck()
      if(first === false){
        return
      }else{
        postForm = JSON.parse(JSON.stringify(first))
        postForm.goods_cat = postForm.goods_cat.toString()
        postForm.goods_weight = postForm.goods_weight -0
        postForm.goods_price = postForm.goods_price -0
        postForm.goods_number = postForm.goods_number -0
        postForm.goods_introduce =   this.$refs.text.text
        let forth = this.$refs.pic.pics
        let pics = []
        forth.forEach(item => {
          pics.push( {pic:item.pic})
        })
        postForm.pics = pics
        let second =  this.$refs.params.attrs
        let attrs = []
        Object.keys(second).forEach(item =>{
          if(!second[item]){return}
          second[item].forEach(item2 =>{
            attrs.push({
              attr_id:item-0,
              attr_value:item2
            })
          })
        })
        let third =   this.$refs.attr.form
        Object.keys(third).forEach(item => {
          attrs.push({
            attr_id:item-0,
            attr_value:third[item]
          })
        })
        postForm.attrs = attrs
        this.addNet(postForm)
      }
      
    },
    async addNet(postForm){
      let {data:data} = await addCommodity(postForm)
      if(data.meta.status !== 201){
        this.$message.error(data.meta.msg)
      }else{
        this.$message.success(data.meta.msg)
        this.$router.push('/home/2-0')
      }
    }
  }
}
</script>

<style scoped>

</style>