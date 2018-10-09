<template>
  <div class="hello" @click="helloClick">
    {{isComponent?'这是组件':'这不是组件'}}
    <input v-model="dataTransferToP">
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'smallComponent',
  data () {
    return {
      dataTransferToP:'',
    }
  },
  //props:['isComponent'],
  props:{
    isComponent:{
      type:String,
      required:true
    }
  },
  mounted(){
    this.dataTransferToP=this.isComponent
  },
  methods:{
    helloClick(){
      this.$emit('dataFromSmallC',this.dataTransferToP)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
