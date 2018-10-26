<template>
  <div id="app" @click="changeData">
    <div class="routers">
      <router-link to="/new">new</router-link>
      <router-link to="/">test</router-link>
      <router-link to="/hello">hello</router-link>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      exmaple0:111,
      exmaple1:{
        a:1,
        b:2
      }
    }
  },
  watch:{
    exmaple0(curVal,oldVal){
      console.log(curVal,oldVal)
    },
    exmaple1(cur,old){
      console.log(cur,old)
    }
  },
  methods:{
    changeData(){
      this.exmaple0++
      var obj=this.exmaple1
      obj.a++
      this.exmaple1=obj
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:0.12rem;
}
*{
  margin:0;padding:0;
}
.routers{
  display:flex;
  justify-content:space-around;
  //padding:10px 0;
  background:rgba(0,0,0,0.5);
  font-size:0.2rem;
  height:0.5rem;
  line-height:0.5rem;
}
a{
  color:#fff;
  text-decoration:none;
}
</style>
