import App from '@/App.vue'

//const hello = resolve => require(['@/components/HelloWorld'],resolve)//r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello')//
const home = resolve => require(['@/page/home/home'],resolve)
const login = resolve => require(['@/page/login/login'],resolve)
const city = resolve => require(['@/page/city/city'],resolve);
const msite = r => require(['@/page/msite/msite'],r)
const search = r => require(['@/page/search/search'],r)
const food = r => require(['@/page/food/food'],r)

// console.log('aa')
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
  ]
}]

export default routes
