import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require(['@/page/login/login'],r);
const manage = r => require(['@/page/manage/manage'],r);
const home = r => require(['@/page/manage/home'],r);


const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    children: [{
      path: '',
      component: home,
      meta:[]
    }]
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
