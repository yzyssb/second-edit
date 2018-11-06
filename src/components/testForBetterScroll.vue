<template>
  <div class="test">
    <scroll class="wrapper"
            :data="data"
            :pulldown="pulldown"
            :pullup="pullup"
            @scrollToEnd="loadMore"
            @pulldown="loadData">
      <ul class="content">
        <li v-for="item in data">{{item}}</li>
      </ul>
      <div class="loading-wrapper"></div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "./scroll";
export default {
  name: "testForBetterScroll",
  data() {
    return {
      data: [],
      pulldown: true,
      pullup:true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      var arr=[],ss
      for(var i=0;i<30;i++){
        ss=Math.round(Math.random()*100)
        arr.push(ss)
      }
      this.data = arr.concat(this.data);
    },
    loadMore(){
      var arr=[],ss
      for(var i=0;i<10;i++){
        ss=Math.round(Math.random()*100)
        arr.push('more:'+ss)
      }
      this.data = this.data.concat(arr);
    }
  },
  components:{
    Scroll
  }
};
</script>
<style lang="scss" scoped>
.wrapper{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  .content{
    li{
      line-height: 30px;
    }
  }
}
</style>