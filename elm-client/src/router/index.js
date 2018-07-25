import App from '@/App.vue'

//const hello = resolve => require(['@/components/HelloWorld'],resolve)//r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello')//
const home = resolve => require(['@/page/home/home'],resolve)
const login = resolve => require(['@/page/login/login'],resolve)
const city = resolve => require(['@/page/city/city'],resolve);
const msite = r => require(['@/page/msite/msite'],r)
const search = r => require(['@/page/search/search'],r)
const food = r => require(['@/page/food/food'],r)
const order = r => require(['@/page/order/order'],r)
const orderDetail = r => require(['@/page/order/children/orderDetail'],r)
const profile = r => require(['@/page/profile/profile'],r)


const routes = [{
  path:'/',
  component:App,
  children:[
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'home',
      component:home
    },
    {
      path:'/login',
      component:login
    },
    //当前选择城市页
    {
      path: '/city/:cityid',
      component: city
    },
    //所有商铺列表页
    {
      path:'/msite',
      component:msite,
      meta: { keepAlive: true },
    },
    //搜索页
    {
      path:'/search/:geohash',
      component:search
    },
    //特色商铺列表页
    {
      path: '/food',
      component: food
    },
    //订单列表页
    {
      path: '/order',
      component: order,
      children: [{
        path: 'orderDetail', //订单详情页
        component: orderDetail,
      }, ]
    },
    //个人信息页
    {
      path: '/profile',
      component: profile,
    },



  ]
}]

export default routes
