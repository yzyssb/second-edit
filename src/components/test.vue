<template>
  <div class="hello">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :top-status.sync="topStatus">
      <ul class="box">
        <li v-for="item in list">{{ item }}</li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
    <div class="routers">
      <router-link to="/page1">page1</router-link>
      <router-link to="/page2">page2</router-link>
      <router-link to="/page3">page3</router-link>
    </div>
    <router-view />
    <img :src="imgUrl" :onerror="defaultImg" class="logo" @click="goHello">
    <SmallC isComponent="true" @dataFromSmallC="getData" />
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import SmallC from './smallComponent';
export default {
  name: 'test',
  data () {
    return {
      list:[1,2,3,4,5],
      timer:0,
      allLoaded:false,
      imgUrl:'',
      topStatus:'',

      defaultImg:'this.src="'+require('../assets/logo.png')+'"'
    }
  },
  components:{SmallC},
  mounted(){
    let params={
      uid: 247605,
      user_token:'lushang'
    }
    console.log(this.$qs.parse(this.$qs.stringify(params)))
    this.$http.post('/api/MeasurePlan/getUserRestaurant',this.$qs.stringify(params)).then(res=>{
      console.log(res)

      Toast({
        message: 'Upload Complete',
        position: 'bottom',
        duration: 5000
      });

    })
  },
  methods:{
    getData(data){
      console.log(data)
    },
    goHello(){
      //this.$router.push({name:'HelloWorld',params:{id:1}})
      this.$router.push({path:'/hello',query:{name:'yzy'}})
    },
    loadTop() {
      this.topStatus='drop'
      for(var i=0;i<20;i++){
        this.list.unshift(this.list[0]-1)
      }
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
      for(var i=0;i<20;i++){
        this.list.push(this.list[this.list.length-1]+1)
      }
      this.timer++
      console.log(this.timer)
      if(this.timer==5){
        this.allLoaded=true
      }
      this.$refs.loadmore.onBottomLoaded();
    }
  }
}
</script>
<style scoped lang="scss">
$red:pink;
.hello{
  color:$red;
}
.box{
  max-height:400px;
  overflow-y:scroll;
}
.rotate{
  transform:rotate(360deg);
}
.logo{
  width:1rem;
  height:1rem;
  border-radius:50%;
}
</style>
