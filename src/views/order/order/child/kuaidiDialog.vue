<template>
  <el-dialog
    title="物流信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-timeline :reverse='false'>
      <el-timeline-item
        v-for="(activity, index) in pathData"
        :key="index"
        :timestamp="activity.time"
      >
        <el-card>{{activity.context}}</el-card>
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name:'Kuaidi',
  data(){
    return{
      dialogVisible:false
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    }
  },
  props:{
    pathData:{
      type:Array,
      default(){return[]}
    }
  }
}
</script>

<style>
.el-timeline-item{
  text-align: left;
}
.el-dialog{
  height: 600px;
  overflow: auto;
}
</style>