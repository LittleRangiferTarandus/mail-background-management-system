<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://www.ysqorz.top:8888/api/private/v1/upload"
      :headers="header"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="pics"
      :on-success="handleSuccess"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <img :src="previewPath" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        header:{
          Authorization : window.sessionStorage.getItem('token')
        },
        pics: [
        ],
        previewPath:'',
        dialogVisible:false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        const path = file.pic
        let i = this.pics.findIndex(a => 
          a.pic === path 
        )
        this.pics.splice(i,1)
      },
      handlePreview(file) {
        this.previewPath = file.url
        this.dialogVisible = true
      },
      handleSuccess(response,file,fileList){ 
        const picInfo = {
          pic:response.data.tmp_path,
          url:response.data.url,
          name:file.name
        }
        this.pics.push(picInfo)
      }
    }
  }
</script>
<style scoped>
img{
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
}
</style>