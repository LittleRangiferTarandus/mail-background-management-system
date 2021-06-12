<template>
  <quill-editor v-model="text"></quill-editor>
</template>

<script>
export default {
  name:'textArea.vue',
  data(){
    return{
      text:''
    }
  },
  methods:{
  },
  props:{
    editData:{
      type:String,
      default(){return ''}
    },  
  },
  created(){
    this.text = this.editData
  }
}
</script>

<style>

</style>