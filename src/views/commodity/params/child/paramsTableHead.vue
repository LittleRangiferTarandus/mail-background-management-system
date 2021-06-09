<template>
  <div class="paramsTableHead">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first" class="clear">
        <el-button class="paramAdd" 
          :disabled='categoryId===-1' 
          @click="addAttr"
        >添加参数</el-button>
        <slot   name="first"></slot>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second" class="clear">
        <el-button class="paramAdd" :disabled='categoryId===-1'
          @click="addAttr"
        >添加属性</el-button>
        <slot   name="second"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name:'ParamsTableHead',
  data() {
    return {
      activeName: 'first',
      sel:'many'
    };
  },
  methods: {
    handleClick(tab, event) {
      if(tab.index === '1'){
        this.$emit('tabsSwitch','only')
        this.sel = 'only'
      }else{
        this.$emit('tabsSwitch','many')
        this.sel = 'many'
      }
    },
    addAttr(){
      this.$emit('addAttr')
    }
  },
  props:{
    categoryId:{
      type:Number,
      default:-1
    }
  }
}
</script>

<style scoped>
.paramAdd{
  float: left;
}
</style>