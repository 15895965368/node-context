import App from '@/App.vue'

//const hello = resolve => require(['@/components/HelloWorld'],resolve)//r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello')//
const home = resolve => require(['@/page/home/home'],resolve)
const login = resolve => require(['@/page/login/login'],resolve)
const city = resolve => require(['@/page/city/city'],resolve);
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
  ]
}]

export default routes
