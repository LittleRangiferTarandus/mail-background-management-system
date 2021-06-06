<template>
  <div class="powerList">
    <breadcrumb :list='["权限管理","权限列表"]' class="breadcrumb"></breadcrumb>
    <power-table></power-table>
  </div>
</template>

<script>
import Breadcrumb from '@/components/content/breadcrumb/breadcrumb.vue'
import PowerTable from './child/powerTable.vue'
export default {
  name:'PowerList',
  components:{
    Breadcrumb,
    PowerTable
  },
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>

</style>