<template>
  <div class="hello">
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { 
          text: "在Vue中使用echarts", 
          subtext: '崔冉是个小仙女？'  
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>
<style scoped lang="scss">
$red: pink;
.hello {
  color: $red;
  &:before {
    content: "？？？";
  }
}
</style>
<style lang="less">
@redColor: red;
@blackColor: #333;
@bigFont: 20px;
.hello {
  color: @redColor;
  &:after {
    content: "崔冉是个小仙女？";
  }
  .special {
    font-size: @bigFont;
    color: @blackColor;
  }
}
</style>
