<template>
  <div class="hello">
    <p>1111111111</p>
    <div class="special">2222222</div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
    </ul>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      loading:false,
      list:[1],
    }
  },
  mounted(){
    //console.log(this.$route.params.id)
    console.log(this.$route.query.name)
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
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 20);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red:pink;
.hello{
  color:$red;
  &:before{
    content:'？？？'
  }
}
</style>
<style lang="less">
@redColor:red;
@blackColor:#333;
@bigFont:20px;
.hello{
  color:@redColor;
  &:after{
    content:'崔冉是个小仙女？'
  }
  .special{
    font-size:@bigFont;
    color:@blackColor;
  }
}
</style>
