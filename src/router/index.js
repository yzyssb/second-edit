import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import Test from '@/components/test'
//import Page1 from '@/components/page1'
//import Page2 from '@/components/page2'
//import Page3 from '@/components/page3'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: resolve=>require(['../components/test'],resolve),
      redirect:'/page1',
      meta:{
        keepAlive:true,
      },
      children:[
      	{
      		path:'/page1',
      		name:'page1',
      		component:resolve=>require(['../components/page1'],resolve),
          meta:{
            keepAlive:true,
          },
      	},
      	{
      		path:'/page2',
      		name:'page2',
      		component:resolve=>require(['../components/page2'],resolve),
          meta:{
            keepAlive:true,
          },
      	},
      	{
      		path:'/page3',
      		name:'page3',
      		component:resolve=>require(['../components/page3'],resolve),
          meta:{
            keepAlive:true,
          },
      	}
      ]
    },
    {
   	  path:'/hello',
   	  name:'HelloWorld',
   	  component:resolve=>require(['../components/HelloWorld'],resolve),
      meta:{
        keepAlive:true,
      },
    }
  ]
})
