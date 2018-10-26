<template>
  <div class="template" v-if="showMe">
    <ul class="left-nav" ref="leftNav">
      <li v-if="leftList.length>0" v-for="(item,index) in leftList" :key="index" :class='{active_ia:index == 0}' @click="leftControlRightScroll(index)">{{item.name}}</li>
    </ul>

    <ul class="right-nav" ref="rightNav">
      <li v-if="rightList.length>0" v-for="(item,index) in rightList" :key="index">
        <h5>{{item.cateName}}</h5>
        <ul class="sub-nav">
          <li v-if="item.children&&item.children.length>0" v-for="(subItem,idx) in item.children" :key="idx">
            <dd>
              <dl><img :src="subItem.src" class="img" /></dl>
              <dl>{{subItem.name}}</dl>
            </dd>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>
<script>
export default{
  name:'NewPage',
  data(){
    return{
      showMe: false,
      leftList:[
        {name:'鲜花类'},
        {name:'水果类'},
        {name:'肉食类'},
      ],
      rightList:[
        {
          cateName:'鲜花类',
          children:[
            {name:'玫瑰花',price:100,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962938966848.jpg'},
            {name:'水仙花',price:30,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960638703.jpg'},
            {name:'月季花',price:40,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960782004.jpg'},
            {name:'牵牛花',price:20,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960336753.jpg'},
            {name:'向日葵',price:10,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960175674.jpg'},
            {name:'蓝色妖姬',price:200,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960931593.jpg'},
          ]
        },
        {
          cateName:'水果类',
          children:[
            {name:'避孕黄瓜',price:100,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962938966848.jpg'},
            {name:'释迦',price:30,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960638703.jpg'},
            {name:'莲雾',price:40,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960782004.jpg'},
            {name:'红毛丹',price:20,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960336753.jpg'},
            {name:'鳄梨',price:10,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960175674.jpg'},
            {name:'荸荠',price:200,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960931593.jpg'},
          ]
        },
        {
          cateName:'肉食类',
          children:[
            {name:'象拔',price:100,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962938966848.jpg'},
            {name:'五花肉',price:30,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960638703.jpg'},
            {name:'炖猪脚',price:40,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960782004.jpg'},
            {name:'红烧肉',price:20,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960336753.jpg'},
            {name:'白肉',price:10,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960175674.jpg'},
            {name:'手撕猪肉',price:200,src:'http://www.xiaoniren.com.cn/upload/news/image/201706/14962960931593.jpg'},
          ]
        }
      ]
    }
  },
  
  mounted(){
    var time = Math.floor(Math.random() * 2000);
    console.log('模拟加载用时' + time);
    setTimeout(() => {
      this.showMe = true;
    }, time);
  },
  watch: { // 注意！！！！   watch对于对象来说deep=true也只能监控对象原有属性，新增加的无效！！！！
    // 监听showMe变化，在DOM更新后执行nextTick
    showMe: function (value) { // value就是showMe
      if (value) {
        this.$nextTick(() => {
          this.rightControlLeftClass();
        });
      }
    }
  },
  beforeDestroy(){
    this.showMe = false;
  },
  methods:{
    // 右列表控制左列表样式
    rightControlLeftClass () {
      // 左目录列表
      var leftUl = this.$refs.leftNav;
      // 左目录的所有li
      var leftLI = leftUl.getElementsByTagName('li');
      console.log(leftLI[0].classList)
      // 右商品列表
      var rightUl = this.$refs.rightNav;
      var ti = rightUl.querySelectorAll('h5');
      // 定义当前滚动到的index值
      var asIndex = 0;
      // ↓ BUG（魅族自带浏览器 + UC无效果scroll不执行，安卓端chrome火狐正常 IOS 10.2正常)
      // 原因 某些浏览器不支持 forEach (UC,魅族自带,微信等) 改用 for 循环
      rightUl.addEventListener('scroll', () => {
        // 当前scrollTop
        var thisST = rightUl.scrollTop+50*window.innerWidth/375;
        // console.log('滚动条上去高度', this.scrollTop)
        // 算每个标题offsetTop来决定当前asIndex
        /* ti.forEach(function (e, i) {
          // console.log(e.offsetTop)
          if (thisST >= e.offsetTop) {
            // console.log(i)
            asIndex = i;
          }
        }); */
        for (var i = 0; i < ti.length; i++) {
          if (thisST >= ti[i].offsetTop) {
            // console.log(i)
            asIndex = i;
          }
        };
        // 给左目录列表所有的li去掉激活样式
        for (var j = 0, x = leftLI.length; j < x; j++) {
          leftLI[j].classList.remove('active_ia');
        }
        // 当前滚动到的li加激活样式
        leftLI[asIndex].classList.add('active_ia');
      }, false);
    },
    // 左列表点击控制右列表滚动
    leftControlRightScroll (index) {
      /**
       * [scrollMove 右侧Ul滚动，以当前scrollTop与目标的差值/10为滚动距离，滚动过远的话会有点生硬]
       * @param  {[DOM]} ele    [目标元素ul]
       * @param  {[Number]} target [滚动到的位置]
       * @return {[void]}        [description]
       */
      var scrollMove = (ele, target) => {
        // 根据当前scrollTop与目标点距离算出单次改变量
        var vector = Math.round((target - ele.scrollTop) / 10);
        var scrollTimer = setInterval(() => {
          ele.scrollTop += vector;
          // 超出目标点后 或者 已经滚动到底清空定时器
          // 上滑(scrollTop>=目标点 且 vector为正) 或 下滑(scrollTop <= 目标点 且 vector为负)或 滑到最底
          if (((ele.scrollTop >= target) && vector > 0) || ((ele.scrollTop <= target) && vector < 0) || ((ele.scrollTop + ele.clientHeight + 1) >= ele.scrollHeight)) {
            // +1 正确激活当前左栏状态
            ele.scrollTop = target + 1;
            clearInterval(scrollTimer);
          }
        }, 1000 / 100);
      };
      var rightUl_ = this.$refs.rightNav;
      // 右列表应该滚动到的标题的offsetTop
      console.log( rightUl_.querySelectorAll('h5') )
      var rightTo_ = rightUl_.querySelectorAll('h5')[index].offsetTop-50*window.innerWidth/375;
      scrollMove(rightUl_, rightTo_);
    },
  }
}
</script>
<style lang="scss" scoped>
ul{
  list-style:none;
}
.template{
  display:flex;
  .left-nav{
    width:1rem;
    background-color:#eee;
    li{
      height:0.4rem;
      line-height:0.4rem;
      border-bottom:1px solid #fff;
    }
  }
  .right-nav{
    flex:1;
    &>li>h5{
      text-align:left;
      background-color:#efefef;
      padding:5px 10px;
      color:red;
    }
    .sub-nav{
      display:table;
      content:'';
      clear:both;
      &>li{
        float:left;
        margin-left:calc((100% - 2.4rem)/3);
        margin-top:0.1rem;
        .img{
          width:1.2rem;
          height:1.2rem;
        }
      }
    }
    
  }
  &>ul{
    height:calc(100vh - 0.5rem);
    overflow-y:scroll;
  }
  li.active_ia{
    background:#fff;
    position:relative;
    &:after{
      content:'';
      position:absolute;
      left:0;
      top:0;
      width:.05rem;
      height:100%;
      background:#3190e8;
    }
  }
  .active{
    font-size:0.2rem;
    color:red;
  }
}
</style>