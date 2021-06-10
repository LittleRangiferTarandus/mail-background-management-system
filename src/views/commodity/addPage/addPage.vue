<template>
  <div class="addPage">
    <breadcrumb :list="['商品管理','添加商品']"></breadcrumb>
    <el-card>
      <menu2  >
        <basic-message slot="0" ref="basicMessage"></basic-message>
      </menu2>
    </el-card>

  </div>
</template>

<script>
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import BasicMessage from './child/basicMessage.vue'
import Menu2 from './child/menu.vue'
export default {
  components: { breadcrumb, Menu2, BasicMessage },
  name:'AddPage',
  mounted(){
    this.$bus.addPageCheck = this.$refs.basicMessage.check
  }
}
</script>

<style scoped>

</style>