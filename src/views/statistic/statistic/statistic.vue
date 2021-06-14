<template>
  <div>
    <breadcrumb :list="['数据统计','数据报表']"></breadcrumb>
    <el-card>
      <div id="main" style="width: 800px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import{
  getStatistic
} from'@/network/statistic.js'
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
export default {
  components: { breadcrumb },
  name:'Statistic',
  data(){
    return{
      statisticData:{},
      myChart:{},
    }
  },
  methods:{
    async getData(){
      let{data:res} = await getStatistic()
      if(res.meta.status !== 200){
        this.$message.error(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
        this.statisticData = res.data
        this.charts()
      }
    },
    charts(){
      const option = {
        title: {
            text: '统计图'
        },
        tooltip: {},
        legend: this.statisticData.legend,
        xAxis: {
            data: this.statisticData.xAxis[0].data
        },
        yAxis:{},
        series: this.statisticData.series
      };
      this.myChart.setOption(option);
    }
  },
  created(){
    this.getData()
  },
  mounted(){
    this.myChart = echarts.init(document.getElementById('main'))
  }
}
</script>

<style>

</style>