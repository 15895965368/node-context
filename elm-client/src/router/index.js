import App from '@/App.vue'

const hello = resolve => require(['@/components/HelloWorld'],resolve)//r => require.ensure([], () => r(require('@/components/HelloWorld')), 'hello')//
const home = resolve => require(['@/page/home/home'],resolve)
// console.log('aa')
const routes = [{
  path:'/',
  component:App,
  children:[
    {
      path:'',
      redirect:'/hello'
    },
    {
      path:'hello',
      component:hello
    },{
      path:'home',
      component:home
    }
  ]
}]

export default routes
