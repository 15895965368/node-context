import App from '@/App.vue'

//const hello = resolve => require(['@/components/HelloWorld'],resolve)//r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello')//
const home = resolve => require(['@/page/home/home'],resolve)
const login = resolve => require(['@/page/login/login'],resolve)
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
    }
  ]
}]

export default routes
