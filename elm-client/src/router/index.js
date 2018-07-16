import App from '@/App.vue'
//import hello from '../components/HelloWorld'
const hello = resolve => require(['@/components/HelloWorld'],resolve)

// console.log('aa')
const routes = [{
  path:'/',
  component:App,
  children:[{
    path:'hello',
    component:hello
  }]
}]

export default routes
