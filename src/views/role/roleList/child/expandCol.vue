<template>
  <div class="expandCol">
    <el-row class="firstRow center" v-for="(item0,index0) in rowData.children" :key="index0" :gutter="24" >
          <el-col :span="5" >
            <el-tag closable @close="removeRight(item0.id)">{{item0.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col  :span="19" class="secondCol">
            <el-row v-for="(item1,index1) in rowData.children[index0].children" :key="index1" :class="{secondRow:index1 !== 0}" class="center" >
              <el-col :span="5">
                <el-tag  @close="removeRight(item1.id)" type="success" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="14" >
                <el-tag class="thirdTag"  type="info" v-for="(item2,index2) in rowData.children[index0].children[index1].children" :key="index2"
                closable  @close="removeRight(item2.id)">
                  {{item2.authName}} 
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'ExpandCol',
  props:{
    rowData:{
      type:Object,
      default(){return {}}
    }
  },
  methods:{
    removeRight(powerId){
      this.$emit('removeRightEmit',{powerId,roleId:this.rowData.id})
    }
  }
}
</script>

<style scoped>
.center{
  display: flex;
  align-items: center;
}
.secondRow{
  border-top: 1px dotted rgba(128, 128, 128, 0.459);
}
.secondCol{
  padding: 0 12px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.firstRow{
  border-bottom: 1px solid rgba(128, 128, 128, 0.459);
}
.el-table{
  margin-top: 20px;
}
.el-col{ 
    margin-bottom: 5px;
    margin-top:5px;
}
.thirdTag{
  margin: 0 5px 5px 5px;
}
</style>